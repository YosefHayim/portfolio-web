import { type Request, type Response, Router } from "express";
import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import {
	type PortfolioEmailDelivery,
	createPortfolioApiRuntime,
} from "../core/portfolioApiRuntime.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { emailRateLimiter } from "../middleware/rateLimiter.js";
import { createHealthResponse } from "../utils/http.js";

const router: Router = Router();

// Create reusable transporter
const createTransporter = () => {
	return nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASS,
		},
	});
};

const emailDelivery: PortfolioEmailDelivery = {
	isConfigured: () => Boolean(env.EMAIL_USER && env.EMAIL_PASS),
	send: async ({ emailInput, email, recipient }) => {
		const transporter = createTransporter();
		await transporter.sendMail({
			from: `"Portfolio Contact" <${env.EMAIL_USER}>`,
			to: recipient,
			replyTo: `"${emailInput.senderName}" <${emailInput.senderEmail}>`,
			subject: email.subject,
			text: email.text,
			html: email.html,
		});
	},
};

const apiRuntime = createPortfolioApiRuntime({ emailDelivery });

router.post(
	"/send",
	emailRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		res.json(await apiRuntime.sendPortfolioEmail(req.body));
	}),
);

router.get("/health", (_req: Request, res: Response) => {
	res.json(createHealthResponse(apiRuntime.getEmailHealth()));
});

export default router;
