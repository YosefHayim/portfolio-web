import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { env } from "../config/env.js";
import { AppError, asyncHandler } from "../middleware/errorHandler.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const router: Router = Router();

// Rate limiter for email - reasonable limits for portfolio
const emailRateLimiter = createRateLimiter({
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 10, // 10 emails per minute max
	maxBurst: 5, // 5 rapid requests allowed
	burstWindowMs: 30 * 1000,
	blockDurationMs: 60 * 1000, // 1 min block (not 15 min)
	maxViolations: 5, // more tolerance
});

const emailRequestSchema = z.object({
	senderName: z.string().min(1).max(100),
	senderEmail: z.string().email().max(254),
	subject: z.string().min(1).max(200),
	message: z.string().min(10).max(5000),
});

type EmailRequest = z.infer<typeof emailRequestSchema>;

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

router.post(
	"/send",
	emailRateLimiter,
	asyncHandler(async (req: Request, res: Response) => {
		const parseResult = emailRequestSchema.safeParse(req.body);

		if (!parseResult.success) {
			const errors = parseResult.error.flatten().fieldErrors;
			throw new AppError(
				`Invalid request: ${Object.entries(errors)
					.map(([k, v]) => `${k}: ${v?.join(", ")}`)
					.join("; ")}`,
				400,
			);
		}

		const { senderName, senderEmail, subject, message } =
			parseResult.data as EmailRequest;

		// Check if email is configured
		if (!env.EMAIL_USER || !env.EMAIL_PASS) {
			throw new AppError("Email service is not configured", 503);
		}

		const transporter = createTransporter();

		const mailOptions = {
			from: `"Portfolio Contact" <${env.EMAIL_USER}>`,
			to: "yosefisabag@gmail.com",
			replyTo: `"${senderName}" <${senderEmail}>`,
			subject: `[Portfolio] ${subject}`,
			text: `
New message from your portfolio website:

From: ${senderName}
Email: ${senderEmail}
Subject: ${subject}

Message:
${message}

---
This email was sent via the AI chat on your portfolio website.
`,
			html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #05df72, #00b4d8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-top: none; }
    .field { margin-bottom: 15px; }
    .label { font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 4px; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; white-space: pre-wrap; }
    .footer { text-align: center; padding: 15px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Portfolio Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${senderName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${senderEmail}">${senderEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent via AI Chat on your portfolio website
    </div>
  </div>
</body>
</html>
`,
		};

		await transporter.sendMail(mailOptions);

		res.json({
			success: true,
			message: "Email sent successfully",
		});
	}),
);

router.get("/health", (_req: Request, res: Response) => {
	res.json({
		status: "ok",
		configured: !!(env.EMAIL_USER && env.EMAIL_PASS),
		timestamp: new Date().toISOString(),
	});
});

export default router;
