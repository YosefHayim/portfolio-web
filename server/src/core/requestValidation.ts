import type { ChatMessage } from "./assistant.js";
import type { PortfolioEmailInput } from "./emailMessage.js";

export class CoreHttpError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

export type TextToSpeechInput = {
	text: string;
	voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
};

const TTS_VOICES = [
	"alloy",
	"echo",
	"fable",
	"onyx",
	"nova",
	"shimmer",
] as const;

export function parseChatRequestBody(body: unknown): {
	messages: ChatMessage[];
} {
	if (
		!isRecord(body) ||
		!Array.isArray(body.messages) ||
		body.messages.length === 0
	) {
		throw new CoreHttpError("Invalid request body", 400);
	}

	return {
		messages: body.messages.map((message) => {
			if (!isRecord(message)) {
				throw new CoreHttpError("Invalid request body", 400);
			}

			return {
				role: asEnum(message.role, "role", ["user", "assistant"]),
				content: asString(message.content, "content", 1, 2000),
			};
		}),
	};
}

export function parseTextToSpeechRequestBody(body: unknown): TextToSpeechInput {
	if (!isRecord(body)) {
		throw new CoreHttpError("Invalid request body", 400);
	}

	return {
		text: asString(body.text, "text", 1, 4096),
		voice:
			body.voice === undefined
				? "nova"
				: asEnum(body.voice, "voice", TTS_VOICES),
	};
}

export function parsePortfolioEmailInput(body: unknown): PortfolioEmailInput {
	if (!isRecord(body)) {
		throw new CoreHttpError("Invalid request body", 400);
	}

	return {
		senderName: asString(body.senderName, "senderName", 1, 100),
		senderEmail: asEmail(body.senderEmail, "senderEmail"),
		subject: asString(body.subject, "subject", 1, 200),
		message: asString(body.message, "message", 10, 5000),
	};
}

export function requireAudioContentType(contentType: string): string {
	if (!contentType.includes("audio/")) {
		throw new CoreHttpError("Invalid content type. Expected audio file.", 400);
	}

	return contentType;
}

export function asString(
	value: unknown,
	field: string,
	min: number,
	max: number,
): string {
	if (typeof value !== "string") {
		throw new CoreHttpError(`Invalid request: ${field} is required`, 400);
	}

	const trimmed = value.trim();
	if (trimmed.length < min || trimmed.length > max) {
		throw new CoreHttpError(
			`Invalid request: ${field} must be between ${min} and ${max} characters`,
			400,
		);
	}

	return trimmed;
}

export function asEmail(value: unknown, field: string): string {
	const email = asString(value, field, 3, 254);
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new CoreHttpError(
			`Invalid request: ${field} must be a valid email`,
			400,
		);
	}

	return email;
}

export function asEnum<T extends string>(
	value: unknown,
	field: string,
	values: readonly T[],
): T {
	if (typeof value !== "string" || !values.includes(value as T)) {
		throw new CoreHttpError(`Invalid request: ${field} is invalid`, 400);
	}

	return value as T;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
