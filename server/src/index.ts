import cors from "cors";
import express, { type Express } from "express";
import { env } from "./config/env.js";
import { httpLogger, logger } from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import chatRouter from "./routes/chat.js";

const app: Express = express();

const corsOptions = {
	origin: env.FRONTEND_URL.split(",").map((url) => url.trim()),
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
	const start = Date.now();
	res.on("finish", () => {
		const responseTime = Date.now() - start;
		httpLogger(req, res, responseTime);
	});
	next();
});

app.use("/api/chat", chatRouter);

app.get("/health", (_req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
	logger.info(`Server running on port ${env.PORT}`);
	logger.info(`Environment: ${env.NODE_ENV}`);
	logger.debug(`CORS origins: ${env.FRONTEND_URL}`);
});

export default app;
