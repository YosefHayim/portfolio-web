import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV !== "production";

const logsDir = path.join(__dirname, "../../logs");

type LogInfo = {
	timestamp?: string;
	level: string;
	message: string;
	stack?: string;
};

const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.errors({ stack: true }),
	winston.format.printf((info: LogInfo) => {
		const logMessage = `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
		return info.stack ? `${logMessage}\n${info.stack}` : logMessage;
	}),
);

const consoleFormat = winston.format.combine(
	winston.format.colorize({ all: true }),
	winston.format.timestamp({ format: "HH:mm:ss" }),
	winston.format.printf((info: LogInfo) => {
		return `${info.timestamp} ${info.level}: ${info.message}`;
	}),
);

const transports: winston.transport[] = [
	new winston.transports.Console({
		format: consoleFormat,
		level: isDevelopment ? "debug" : "info",
	}),
];

if (isDevelopment) {
	transports.push(
		new winston.transports.File({
			filename: path.join(logsDir, "error.log"),
			level: "error",
			format: logFormat,
			maxsize: 5242880,
			maxFiles: 5,
		}),
		new winston.transports.File({
			filename: path.join(logsDir, "combined.log"),
			format: logFormat,
			maxsize: 5242880,
			maxFiles: 5,
		}),
	);
}

export const logger = winston.createLogger({
	level: isDevelopment ? "debug" : "info",
	format: logFormat,
	transports,
	exitOnError: false,
});

type HttpRequest = {
	method: string;
	url: string;
	ip?: string;
};

type HttpResponse = {
	statusCode: number;
};

export const httpLogger = (
	req: HttpRequest,
	res: HttpResponse,
	responseTime: number,
): void => {
	const level = res.statusCode >= 400 ? "warn" : "info";
	logger.log(
		level,
		`${req.method} ${req.url} ${res.statusCode} - ${responseTime}ms`,
	);
};
