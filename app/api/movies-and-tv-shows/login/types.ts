import { z } from 'zod';

export const postLoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type PostLoginRequest = z.infer<typeof postLoginRequestSchema>;

export type PostLoginResponse = {
  session_id: string;
};
