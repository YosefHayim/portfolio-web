import {
	ASSISTANT_STREAM_DONE_EVENT,
	type AssistantStreamEvent,
	encodeAssistantSseEvent,
} from "../../../shared/portfolio/assistantStream.js";
import {
	AI_CHAT_MAX_TOKENS,
	AI_CHAT_MODEL,
	AI_CHAT_TEMPERATURE,
	type ChatMessage,
	canUseAssistantResponseCache,
	createCachedResponseChunks,
	getLastUserMessage,
	getSystemPrompt,
} from "./assistant.js";
import { CoreHttpError, isRecord } from "./requestValidation.js";
import { responseCache as defaultResponseCache } from "./responseCache.js";

export type AssistantProviderMessage = {
	role: "system" | "user" | "assistant";
	content: string;
};

export type AssistantProviderInput = {
	model: string;
	messages: AssistantProviderMessage[];
	maxTokens: number;
	temperature: number;
};

export type CompleteAssistantResponse = (
	input: AssistantProviderInput,
) => Promise<string>;

export type StreamAssistantResponse = (
	input: AssistantProviderInput,
) => Promise<AsyncIterable<string>> | AsyncIterable<string>;

export type AssistantCache = {
	get(message: string): string | null;
	set(message: string, response: string): void;
};

export type AssistantCacheStatus = "HIT" | "MISS";

export type AssistantReply = {
	message: string;
	cacheStatus: AssistantCacheStatus;
};

export type { AssistantStreamEvent };

export type AssistantStreamResult = {
	cacheStatus: AssistantCacheStatus;
	events: AsyncIterable<AssistantStreamEvent>;
};

export async function createAssistantReply({
	messages,
	complete,
	cache = defaultResponseCache,
}: {
	messages: readonly ChatMessage[];
	complete: CompleteAssistantResponse;
	cache?: AssistantCache;
}): Promise<AssistantReply> {
	const lastUserMessage = getLastUserMessage(messages);

	if (canUseAssistantResponseCache(messages)) {
		const cached = cache.get(lastUserMessage);
		if (cached) {
			return { message: cached, cacheStatus: "HIT" };
		}
	}

	const message = await complete(await createProviderInput(messages));
	if (!message) {
		throw new CoreHttpError("No response from AI", 500);
	}

	if (canUseAssistantResponseCache(messages)) {
		cache.set(lastUserMessage, message);
	}

	return { message, cacheStatus: "MISS" };
}

export async function createAssistantReplyStream({
	messages,
	stream,
	cache = defaultResponseCache,
}: {
	messages: readonly ChatMessage[];
	stream: StreamAssistantResponse;
	cache?: AssistantCache;
}): Promise<AssistantStreamResult> {
	const lastUserMessage = getLastUserMessage(messages);

	if (canUseAssistantResponseCache(messages)) {
		const cached = cache.get(lastUserMessage);
		if (cached) {
			return {
				cacheStatus: "HIT",
				events: streamCachedAssistantReply(cached),
			};
		}
	}

	return {
		cacheStatus: "MISS",
		events: streamLiveAssistantReply({
			cache,
			cacheKey: canUseAssistantResponseCache(messages) ? lastUserMessage : null,
			input: await createProviderInput(messages),
			stream,
		}),
	};
}

export { ASSISTANT_STREAM_DONE_EVENT, encodeAssistantSseEvent };

export function createAssistantSseStream(
	events: AsyncIterable<AssistantStreamEvent>,
): ReadableStream<Uint8Array> {
	const encoder = new TextEncoder();

	return new ReadableStream({
		async start(controller) {
			try {
				for await (const event of events) {
					controller.enqueue(encoder.encode(encodeAssistantSseEvent(event)));
				}
				controller.enqueue(encoder.encode(ASSISTANT_STREAM_DONE_EVENT));
			} catch {
				controller.enqueue(
					encoder.encode(
						encodeAssistantSseEvent({
							type: "error",
							error: "AI provider unavailable",
						}),
					),
				);
				controller.enqueue(encoder.encode(ASSISTANT_STREAM_DONE_EVENT));
			} finally {
				controller.close();
			}
		},
	});
}

export function readOpenAiCompletionText(completion: unknown): string {
	if (!isRecord(completion) || !Array.isArray(completion.choices)) {
		return "";
	}

	const firstChoice = completion.choices[0];
	if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
		return "";
	}

	return typeof firstChoice.message.content === "string"
		? firstChoice.message.content
		: "";
}

export async function* readOpenAiTextStream(
	body: ReadableStream<Uint8Array>,
): AsyncIterable<string> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			break;
		}

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";

		for (const line of lines) {
			const trimmed = line.trim();
			if (!trimmed.startsWith("data: ")) {
				continue;
			}

			const data = trimmed.slice(6);
			if (data === "[DONE]") {
				return;
			}

			const parsed = JSON.parse(data) as {
				choices?: Array<{ delta?: { content?: string } }>;
			};
			const content = parsed.choices?.[0]?.delta?.content;
			if (content) {
				yield content;
			}
		}
	}
}

async function createProviderInput(
	messages: readonly ChatMessage[],
): Promise<AssistantProviderInput> {
	return {
		model: AI_CHAT_MODEL,
		messages: [
			{ role: "system", content: await getSystemPrompt() },
			...messages,
		],
		maxTokens: AI_CHAT_MAX_TOKENS,
		temperature: AI_CHAT_TEMPERATURE,
	};
}

async function* streamCachedAssistantReply(
	response: string,
): AsyncIterable<AssistantStreamEvent> {
	for (const chunk of createCachedResponseChunks(response)) {
		yield { type: "content", content: chunk };
	}
}

async function* streamLiveAssistantReply({
	cache,
	cacheKey,
	input,
	stream,
}: {
	cache: AssistantCache;
	cacheKey: string | null;
	input: AssistantProviderInput;
	stream: StreamAssistantResponse;
}): AsyncIterable<AssistantStreamEvent> {
	let fullResponse = "";

	try {
		for await (const content of await stream(input)) {
			fullResponse += content;
			yield { type: "content", content };
		}

		if (cacheKey && fullResponse) {
			cache.set(cacheKey, fullResponse);
		}
	} catch {
		yield { type: "error", error: "AI provider unavailable" };
	}
}
