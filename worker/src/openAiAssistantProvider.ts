import {
  readOpenAiCompletionText,
  readOpenAiTextStream,
} from "../../server/src/core/assistantRuntime.js";
import {
  DEFAULT_SPEECH_LANGUAGE,
  type PortfolioAssistantProvider,
  TEXT_TO_SPEECH_CACHE_CONTROL,
} from "../../server/src/core/assistantProvider.js";
import { CoreHttpError } from "../../server/src/core/requestValidation.js";

export type OpenAiWorkerEnv = {
  OPENAI_API_KEY?: string;
};

export function createFetchOpenAiAssistantProvider(
  env: OpenAiWorkerEnv,
): PortfolioAssistantProvider {
  return {
    complete: async (input) => {
      const completion = await fetchOpenAiJson(env, "/v1/chat/completions", {
        model: input.model,
        messages: input.messages,
        max_tokens: input.maxTokens,
        temperature: input.temperature,
      });

      return readOpenAiCompletionText(completion);
    },
    stream: async function* (input) {
      const response = await fetchOpenAi(env, "/v1/chat/completions", {
        model: input.model,
        messages: input.messages,
        max_tokens: input.maxTokens,
        temperature: input.temperature,
        stream: true,
      });

      if (!response.ok || !response.body) {
        throw new CoreHttpError("AI provider unavailable", 502);
      }

      yield* readOpenAiTextStream(response.body);
    },
    textToSpeech: async ({ text, voice }) => {
      const response = await fetchOpenAi(env, "/v1/audio/speech", {
        model: "tts-1",
        voice,
        input: text,
        response_format: "mp3",
        speed: 1,
      });

      if (!response.ok) {
        throw new CoreHttpError("Text-to-speech provider unavailable", 502);
      }

      return {
        audio: await response.arrayBuffer(),
        contentType: "audio/mpeg",
        cacheControl: TEXT_TO_SPEECH_CACHE_CONTROL,
      };
    },
    speechToText: async ({ file, language = DEFAULT_SPEECH_LANGUAGE }) => {
      requireOpenAiKey(env);

      const form = new FormData();
      form.append("file", file);
      form.append("model", "whisper-1");
      form.append("language", language);

      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          },
          body: form,
        },
      );

      if (!response.ok) {
        throw new CoreHttpError("Speech-to-text provider unavailable", 502);
      }

      const data = (await response.json()) as { text?: string };
      return data.text ?? "";
    },
  };
}

async function fetchOpenAiJson(
  env: OpenAiWorkerEnv,
  path: string,
  body: unknown,
): Promise<unknown> {
  const response = await fetchOpenAi(env, path, body);
  if (!response.ok) {
    throw new CoreHttpError("AI provider unavailable", 502);
  }
  return response.json();
}

function fetchOpenAi(
  env: OpenAiWorkerEnv,
  path: string,
  body: unknown,
): Promise<Response> {
  requireOpenAiKey(env);
  return fetch(`https://api.openai.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function requireOpenAiKey(env: OpenAiWorkerEnv): void {
  if (!env.OPENAI_API_KEY) {
    throw new CoreHttpError("OPENAI_API_KEY is not configured", 503);
  }
}
