import { createBilling, type Billing, type BillingConfig } from "fresh-squeezy";
import { logger } from "./logger.js";

let billingInstance: Billing | null = null;

export async function initBilling(): Promise<Billing | null> {
	const apiKey = process.env.LS_API_KEY;
	const webhookSecret = process.env.LS_WEBHOOK_SECRET;

	if (!apiKey) {
		logger.info("LS_API_KEY not set — billing disabled");
		return null;
	}

	const config: BillingConfig = {
		apiKey,
		webhookSecret,
		logger: {
			custom: {
				info: (entry) => logger.info("billing", entry),
				warn: (entry) => logger.warn("billing", entry),
				error: (entry) => logger.error("billing", entry),
			},
		},
		callbacks: {
			onPurchase: async (event) => {
				logger.info(
					`Purchase: order=${event.orderId} email=${event.email} product=${event.productName} price=${event.price}`,
				);
			},
			onRefund: async (event) => {
				logger.info(`Refund: order=${event.orderId} email=${event.email}`);
			},
			onSubscription: async (event, method) => {
				logger.info(
					`Subscription ${method}: user=${event.userId} email=${event.email}`,
				);
			},
			onSubscriptionPayment: async (event, method) => {
				logger.info(
					`Subscription payment ${method}: user=${event.userId} email=${event.email}`,
				);
			},
			onPaymentFailed: async (event) => {
				logger.warn(
					`Payment failed: user=${event.userId} email=${event.email}`,
				);
			},
			onLicenseKey: async (method, event) => {
				logger.info(`License key ${method}: key=${event.key}`);
			},
			onWebhook: async (eventType, event) => {
				logger.info(`Webhook catch-all: type=${eventType}`, {
					event: JSON.stringify(event),
				});
			},
		},
	};

	try {
		billingInstance = await createBilling(config);
		logger.info("Billing initialized successfully");
		return billingInstance;
	} catch (err) {
		logger.error("Failed to initialize billing — webhooks disabled", {
			error: err instanceof Error ? err.message : String(err),
		});
		return null;
	}
}

export function getBilling(): Billing | null {
	return billingInstance;
}
