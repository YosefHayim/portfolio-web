import type OpenAI from "openai";
import {
	DEFAULT_SPEECH_LANGUAGE,
	type PortfolioAssistantProvider,
	TEXT_TO_SPEECH_CACHE_CONTROL,
} from "../core/assistantProvider.js";

export function createOpenAiAssistantProvider(
	openai: OpenAI,
): PortfolioAssistantProvider {
	return {
		complete: async (input) => {
			const completion = await openai.chat.completions.create({
				model: input.model,
				messages: input.messages,
				max_tokens: input.maxTokens,
				temperature: input.temperature,
			});

			return completion.choices[0]?.message?.content ?? "";
		},
		stream: async function* (input) {
			const stream = await openai.chat.completions.create({
				model: input.model,
				messages: input.messages,
				max_tokens: input.maxTokens,
				temperature: input.temperature,
				stream: true,
			});

			for await (const chunk of stream) {
				const content = chunk.choices[0]?.delta?.content;
				if (content) {
					yield content;
				}
			}
		},
		textToSpeech: async ({ text, voice }) => {
			const mp3 = await openai.audio.speech.create({
				model: "tts-1",
				voice,
				input: text,
				response_format: "mp3",
				speed: 1,
			});

			return {
				audio: await mp3.arrayBuffer(),
				contentType: "audio/mpeg",
				cacheControl: TEXT_TO_SPEECH_CACHE_CONTROL,
			};
		},
		speechToText: async ({ file, language = DEFAULT_SPEECH_LANGUAGE }) => {
			const transcription = await openai.audio.transcriptions.create({
				file,
				model: "whisper-1",
				language,
			});

			return transcription.text;
		},
	};
}
