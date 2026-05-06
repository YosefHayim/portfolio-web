type AssetFetcher = {
  fetch(request: Request): Promise<Response>;
};

type Env = {
  ASSETS: AssetFetcher;
  OPENAI_API_KEY?: string;
  FRONTEND_URL?: string;
  CONTACT_RECIPIENT?: string;
  EMAIL_FROM?: string;
  EMAIL?: {
    send(message: {
      to: string;
      from: { email: string; name?: string } | string;
      replyTo?: { email: string; name?: string } | string;
      subject: string;
      html: string;
      text: string;
    }): Promise<unknown>;
  };
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type CacheEntry = {
  response: string;
  timestamp: number;
};

type RateLimitEntry = {
  count: number;
  windowStart: number;
  burstCount: number;
  burstWindowStart: number;
  blockedUntil: number;
  violations: number;
};

type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  burstWindowMs: number;
  maxBurst: number;
  blockDurationMs: number;
  permanentBlockAfterViolations: number;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "YosefHayim";
const MAX_PROJECTS_IN_CONTEXT = 6;
const GITHUB_CACHE_TTL_MS = 1000 * 60 * 10;
const RESPONSE_CACHE_TTL_MS = 1000 * 60 * 60;
const MAX_RESPONSE_CACHE_SIZE = 100;
const RATE_ENTRY_MAX_AGE_MS = 30 * 60 * 1000;
const CONTACT_RECIPIENT_DEFAULT = "yosefisabag@gmail.com";
const EXCLUDED_REPO_NAMES = new Set(["yosefhayim", "template", "portfolio"]);
const STATIC_ASSET_REWRITES = new Map([
  ["/audio-transcriber/privacy", "/audio-transcriber-privacy"],
  ["/audio-transcriber/privacy/", "/audio-transcriber-privacy"],
]);

const BASE_SYSTEM_PROMPT = `You are Joseph Sabag's portfolio AI assistant. Help recruiters, founders, and technical visitors understand why Joseph is a strong AI software engineering candidate.

## Joseph Sabag - AI Software Engineer

**Positioning**: Joseph builds practical AI and full-stack products that automate real workflows, reduce manual work, and ship quickly with production reliability.
**Current profile focus**: AI software engineering, backend architecture, API integrations, automation systems, and production-grade React/Node/TypeScript products.
**Experience**:
- Predicto AI, Software Engineer (Jul 2025 - current profile): production React 18 features, zero-data-loss migration of 10 years of production data to Cloudflare, CMS/theme/tooling work to protect ad revenue quality.
- Wotch Health, Software Engineer Intern (Feb 2025 - Apr 2025): optimized CI/CD and real-time healthcare testing workflows, WebSocket testing with Jest/Playwright, production debugging tool with sensitive-data masking.
- Automation Developer (Aug 2023 - Sep 2024): Python/API automation, marketplace and data workflows.

**Proof points**: systems serving 83M+ daily requests, zero-data-loss migration of 10 years of data, products with 500+ active users, production iOS app delivery, open-source MCP/tooling work.
**Education**: B.Sc Computer Science at Open University (Oct 2025+), IITC Full Stack Bootcamp (795hrs, Excellence)
**Military**: IDF Infantry Commander, Gdud 931 (2018-2021), 2x Excellence Awards

## Skills
Backend: Node.js, Express, TypeScript, Python, REST/GraphQL
Frontend: React, React Native, Next.js, Tailwind, Framer Motion
DB: MongoDB, PostgreSQL, Supabase, Firebase
DevOps: AWS, GitHub Actions, Docker, CI/CD
APIs: eBay, OpenAI, Google, Telegram, Binance
Testing: Vitest, Jest, Playwright

## Featured Product Work
- SmallBites: published React Native/Expo product for baby-led weaning guidance, 400+ first-food database, meal plans, progress tracking, and 300+ recipes.
- WiseNoteTaker: AI meeting-notes app for recording, transcription, summaries, and structured action notes.
- eBay MCP API Server: open-source MCP server for eBay Sell APIs, broad tool coverage, tests, and npm distribution.
- Automation and marketplace tools: Amazon/eBay workflow automation, prompt queue extensions, AI assistant tooling, OCR/parser projects, and trading/data bots.

## Contact
GitHub: https://github.com/YosefHayim
LinkedIn: https://www.linkedin.com/in/yosef-hayim-sabag/
Resume: available on the website and at https://docs.google.com/document/d/1oMcChoLpNMrr-E8fcXUsb7RED5yXZ9J1mUCjcjGTUlw/edit?tab=t.0
WhatsApp: available on the website

## Email Capability
You can send emails to Joseph. When user wants to contact him:
1. Collect: name and email address
2. Subject is auto-inferred from conversation
3. When ready, end response with:
[SEND_EMAIL:{"senderName":"Name","senderEmail":"email@example.com","subject":"Brief Subject","message":"Message content"}]

## Guidelines
- Be professional but personable
- Highlight relevant skills for recruiters
- Give specific project examples and concrete impact metrics
- When asked about GitHub or recent projects, use the live GitHub snapshot below first
- When asked about LinkedIn or resume details, use the profile/resume links above and avoid claiming live LinkedIn scraping
- Keep responses concise (2-3 paragraphs max)
- Use markdown for readability
- Redirect salary/availability questions to direct contact`;

const responseCache = new Map<string, CacheEntry>();
const rateLimitStore = new Map<string, RateLimitEntry>();

let githubContextCache: { value: string; expiresAt: number } | null = null;

const chatRateLimiter = {
  windowMs: 60 * 1000,
  maxRequests: 20,
  burstWindowMs: 10 * 1000,
  maxBurst: 5,
  blockDurationMs: 5 * 60 * 1000,
  permanentBlockAfterViolations: 5,
};

const ttsRateLimiter = {
  windowMs: 60 * 1000,
  maxRequests: 10,
  burstWindowMs: 10 * 1000,
  maxBurst: 3,
  blockDurationMs: 10 * 60 * 1000,
  permanentBlockAfterViolations: 5,
};

const sttRateLimiter = ttsRateLimiter;
const emailRateLimiter = {
  windowMs: 60 * 1000,
  maxRequests: 10,
  burstWindowMs: 30 * 1000,
  maxBurst: 5,
  blockDurationMs: 60 * 1000,
  permanentBlockAfterViolations: 10,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && isApiPath(url.pathname)) {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    try {
      if (url.pathname === "/health") {
        return jsonResponse(request, env, {
          status: "ok",
          runtime: "cloudflare-worker",
          timestamp: new Date().toISOString(),
        });
      }

      if (url.pathname.startsWith("/api/")) {
        return await handleApiRequest(request, env, url);
      }

      const assetPath = STATIC_ASSET_REWRITES.get(url.pathname);
      if (assetPath) {
        const assetUrl = new URL(request.url);
        assetUrl.pathname = assetPath;
        return env.ASSETS.fetch(new Request(assetUrl, request));
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      const message = error instanceof HttpError ? error.message : "An unexpected error occurred";
      const status = error instanceof HttpError ? error.status : 500;
      return jsonResponse(request, env, { success: false, error: message }, status);
    }
  },
};

class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function handleApiRequest(request: Request, env: Env, url: URL): Promise<Response> {
  if (url.pathname === "/api/chat/health" && request.method === "GET") {
    return jsonResponse(request, env, {
      status: "ok",
      timestamp: new Date().toISOString(),
      cache: { size: responseCache.size, maxSize: MAX_RESPONSE_CACHE_SIZE },
    });
  }

  if (url.pathname === "/api/email/health" && request.method === "GET") {
    return jsonResponse(request, env, {
      status: "ok",
      timestamp: new Date().toISOString(),
      configured: Boolean(env.EMAIL && env.EMAIL_FROM),
    });
  }

  if (url.pathname === "/api/chat" && request.method === "POST") {
    return withRateLimit(request, env, chatRateLimiter, () => handleChat(request, env));
  }

  if (url.pathname === "/api/chat/stream" && request.method === "POST") {
    return withRateLimit(request, env, chatRateLimiter, () => handleChatStream(request, env));
  }

  if (url.pathname === "/api/chat/tts" && request.method === "POST") {
    return withRateLimit(request, env, ttsRateLimiter, () => handleTextToSpeech(request, env));
  }

  if (url.pathname === "/api/chat/stt" && request.method === "POST") {
    return withRateLimit(request, env, sttRateLimiter, () => handleSpeechToText(request, env));
  }

  if (url.pathname === "/api/email/send" && request.method === "POST") {
    return withRateLimit(request, env, emailRateLimiter, () => handleSendEmail(request, env));
  }

  throw new HttpError("Not found", 404);
}

async function withRateLimit(
  request: Request,
  env: Env,
  options: RateLimiterOptions,
  handler: () => Promise<Response>,
): Promise<Response> {
  cleanupRateLimitStore();

  const ip = getClientIp(request);
  const now = Date.now();
  let entry = rateLimitStore.get(ip);

  if (!entry) {
    entry = {
      count: 0,
      windowStart: now,
      burstCount: 0,
      burstWindowStart: now,
      blockedUntil: 0,
      violations: 0,
    };
    rateLimitStore.set(ip, entry);
  }

  if (entry.violations >= options.permanentBlockAfterViolations) {
    return jsonResponse(
      request,
      env,
      {
        success: false,
        error: "Access denied. You have been permanently blocked due to repeated abuse.",
        blocked: true,
        permanent: true,
      },
      403,
    );
  }

  if (now < entry.blockedUntil) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
    return jsonResponse(
      request,
      env,
      {
        success: false,
        error: `You are temporarily blocked. Try again in ${retryAfter} seconds.`,
        blocked: true,
        retryAfter,
      },
      429,
    );
  }

  if (now - entry.windowStart > options.windowMs) {
    entry.count = 0;
    entry.windowStart = now;
  }

  if (now - entry.burstWindowStart > options.burstWindowMs) {
    entry.burstCount = 0;
    entry.burstWindowStart = now;
  }

  entry.count += 1;
  entry.burstCount += 1;

  if (entry.count > options.maxRequests || entry.burstCount > options.maxBurst) {
    entry.violations += 1;
    const blockDuration = options.blockDurationMs * Math.min(entry.violations, 5);
    entry.blockedUntil = now + blockDuration;

    return jsonResponse(
      request,
      env,
      {
        success: false,
        error: `Too many requests. You have been blocked for ${Math.ceil(blockDuration / 1000)} seconds.`,
        blocked: true,
        retryAfter: Math.ceil(blockDuration / 1000),
        violations: entry.violations,
      },
      429,
    );
  }

  const response = await handler();
  response.headers.set("X-RateLimit-Limit", String(options.maxRequests));
  response.headers.set("X-RateLimit-Remaining", String(Math.max(0, options.maxRequests - entry.count)));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil((entry.windowStart + options.windowMs) / 1000)));
  return response;
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  const { messages } = await parseChatRequest(request);
  const lastUserMessage = messages[messages.length - 1]?.content ?? "";
  const shouldBypassCache = hasDynamicPortfolioIntent(lastUserMessage);

  if (messages.length === 1 && !shouldBypassCache) {
    const cached = getCachedResponse(lastUserMessage);
    if (cached) {
      const response = jsonResponse(request, env, { success: true, message: cached });
      response.headers.set("X-Cache", "HIT");
      return response;
    }
  }

  const systemPrompt = await getSystemPrompt();
  const completion = await fetchOpenAiJson(env, "/v1/chat/completions", {
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    max_tokens: 400,
    temperature: 0.7,
  });

  const responseMessage = readCompletionText(completion);
  if (!responseMessage) {
    throw new HttpError("No response from AI", 500);
  }

  if (messages.length === 1 && !shouldBypassCache) {
    setCachedResponse(lastUserMessage, responseMessage);
  }

  const response = jsonResponse(request, env, { success: true, message: responseMessage });
  response.headers.set("X-Cache", "MISS");
  return response;
}

