import assert from "node:assert/strict";
import test from "node:test";
import {
	createAssistantStreamParser,
	encodeAssistantSseEvent,
} from "../../../shared/portfolio/assistantStream.js";
import {
	CONTACT_EMAIL_MARKER_EXAMPLE,
	createPortfolioEmail,
	parseContactEmailMarker,
	stripContactEmailMarker,
} from "../../../shared/portfolio/contactEmail.js";
import {
	type AssistantCache,
	createAssistantReply,
} from "./assistantRuntime.js";
import {
	type GitHubRepo,
	createGitHubProjectPreviews,
	createGitHubStatsSnapshot,
} from "./githubPortfolio.js";
import { createPortfolioSystemPromptBase } from "./portfolioKnowledge.js";
import {
	CoreHttpError,
	parseChatRequestBody,
	parsePortfolioEmailInput,
} from "./requestValidation.js";

function createMapCache(seed: Record<string, string> = {}): AssistantCache {
	const values = new Map(Object.entries(seed));
	return {
		get: (message) => values.get(message) ?? null,
		set: (message, response) => values.set(message, response),
	};
}

function createRepo(overrides: Partial<GitHubRepo>): GitHubRepo {
	return {
		name: "default",
		html_url: "https://github.com/YosefHayim/default",
		description: "Default repo",
		stargazers_count: 0,
		fork: false,
		archived: false,
		pushed_at: "2026-01-01T00:00:00Z",
		...overrides,
	};
}

async function withMockedGitHubFetch(run: () => Promise<void>): Promise<void> {
	const originalFetch = globalThis.fetch;
	globalThis.fetch = (async () =>
		new Response(JSON.stringify([]), { status: 200 })) as typeof fetch;

	try {
		await run();
	} finally {
		globalThis.fetch = originalFetch;
	}
}

test("request validation trims portfolio inputs and rejects invalid roles", () => {
	assert.deepEqual(
		parseChatRequestBody({ messages: [{ role: "user", content: " hello " }] }),
		{
			messages: [{ role: "user", content: "hello" }],
		},
	);

	assert.throws(
		() =>
			parseChatRequestBody({
				messages: [{ role: "system", content: "hello" }],
			}),
		CoreHttpError,
	);

	assert.deepEqual(
		parsePortfolioEmailInput({
			senderName: " Joseph ",
			senderEmail: " joseph@example.com ",
			subject: " Hello ",
			message: " This is a long enough message. ",
		}),
		{
			senderName: "Joseph",
			senderEmail: "joseph@example.com",
			subject: "Hello",
			message: "This is a long enough message.",
		},
	);
});

test("contact email marker is one shared interface from prompt to sender", () => {
	const emailData = parseContactEmailMarker(
		`Ready to send.\n${CONTACT_EMAIL_MARKER_EXAMPLE}`,
	);

	assert.deepEqual(emailData, {
		senderName: "Name",
		senderEmail: "email@example.com",
		subject: "Brief Subject",
		message: "Message content",
	});
	assert.equal(
		stripContactEmailMarker(`Visible ${CONTACT_EMAIL_MARKER_EXAMPLE}`),
		"Visible",
	);

	const email = createPortfolioEmail({
		senderName: "<Joseph>",
		senderEmail: "joseph@example.com",
		subject: "Hello",
		message: "This is a long enough message.",
	});
	assert.equal(email.subject, "[Portfolio] Hello");
	assert.match(email.html, /&lt;Joseph&gt;/);
});

test("assistant stream parser preserves split event lines", () => {
	const parser = createAssistantStreamParser();
	const encoded = `${encodeAssistantSseEvent({ type: "content", content: "hel" })}${encodeAssistantSseEvent({ type: "content", content: "lo" })}data: [DONE]\n\n`;

	const first = parser.push(encoded.slice(0, 15));
	const second = parser.push(encoded.slice(15));

	assert.deepEqual(first.events, []);
	assert.deepEqual(second.events, [
		{ type: "content", content: "hel" },
		{ type: "content", content: "lo" },
	]);
	assert.equal(second.done, true);
});

test("assistant runtime caches static single-message responses", async () => {
	await withMockedGitHubFetch(async () => {
		const cache = createMapCache();
		let providerCalls = 0;

		const first = await createAssistantReply({
			messages: [{ role: "user", content: "What are Joseph's skills?" }],
			cache,
			complete: async (input) => {
				providerCalls += 1;
				assert.equal(input.messages[0]?.role, "system");
				return "TypeScript, React, Node.js, and AI systems.";
			},
		});
		const second = await createAssistantReply({
			messages: [{ role: "user", content: "What are Joseph's skills?" }],
			cache,
			complete: async () => {
				providerCalls += 1;
				return "unexpected";
			},
		});

		assert.equal(first.cacheStatus, "MISS");
		assert.equal(second.cacheStatus, "HIT");
		assert.equal(second.message, first.message);
		assert.equal(providerCalls, 1);
	});
});

test("assistant runtime bypasses cache for dynamic GitHub questions", async () => {
	await withMockedGitHubFetch(async () => {
		const cache = createMapCache({
			"What are Joseph's latest GitHub projects?": "stale",
		});
		let providerCalls = 0;

		const reply = await createAssistantReply({
			messages: [
				{ role: "user", content: "What are Joseph's latest GitHub projects?" },
			],
			cache,
			complete: async () => {
				providerCalls += 1;
				return "fresh GitHub answer";
			},
		});

		assert.equal(reply.cacheStatus, "MISS");
		assert.equal(reply.message, "fresh GitHub answer");
		assert.equal(providerCalls, 1);
	});
});

test("github portfolio helpers rank, filter, and summarize repos consistently", () => {
	const repos = [
		createRepo({ name: "portfolio", stargazers_count: 100 }),
		createRepo({ name: "archived", archived: true, stargazers_count: 50 }),
		createRepo({ name: "forked", fork: true, stargazers_count: 50 }),
		createRepo({
			name: "newer",
			homepage: "https://newer.example.com",
			language: "TypeScript",
			topics: ["react"],
			stargazers_count: 3,
			pushed_at: "2026-04-01T00:00:00Z",
		}),
		createRepo({
			name: "popular",
			stargazers_count: 10,
			pushed_at: "2025-01-01T00:00:00Z",
		}),
	];

	assert.deepEqual(
		createGitHubProjectPreviews(repos).map((project) => project.name),
		["popular", "newer"],
	);
	assert.equal(createGitHubProjectPreviews(repos)[1]?.status, "live");
	assert.deepEqual(
		createGitHubStatsSnapshot({
			repos,
			totalCommits: 12,
			now: new Date("2026-01-02T00:00:00Z"),
		}),
		{
			totalCommits: 12,
			totalRepos: 5,
			totalStars: 213,
			lastUpdated: "2026-01-02T00:00:00.000Z",
		},
	);
});

test("portfolio prompt is generated from the shared knowledge surface", () => {
	const prompt = createPortfolioSystemPromptBase();
	assert.match(prompt, /Joseph Sabag/);
	assert.match(prompt, /Predicto AI/);
	assert.match(prompt, /SmallBites/);
	assert.match(prompt, /SEND_EMAIL/);
});
