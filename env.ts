import { z } from 'zod';

const envSchema = z.object({
  APPWRITE_URL: z.string(),
  APPWRITE_PROJECT_ID: z.string(),
  TMDB_API_KEY: z.string(),
  FRONTEND_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const missingEnvVariables: string = Object.keys(parsedEnv.error.flatten().fieldErrors).join(', ');
  const errorMessage = `Invalid environment variables: ${missingEnvVariables}`;

  throw new Error(errorMessage);
}

export const env = parsedEnv.data;