async function handleChatStream(request: Request, env: Env): Promise<Response> {
  const { messages } = await parseChatRequest(request);
  const lastUserMessage = messages[messages.length - 1]?.content ?? "";
  const shouldBypassCache = hasDynamicPortfolioIntent(lastUserMessage);
  const headers = new Headers(corsHeaders(request, env));
  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache");
  headers.set("Connection", "keep-alive");
  headers.set("X-Accel-Buffering", "no");

  if (messages.length === 1 && !shouldBypassCache) {
    const cached = getCachedResponse(lastUserMessage);
    if (cached) {
      headers.set("X-Cache", "HIT");
      return new Response(streamCachedResponse(cached), { headers });
    }
  }

  headers.set("X-Cache", "MISS");
  const systemPrompt = await getSystemPrompt();
  const openAiResponse = await fetchOpenAi(env, "/v1/chat/completions", {
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    max_tokens: 400,
    temperature: 0.7,
    stream: true,
  });

  if (!openAiResponse.ok || !openAiResponse.body) {
    return new Response(streamError("AI provider unavailable"), { headers, status: 502 });
  }

  return new Response(
    transformOpenAiStream(openAiResponse.body, {
      cacheKey: messages.length === 1 && !shouldBypassCache ? lastUserMessage : null,
    }),
    { headers },
  );
}

