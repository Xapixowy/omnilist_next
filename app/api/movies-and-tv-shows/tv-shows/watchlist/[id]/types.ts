import { z } from 'zod';

export type PostTVShowsWatchlistPathParams = {
  id: string;
};

export const postTVShowsWatchlistRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
});

export type PostTVShowsWatchlistRequest = z.infer<typeof postTVShowsWatchlistRequestSchema>;

export type DeleteTVShowsWatchlistPathParams = {
  id: string;
};

export const deleteTVShowsWatchlistRequestSchema = z.object({
  session_id: z.string(),
  id: z.number().int(),
});
