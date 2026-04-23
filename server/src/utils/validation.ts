import { z } from "zod";
import { AppError } from "../middleware/errorHandler.js";

export function parseOrThrow<T>(
	schema: z.ZodType<T>,
	input: unknown,
	errorMessage: string,
): T {
	const parseResult = schema.safeParse(input);

	if (!parseResult.success) {
		throw new AppError(errorMessage, 400);
	}

	return parseResult.data;
}
