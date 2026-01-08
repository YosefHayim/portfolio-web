import path from "node:path";
import { fileURLToPath } from "node:url";
import winston from "winston";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV !== "production";

const logsDir = path.join(__dirname, "../../logs");

const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.errors({ stack: true }),
	winston.format.printf((info) => {
		const timestamp = info.timestamp as string;
		const message = info.message as string;
		const stack = info.stack as string | undefined;
		const logMessage = `${timestamp} [${info.level.toUpperCase()}]: ${message}`;
		return stack ? `${logMessage}\n${stack}` : logMessage;
	}),
);

const consoleFormat = winston.format.combine(
	winston.format.colorize({ all: true }),
	winston.format.timestamp({ format: "HH:mm:ss" }),
	winston.format.printf((info) => {
		const timestamp = info.timestamp as string;
		const message = info.message as string;
		return `${timestamp} ${info.level}: ${message}`;
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
