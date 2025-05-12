import { z } from 'zod';

export type PostMoviesWatchlistPathParams = {
  id: string;
};

export const postMoviesWatchlistRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type PostMoviesWatchlistRequest = z.infer<typeof postMoviesWatchlistRequestSchema>;

export type DeleteMoviesWatchlistPathParams = {
  id: string;
};

export const deleteMoviesWatchlistRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type DeleteMoviesWatchlistRequest = z.infer<typeof deleteMoviesWatchlistRequestSchema>;
