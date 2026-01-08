import { Router, type Request, type Response } from 'express';
import OpenAI from 'openai';
import { z } from 'zod';
import { env } from '../config/env.js';
import { SYSTEM_PROMPT } from '../config/systemPrompt.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1).max(2000),
    })
  ),
});

type ChatRequest = z.infer<typeof chatRequestSchema>;

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const parseResult = chatRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new AppError('Invalid request body', 400);
    }

    const { messages } = parseResult.data as ChatRequest;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      throw new AppError('No response from AI', 500);
    }

    res.json({
      success: true,
      message: responseMessage,
    });
  })
);

router.post(
  '/stream',
  asyncHandler(async (req: Request, res: Response) => {
    const parseResult = chatRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new AppError('Invalid request body', 400);
    }

    const { messages } = parseResult.data as ChatRequest;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
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

    res.write('data: [DONE]\n\n');
    res.end();
  })
);

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
