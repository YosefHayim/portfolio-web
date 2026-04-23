import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from 'dotenv';
import { z } from 'zod';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const serverRoot = path.resolve(currentDir, "../../");
const envPath = path.join(serverRoot, ".env");

config({ path: envPath });

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    'Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const env = parsed.data;