async function handleTextToSpeech(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const text = asString(body.text, "text", 1, 4096);
  const voice = body.voice === undefined ? "nova" : asEnum(body.voice, "voice", ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]);
  const openAiResponse = await fetchOpenAi(env, "/v1/audio/speech", {
    model: "tts-1",
    voice,
    input: text,
    response_format: "mp3",
    speed: 1,
  });

  if (!openAiResponse.ok || !openAiResponse.body) {
    throw new HttpError("Text-to-speech provider unavailable", 502);
  }

  const headers = new Headers(corsHeaders(request, env));
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Cache-Control", "private, max-age=3600");
  return new Response(openAiResponse.body, { headers, status: openAiResponse.status });
}

async function handleSpeechToText(request: Request, env: Env): Promise<Response> {
  requireOpenAiKey(env);

  const contentType = request.headers.get("Content-Type") ?? "";
  if (!contentType.includes("audio/")) {
    throw new HttpError("Invalid content type. Expected audio file.", 400);
  }

  const audioBuffer = await request.arrayBuffer();
  if (audioBuffer.byteLength === 0) {
    throw new HttpError("No audio data received", 400);
  }

  const form = new FormData();
  form.append("file", new File([audioBuffer], "audio.webm", { type: contentType }));
  form.append("model", "whisper-1");
  form.append("language", "en");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: form,
  });

  if (!response.ok) {
    throw new HttpError("Speech-to-text provider unavailable", 502);
  }

  const data = (await response.json()) as { text?: string };
  return jsonResponse(request, env, { success: true, text: data.text ?? "" });
}

