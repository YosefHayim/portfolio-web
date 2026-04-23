import express, { Router, type Request, type Response } from "express";
import type { Billing } from "fresh-squeezy";
import { z } from "zod";
import { logger } from "../config/logger.js";
import { AppError, asyncHandler } from "../middleware/errorHandler.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";
import { createHealthResponse } from "../utils/http.js";
import { parseOrThrow } from "../utils/validation.js";

const webhookRateLimiter = createRateLimiter({
	windowMs: 60 * 1000,
	maxRequests: 100,
	burstWindowMs: 10 * 1000,
	maxBurst: 30,
	blockDurationMs: 60 * 1000,
	maxViolations: 5,
	permanentBlockAfterViolations: 10,
});

const webhookPayloadSchema = z.object({
	meta: z.object({
		event_name: z.string(),
		custom_data: z.record(z.unknown()).optional(),
		test_mode: z.boolean(),
	}),
	data: z.object({
		id: z.string(),
		type: z.string(),
		attributes: z.record(z.unknown()),
	}),
});

export function createWebhookRouter(billing: Billing | null): Router {
	const router: Router = Router();

	router.post(
		"/ls",
		webhookRateLimiter,
		express.raw({ type: "application/json", limit: "1mb" }),
		asyncHandler(async (req: Request, res: Response) => {
			if (!billing) {
				throw new AppError("Billing is not configured", 503);
			}

			const rawBody = (req.body instanceof Buffer)
				? req.body.toString()
				: String(req.body);

			const signature = req.headers["x-signature"];
			if (!signature || typeof signature !== "string") {
				throw new AppError("Missing X-Signature header", 401);
			}

			if (!billing.verifyWebhook(rawBody, signature)) {
				logger.warn("Webhook signature verification failed", {
					ip: req.ip,
				});
				throw new AppError("Invalid signature", 401);
			}

			const payload = parseOrThrow(
				webhookPayloadSchema,
				JSON.parse(rawBody),
				"Invalid webhook payload",
			);

			await billing.handleWebhook(payload);

			res.json({ success: true, received: true });
		}),
	);

	router.get("/health", (_req: Request, res: Response) => {
		res.json(createHealthResponse({
			billingConfigured: billing !== null,
		}));
	});

	return router;
}
