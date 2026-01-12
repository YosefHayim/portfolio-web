import { Router, type Request, type Response } from "express";
import OpenAI from "openai";
import { z } from "zod";
import { env } from "../config/env.js";
import { SYSTEM_PROMPT } from "../config/systemPrompt.js";
import { AppError, asyncHandler } from "../middleware/errorHandler.js";
import {
	chatRateLimiter,
	sttRateLimiter,
	ttsRateLimiter,
} from "../middleware/rateLimiter.js";
import { responseCache } from "../utils/cache.js";

const router: Router = Router();

// Reuse OpenAI client instance (connection pooling)
const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
	maxRetries: 2,
	timeout: 30000, // 30 second timeout
});

const chatRequestSchema = z.object({
	messages: z.array(
		z.object({
			role: z.enum(["user", "assistant"]),
			content: z.string().min(1).max(2000),
		}),
	),
});

type ChatRequest = z.infer<typeof chatRequestSchema>;

// Non-streaming endpoint with caching
router.post(
	"/",
	chatRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = chatRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			throw new AppError("Invalid request body", 400);
		}

		const { messages } = parseResult.data as ChatRequest;
		const lastUserMessage = messages[messages.length - 1]?.content || "";

		// Check cache for single-turn questions
		if (messages.length === 1) {
			const cachedResponse = responseCache.get(lastUserMessage);
			if (cachedResponse) {
				res.setHeader("X-Cache", "HIT");
				return res.json({
					success: true,
					message: cachedResponse,
				});
			}
		}

		res.setHeader("X-Cache", "MISS");

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
			max_tokens: 400, // Reduced from 500 for faster responses
			temperature: 0.7,
		});

		const responseMessage = completion.choices[0]?.message?.content;

		if (!responseMessage) {
			throw new AppError("No response from AI", 500);
		}

		// Cache single-turn responses
		if (messages.length === 1) {
			responseCache.set(lastUserMessage, responseMessage);
		}

		res.json({
			success: true,
			message: responseMessage,
		});
	}),
);

// Streaming endpoint - optimized for faster time-to-first-byte
router.post(
	"/stream",
	chatRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = chatRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			throw new AppError("Invalid request body", 400);
		}

		const { messages } = parseResult.data as ChatRequest;
		const lastUserMessage = messages[messages.length - 1]?.content || "";

		// Check cache for single-turn questions
		if (messages.length === 1) {
			const cachedResponse = responseCache.get(lastUserMessage);
			if (cachedResponse) {
				// Stream cached response for consistent UX
				res.setHeader("Content-Type", "text/event-stream");
				res.setHeader("Cache-Control", "no-cache");
				res.setHeader("Connection", "keep-alive");
				res.setHeader("X-Cache", "HIT");

				// Send cached response in chunks for natural feel
				const words = cachedResponse.split(" ");
				for (let i = 0; i < words.length; i += 3) {
					const chunk = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
					res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
				}
				res.write("data: [DONE]\n\n");
				return res.end();
			}
		}

		// Set up streaming response headers
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");
		res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering
		res.setHeader("X-Cache", "MISS");

		// Flush headers immediately for faster TTFB
		res.flushHeaders();

		let fullResponse = "";

		try {
			const stream = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
				max_tokens: 400,
				temperature: 0.7,
				stream: true,
			});

			for await (const chunk of stream) {
				const content = chunk.choices[0]?.delta?.content;
				if (content) {
					fullResponse += content;
					res.write(`data: ${JSON.stringify({ content })}\n\n`);
				}
			}

			// Cache the complete response for single-turn questions
			if (messages.length === 1 && fullResponse) {
				responseCache.set(lastUserMessage, fullResponse);
			}
		} catch (error) {
			// If streaming fails partway, send error event
			res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`);
		}

		res.write("data: [DONE]\n\n");
		res.end();
	}),
);

// Health check with cache stats
router.get("/health", (_req: Request, res: Response) => {
	const cacheStats = responseCache.getStats();
	res.json({
		status: "ok",
		timestamp: new Date().toISOString(),
		cache: cacheStats,
	});
});

const ttsRequestSchema = z.object({
	text: z.string().min(1).max(4096),
	voice: z
		.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"])
		.optional(),
});

router.post(
	"/tts",
	ttsRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = ttsRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			throw new AppError("Invalid request body", 400);
		}

		const { text, voice = "nova" } = parseResult.data;

		const mp3 = await openai.audio.speech.create({
			model: "tts-1", // Use tts-1 for speed, tts-1-hd for quality
			voice,
			input: text,
			response_format: "mp3",
			speed: 1.0,
		});

		const buffer = Buffer.from(await mp3.arrayBuffer());

		res.setHeader("Content-Type", "audio/mpeg");
		res.setHeader("Content-Length", buffer.length);
		res.setHeader("Cache-Control", "private, max-age=3600"); // Cache TTS for 1 hour
		res.send(buffer);
	}),
);

router.post(
	"/stt",
	sttRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const contentType = req.headers["content-type"] || "";

		if (!contentType.includes("audio/")) {
			throw new AppError("Invalid content type. Expected audio file.", 400);
		}

		const chunks: Buffer[] = [];

		for await (const chunk of req) {
			chunks.push(chunk);
		}

		const audioBuffer = Buffer.concat(chunks);

		if (audioBuffer.length === 0) {
			throw new AppError("No audio data received", 400);
		}

		const file = new File([audioBuffer], "audio.webm", { type: contentType });

		const transcription = await openai.audio.transcriptions.create({
			file,
			model: "whisper-1",
			language: "en",
		});

		res.json({
			success: true,
			text: transcription.text,
		});
	}),
);

export default router;