async function handleSendEmail(request: Request, env: Env): Promise<Response> {
  const body = await readJson(request);
  const senderName = asString(body.senderName, "senderName", 1, 100);
  const senderEmail = asEmail(body.senderEmail, "senderEmail");
  const subject = asString(body.subject, "subject", 1, 200);
  const message = asString(body.message, "message", 10, 5000);

  if (!env.EMAIL || !env.EMAIL_FROM) {
    throw new HttpError("Email service is not configured", 503);
  }

  const text = `New message from your portfolio website:

From: ${senderName}
Email: ${senderEmail}
Subject: ${subject}

Message:
${message}

---
This email was sent via the AI chat on your portfolio website.
`;

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333">
  <div style="max-width:600px;margin:0 auto;padding:20px">
    <div style="background:linear-gradient(135deg,#05df72,#00b4d8);color:white;padding:20px;border-radius:8px 8px 0 0">
      <h2 style="margin:0">New Portfolio Message</h2>
    </div>
    <div style="background:#f9f9f9;padding:20px;border:1px solid #e0e0e0;border-top:none">
      <p><strong>From:</strong> ${escapeHtml(senderName)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(senderEmail)}">${escapeHtml(senderEmail)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <div style="background:white;padding:15px;border-radius:8px;border:1px solid #e0e0e0;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
  </div>
</body>
</html>`;

  await env.EMAIL.send({
    to: env.CONTACT_RECIPIENT || CONTACT_RECIPIENT_DEFAULT,
    from: { email: env.EMAIL_FROM, name: "Portfolio Contact" },
    replyTo: { email: senderEmail, name: senderName },
    subject: `[Portfolio] ${subject}`,
    html,
    text,
  });

  return jsonResponse(request, env, { success: true, message: "Email sent successfully" });
}

async function parseChatRequest(request: Request): Promise<{ messages: ChatMessage[] }> {
  const body = await readJson(request);
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    throw new HttpError("Invalid request body", 400);
  }

  return {
    messages: body.messages.map((message: unknown) => {
      if (!isRecord(message)) {
        throw new HttpError("Invalid request body", 400);
      }

      const role = asEnum(message.role, "role", ["user", "assistant"]);
      const content = asString(message.content, "content", 1, 2000);
      return { role, content };
    }),
  };
}

async function getSystemPrompt(): Promise<string> {
  const githubContext = await getDynamicGitHubProjectsContext();
  return `${BASE_SYSTEM_PROMPT}\n\n${githubContext}`;
}

async function getDynamicGitHubProjectsContext(): Promise<string> {
  const now = Date.now();
  if (githubContextCache && githubContextCache.expiresAt > now) {
    return githubContextCache.value;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-worker" },
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];

    const filtered = repos.filter((repo) => !repo.fork && !repo.archived && !EXCLUDED_REPO_NAMES.has(repo.name.trim().toLowerCase()));
    const topProjects = filtered
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
      })
      .slice(0, MAX_PROJECTS_IN_CONTEXT);

    const totalStars = filtered.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const projectsList =
      topProjects.length > 0
        ? topProjects
            .map(
              (repo) =>
                `- ${repo.name} (${repo.stargazers_count} stars, updated ${formatUpdatedAt(repo.pushed_at)}): ${sanitizeDescription(repo.description)} (${repo.html_url})`,
            )
            .join("\n")
        : "- No repositories found.";

    const context = `## Live GitHub Projects Snapshot
Source: GitHub API for ${GITHUB_USERNAME}, auto-fetched by server.
Public repositories: ${filtered.length}
Total stars: ${totalStars}

Top active projects:
${projectsList}

When users ask about recent repos/projects, prioritize this live snapshot over generic examples.`;

    githubContextCache = { value: context, expiresAt: now + GITHUB_CACHE_TTL_MS };
    return context;
  } catch {
    const fallbackContext = `## Live GitHub Projects Snapshot
GitHub live snapshot is temporarily unavailable. If asked for recent repos/projects, direct the user to https://github.com/${GITHUB_USERNAME} and avoid inventing specifics.`;

    githubContextCache = { value: fallbackContext, expiresAt: now + GITHUB_CACHE_TTL_MS };
    return fallbackContext;
  }
}

