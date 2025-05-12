import { z } from 'zod';

export type PostMoviesRatingPathParams = {
  id: string;
};

export const postMoviesRatingRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
  value: z.number().min(1).max(10).step(0.5),
});

export type PostMoviesRatingRequest = z.infer<typeof postMoviesRatingRequestSchema>;

export type DeleteMoviesRatingPathParams = {
  id: string;
};

export const deleteMoviesRatingRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
});

export type DeleteMoviesRatingRequest = z.infer<typeof deleteMoviesRatingRequestSchema>;
