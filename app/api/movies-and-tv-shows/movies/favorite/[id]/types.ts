import { z } from 'zod';

export type PostMoviesFavoritePathParams = {
  id: string;
};

export const postMoviesFavoriteRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type PostMoviesFavoriteRequest = z.infer<typeof postMoviesFavoriteRequestSchema>;

export type DeleteMoviesFavoritePathParams = {
  id: string;
};

export const deleteMoviesFavoriteRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type DeleteMoviesFavoriteRequest = z.infer<typeof deleteMoviesFavoriteRequestSchema>;
