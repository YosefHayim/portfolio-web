import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger.js";

interface RateLimitEntry {
	count: number;
	windowStart: number;
	burstCount: number;
	burstWindowStart: number;
	blocked: boolean;
	blockedUntil: number;
	violations: number;
}

interface RateLimiterOptions {
	windowMs: number;
	maxRequests: number;
	burstWindowMs: number;
	maxBurst: number;
	blockDurationMs: number;
	maxViolations: number;
	permanentBlockAfterViolations: number;
}

const DEFAULT_OPTIONS: RateLimiterOptions = {
	windowMs: 60 * 1000,
	maxRequests: 20,
	burstWindowMs: 10 * 1000,
	maxBurst: 5,
	blockDurationMs: 5 * 60 * 1000,
	maxViolations: 3,
	permanentBlockAfterViolations: 5,
};

const ipStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 10 * 60 * 1000;
const ENTRY_MAX_AGE = 30 * 60 * 1000;

setInterval(() => {
	const now = Date.now();
	for (const [ip, entry] of ipStore.entries()) {
		const age = now - entry.windowStart;
		if (age > ENTRY_MAX_AGE && !entry.blocked) {
			ipStore.delete(ip);
		}
	}
}, CLEANUP_INTERVAL);

function getClientIp(req: Request): string {
	const forwarded = req.headers["x-forwarded-for"];
	if (typeof forwarded === "string") {
		return forwarded.split(",")[0].trim();
	}
	if (Array.isArray(forwarded)) {
		return forwarded[0];
	}
	return req.ip || req.socket.remoteAddress || "unknown";
}

export function createRateLimiter(options: Partial<RateLimiterOptions> = {}) {
	const config = { ...DEFAULT_OPTIONS, ...options };

	return (req: Request, res: Response, next: NextFunction) => {
		const ip = getClientIp(req);
		const now = Date.now();

		let entry = ipStore.get(ip);

		if (!entry) {
			entry = {
				count: 0,
				windowStart: now,
				burstCount: 0,
				burstWindowStart: now,
				blocked: false,
				blockedUntil: 0,
				violations: 0,
			};
			ipStore.set(ip, entry);
		}

		if (entry.blocked) {
			if (entry.violations >= config.permanentBlockAfterViolations) {
				logger.warn(`Permanently blocked IP attempted access: ${ip}`);
				return res.status(403).json({
					success: false,
					error:
						"Access denied. You have been permanently blocked due to repeated abuse.",
					blocked: true,
					permanent: true,
				});
			}

			if (now < entry.blockedUntil) {
				const remainingSeconds = Math.ceil((entry.blockedUntil - now) / 1000);
				logger.warn(
					`Blocked IP attempted access: ${ip}, ${remainingSeconds}s remaining`,
				);
				return res.status(429).json({
					success: false,
					error: `You are temporarily blocked. Try again in ${remainingSeconds} seconds.`,
					blocked: true,
					retryAfter: remainingSeconds,
				});
			}

			entry.blocked = false;
			entry.count = 0;
			entry.windowStart = now;
			entry.burstCount = 0;
			entry.burstWindowStart = now;
		}

		if (now - entry.windowStart > config.windowMs) {
			entry.count = 0;
			entry.windowStart = now;
		}

		if (now - entry.burstWindowStart > config.burstWindowMs) {
			entry.burstCount = 0;
			entry.burstWindowStart = now;
		}

		entry.count++;
		entry.burstCount++;

		const isBurstViolation = entry.burstCount > config.maxBurst;
		const isRateLimitViolation = entry.count > config.maxRequests;

		if (isBurstViolation || isRateLimitViolation) {
			entry.violations++;
			const blockMultiplier = Math.min(entry.violations, 5);
			const blockDuration = config.blockDurationMs * blockMultiplier;

			entry.blocked = true;
			entry.blockedUntil = now + blockDuration;

			const violationType = isBurstViolation ? "burst" : "rate limit";
			logger.warn(
				`IP ${ip} blocked for ${violationType} violation. ` +
					`Violations: ${entry.violations}, Block duration: ${blockDuration / 1000}s`,
			);

			const remainingSeconds = Math.ceil(blockDuration / 1000);

			return res.status(429).json({
				success: false,
				error: `Too many requests. You have been blocked for ${remainingSeconds} seconds.`,
				blocked: true,
				retryAfter: remainingSeconds,
				violations: entry.violations,
			});
		}

		res.setHeader("X-RateLimit-Limit", config.maxRequests.toString());
		res.setHeader(
			"X-RateLimit-Remaining",
			Math.max(0, config.maxRequests - entry.count).toString(),
		);
		res.setHeader(
			"X-RateLimit-Reset",
			Math.ceil((entry.windowStart + config.windowMs) / 1000).toString(),
		);

		next();
	};
}

export const chatRateLimiter = createRateLimiter({
	windowMs: 60 * 1000,
	maxRequests: 20,
	burstWindowMs: 10 * 1000,
	maxBurst: 5,
	blockDurationMs: 5 * 60 * 1000,
	maxViolations: 3,
	permanentBlockAfterViolations: 5,
});

export const ttsRateLimiter = createRateLimiter({
	windowMs: 60 * 1000,
	maxRequests: 10,
	burstWindowMs: 10 * 1000,
	maxBurst: 3,
	blockDurationMs: 10 * 60 * 1000,
	maxViolations: 3,
	permanentBlockAfterViolations: 5,
});

export const sttRateLimiter = createRateLimiter({
	windowMs: 60 * 1000,
	maxRequests: 10,
	burstWindowMs: 10 * 1000,
	maxBurst: 3,
	blockDurationMs: 10 * 60 * 1000,
	maxViolations: 3,
	permanentBlockAfterViolations: 5,
});

export function getRateLimitStatus(ip: string): RateLimitEntry | null {
	return ipStore.get(ip) || null;
}

export function clearRateLimitEntry(ip: string): boolean {
	return ipStore.delete(ip);
}
