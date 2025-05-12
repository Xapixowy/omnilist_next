import { z } from 'zod';

export type PostTVShowsRatingPathParams = {
  id: string;
};

export const postTVShowsRatingRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
  value: z.number().min(1).max(10).step(0.5),
});

export type PostTVShowsRatingRequest = z.infer<typeof postTVShowsRatingRequestSchema>;

export type DeleteTVShowsRatingPathParams = {
  id: string;
};

export const deleteTVShowsRatingRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
});

export type DeleteTVShowsRatingRequest = z.infer<typeof deleteTVShowsRatingRequestSchema>;
