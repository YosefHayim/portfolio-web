import type { NextFunction, Request, Response } from "express";
import {
	RATE_LIMIT_PRESETS,
	type RateLimitEntry,
	type RateLimiterOptions,
	cleanupRateLimitStore,
	consumeRateLimit,
} from "../core/rateLimit.js";

const ipStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 10 * 60 * 1000;

setInterval(() => {
	cleanupRateLimitStore(ipStore);
}, CLEANUP_INTERVAL);

function getClientIp(req: Request): string {
	const forwarded = req.headers["x-forwarded-for"];
	if (typeof forwarded === "string") {
		return forwarded.split(",")[0]?.trim() || "unknown";
	}
	if (Array.isArray(forwarded)) {
		return forwarded[0] ?? "unknown";
	}
	return req.ip || req.socket.remoteAddress || "unknown";
}

export function createRateLimiter(options: Partial<RateLimiterOptions> = {}) {
	const config: RateLimiterOptions = { ...RATE_LIMIT_PRESETS.chat, ...options };

	return (req: Request, res: Response, next: NextFunction) => {
		const result = consumeRateLimit(ipStore, getClientIp(req), config);

		if (!result.allowed) {
			return res.status(result.status).json(result.body);
		}

		for (const [header, value] of Object.entries(result.headers)) {
			res.setHeader(header, value);
		}

		next();
	};
}

export const chatRateLimiter = createRateLimiter(RATE_LIMIT_PRESETS.chat);
export const ttsRateLimiter = createRateLimiter(RATE_LIMIT_PRESETS.voice);
export const sttRateLimiter = createRateLimiter(RATE_LIMIT_PRESETS.voice);
export const emailRateLimiter = createRateLimiter(
	RATE_LIMIT_PRESETS.emailServer,
);

export function getRateLimitStatus(ip: string): RateLimitEntry | null {
	return ipStore.get(ip) || null;
}

export function clearRateLimitEntry(ip: string): boolean {
	return ipStore.delete(ip);
}