async function fetchOpenAiJson(env: Env, path: string, body: unknown): Promise<unknown> {
  const response = await fetchOpenAi(env, path, body);
  if (!response.ok) {
    throw new HttpError("AI provider unavailable", 502);
  }
  return response.json();
}

async function fetchOpenAi(env: Env, path: string, body: unknown): Promise<Response> {
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

function transformOpenAiStream(
  body: ReadableStream<Uint8Array>,
  options: { cacheKey: string | null },
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let fullResponse = "";
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();

      try {
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
              if (options.cacheKey && fullResponse) {
                setCachedResponse(options.cacheKey, fullResponse);
              }
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              continue;
            }

            try {
              const parsed = JSON.parse(data) as { choices?: Array<{ delta?: { content?: string } }> };
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            } catch {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "AI stream parse error" })}\n\n`));
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "AI provider unavailable" })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });
}

function streamCachedResponse(response: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = response.split(" ");

  return new ReadableStream({
    start(controller) {
      for (let index = 0; index < words.length; index += 3) {
        const chunk = words.slice(index, index + 3).join(" ") + (index + 3 < words.length ? " " : "");
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function streamError(message: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function readCompletionText(completion: unknown): string {
  if (!isRecord(completion) || !Array.isArray(completion.choices)) {
    return "";
  }

  const firstChoice = completion.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    return "";
  }

  return typeof firstChoice.message.content === "string" ? firstChoice.message.content : "";
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    if (!isRecord(body)) {
      throw new HttpError("Invalid request body", 400);
    }
    return body;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError("Invalid JSON body", 400);
  }
}

function jsonResponse(request: Request, env: Env, body: unknown, status = 200): Response {
  const headers = new Headers(corsHeaders(request, env));
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body), { status, headers });
}

function corsHeaders(request: Request, env: Env): Headers {
  const origin = request.headers.get("Origin");
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  });

  if (origin && isAllowedOrigin(origin, env)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
}

function isAllowedOrigin(origin: string, env: Env): boolean {
  const allowed = new Set(
    (env.FRONTEND_URL ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

  try {
    const url = new URL(origin);
    return allowed.has(origin) || url.hostname === "localhost" || url.hostname.endsWith(".workers.dev");
  } catch {
    return false;
  }
}

function isApiPath(pathname: string): boolean {
  return pathname === "/health" || pathname.startsWith("/api/");
}

function requireOpenAiKey(env: Env): void {
  if (!env.OPENAI_API_KEY) {
    throw new HttpError("OPENAI_API_KEY is not configured", 503);
  }
}

function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get("CF-Connecting-IP");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return "unknown";
}

function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_ENTRY_MAX_AGE_MS && now >= entry.blockedUntil) {
      rateLimitStore.delete(ip);
    }
  }
}

function hasDynamicPortfolioIntent(message: string): boolean {
  return /\b(github|repo|repos|project|projects|recent|latest|newest|updated)\b/i.test(message);
}

function getCachedResponse(message: string): string | null {
  if (!isCacheable(message)) {
    return null;
  }

  const key = generateCacheKey(message);
  const entry = responseCache.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > RESPONSE_CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }

  return entry.response;
}

function setCachedResponse(message: string, response: string): void {
  if (!isCacheable(message)) {
    return;
  }

  if (responseCache.size >= MAX_RESPONSE_CACHE_SIZE) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) {
      responseCache.delete(oldestKey);
    }
  }

  responseCache.set(generateCacheKey(message), { response, timestamp: Date.now() });
}

function isCacheable(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return [
    /skill/,
    /tech/,
    /proficien/,
    /stack/,
    /language/,
    /project/,
    /built/,
    /portfolio/,
    /work.*on/,
    /experience/,
    /background/,
    /career/,
    /job/,
    /who.*is/,
    /tell.*about/,
    /introduce/,
    /education/,
    /degree/,
    /study/,
    /bootcamp/,
    /contact/,
    /reach/,
    /hire/,
  ].some((pattern) => pattern.test(lowerMessage));
}

function generateCacheKey(message: string): string {
  return message
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function sanitizeDescription(description: string | null): string {
  if (!description) {
    return "No description provided.";
  }

  const compact = description.replace(/\s+/g, " ").trim();
  return compact.length > 140 ? `${compact.slice(0, 137)}...` : compact;
}

function asString(value: unknown, field: string, min: number, max: number): string {
  if (typeof value !== "string") {
    throw new HttpError(`Invalid request: ${field} is required`, 400);
  }

  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) {
    throw new HttpError(`Invalid request: ${field} must be between ${min} and ${max} characters`, 400);
  }

  return trimmed;
}

function asEmail(value: unknown, field: string): string {
  const email = asString(value, field, 3, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(`Invalid request: ${field} must be a valid email`, 400);
  }
  return email;
}

function asEnum<T extends string>(value: unknown, field: string, values: readonly T[]): T {
  if (typeof value !== "string" || !values.includes(value as T)) {
    throw new HttpError(`Invalid request: ${field} is invalid`, 400);
  }
  return value as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
