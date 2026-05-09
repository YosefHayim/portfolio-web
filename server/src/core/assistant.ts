import { getDynamicGitHubProjectsContext } from "./githubPortfolio.js";
import { createPortfolioSystemPromptBase } from "./portfolioKnowledge.js";

export type ChatMessage = {
	role: "user" | "assistant";
	content: string;
};

export const AI_CHAT_MODEL = "gpt-4o-mini";
export const AI_CHAT_MAX_TOKENS = 400;
export const AI_CHAT_TEMPERATURE = 0.7;

const BASE_SYSTEM_PROMPT = createPortfolioSystemPromptBase();

export async function getSystemPrompt(): Promise<string> {
	const githubContext = await getDynamicGitHubProjectsContext();
	return `${BASE_SYSTEM_PROMPT}\n\n${githubContext}`;
}

export function getLastUserMessage(messages: readonly ChatMessage[]): string {
	return messages[messages.length - 1]?.content ?? "";
}

export function hasDynamicPortfolioIntent(message: string): boolean {
	return /\b(github|repo|repos|project|projects|recent|latest|newest|updated)\b/i.test(
		message,
	);
}

export function shouldBypassAssistantCache(
	messages: readonly ChatMessage[],
): boolean {
	return hasDynamicPortfolioIntent(getLastUserMessage(messages));
}

export function canUseAssistantResponseCache(
	messages: readonly ChatMessage[],
): boolean {
	return messages.length === 1 && !shouldBypassAssistantCache(messages);
}

export function createCachedResponseChunks(response: string): string[] {
	const words = response.split(" ");
	const chunks: string[] = [];

	for (let index = 0; index < words.length; index += 3) {
		chunks.push(
			words.slice(index, index + 3).join(" ") +
				(index + 3 < words.length ? " " : ""),
		);
	}

	return chunks;
}
