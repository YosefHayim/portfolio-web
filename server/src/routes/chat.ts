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

const router = Router();

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
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

router.post(
	"/",
	chatRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = chatRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			throw new AppError("Invalid request body", 400);
		}

		const { messages } = parseResult.data as ChatRequest;

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
			max_tokens: 500,
			temperature: 0.7,
		});

		const responseMessage = completion.choices[0]?.message?.content;

		if (!responseMessage) {
			throw new AppError("No response from AI", 500);
		}

		res.json({
			success: true,
			message: responseMessage,
		});
	}),
);

router.post(
	"/stream",
	chatRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = chatRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			throw new AppError("Invalid request body", 400);
		}

		const { messages } = parseResult.data as ChatRequest;

		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		const stream = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
			max_tokens: 500,
			temperature: 0.7,
			stream: true,
		});

		for await (const chunk of stream) {
			const content = chunk.choices[0]?.delta?.content;
			if (content) {
				res.write(`data: ${JSON.stringify({ content })}\n\n`);
			}
		}

		res.write("data: [DONE]\n\n");
		res.end();
	}),
);

router.get("/health", (_req: Request, res: Response) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
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
			model: "tts-1",
			voice,
			input: text,
			response_format: "mp3",
		});

		const buffer = Buffer.from(await mp3.arrayBuffer());

		res.setHeader("Content-Type", "audio/mpeg");
		res.setHeader("Content-Length", buffer.length);
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
