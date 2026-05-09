import type {
	PortfolioAssistantProvider,
	TextToSpeechOutput,
} from "./assistantProvider.js";
import {
	type AssistantReply,
	type AssistantStreamResult,
	createAssistantReply,
	createAssistantReplyStream,
} from "./assistantRuntime.js";
import {
	CONTACT_RECIPIENT_DEFAULT,
	type PortfolioEmailInput,
	createPortfolioEmail,
} from "./emailMessage.js";
import {
	CoreHttpError,
	parseChatRequestBody,
	parsePortfolioEmailInput,
	parseTextToSpeechRequestBody,
	requireAudioContentType,
} from "./requestValidation.js";
import { responseCache } from "./responseCache.js";

export const PORTFOLIO_API_ROUTES = {
	chatHealth: { method: "GET", path: "/api/chat/health" },
	emailHealth: { method: "GET", path: "/api/email/health" },
	chat: { method: "POST", path: "/api/chat" },
	chatStream: { method: "POST", path: "/api/chat/stream" },
	textToSpeech: { method: "POST", path: "/api/chat/tts" },
	speechToText: { method: "POST", path: "/api/chat/stt" },
	sendEmail: { method: "POST", path: "/api/email/send" },
} as const;

export type PortfolioEmailMessage = ReturnType<typeof createPortfolioEmail>;

export type PortfolioEmailDelivery = {
	isConfigured(): boolean;
	send(input: {
		emailInput: PortfolioEmailInput;
		email: PortfolioEmailMessage;
		recipient: string;
	}): Promise<void>;
};

export type PortfolioApiRuntime = {
	getChatHealth(): Record<string, unknown>;
	getEmailHealth(): Record<string, unknown>;
	createChatReply(body: unknown): Promise<AssistantReply>;
	createChatReplyStream(body: unknown): Promise<AssistantStreamResult>;
	createTextToSpeech(body: unknown): Promise<TextToSpeechOutput>;
	createSpeechToText(input: {
		contentType: string;
		audio: ArrayBuffer | ArrayBufferView;
	}): Promise<string>;
	sendPortfolioEmail(
		body: unknown,
	): Promise<{ success: true; message: string }>;
};

export function createPortfolioApiRuntime({
	assistantProvider,
	emailDelivery,
	contactRecipient = CONTACT_RECIPIENT_DEFAULT,
}: {
	assistantProvider?: PortfolioAssistantProvider;
	emailDelivery?: PortfolioEmailDelivery;
	contactRecipient?: string;
}): PortfolioApiRuntime {
	return {
		getChatHealth: () => ({
			cache: responseCache.getStats(),
		}),
		getEmailHealth: () => ({
			configured: Boolean(emailDelivery?.isConfigured()),
		}),
		createChatReply: async (body) => {
			const provider = requireAssistantProvider(assistantProvider);
			const { messages } = parseChatRequestBody(body);
			return createAssistantReply({
				messages,
				complete: provider.complete,
			});
		},
		createChatReplyStream: async (body) => {
			const provider = requireAssistantProvider(assistantProvider);
			const { messages } = parseChatRequestBody(body);
			return createAssistantReplyStream({
				messages,
				stream: provider.stream,
			});
		},
		createTextToSpeech: async (body) => {
			const provider = requireAssistantProvider(assistantProvider);
			const input = parseTextToSpeechRequestBody(body);
			return provider.textToSpeech(input);
		},
		createSpeechToText: async ({ contentType, audio }) => {
			const provider = requireAssistantProvider(assistantProvider);
			const validatedContentType = requireAudioContentType(contentType);
			if (audio.byteLength === 0) {
				throw new CoreHttpError("No audio data received", 400);
			}

			return provider.speechToText({
				file: new File([toArrayBuffer(audio)], "audio.webm", {
					type: validatedContentType,
				}),
			});
		},
		sendPortfolioEmail: async (body) => {
			if (!emailDelivery?.isConfigured()) {
				throw new CoreHttpError("Email service is not configured", 503);
			}

			const emailInput = parsePortfolioEmailInput(body);
			const email = createPortfolioEmail(emailInput);
			await emailDelivery.send({
				emailInput,
				email,
				recipient: contactRecipient,
			});

			return { success: true, message: "Email sent successfully" };
		},
	};
}

function toArrayBuffer(audio: ArrayBuffer | ArrayBufferView): ArrayBuffer {
	const buffer = new ArrayBuffer(audio.byteLength);
	const bytes = new Uint8Array(buffer);
	const source =
		audio instanceof ArrayBuffer
			? new Uint8Array(audio)
			: new Uint8Array(audio.buffer, audio.byteOffset, audio.byteLength);
	bytes.set(source);
	return buffer;
}

function requireAssistantProvider(
	assistantProvider: PortfolioAssistantProvider | undefined,
): PortfolioAssistantProvider {
	if (!assistantProvider) {
		throw new CoreHttpError("AI provider is not configured", 503);
	}

	return assistantProvider;
}
