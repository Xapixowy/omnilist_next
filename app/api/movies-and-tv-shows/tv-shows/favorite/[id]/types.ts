import { z } from 'zod';

export type PostTVShowsFavoritePathParams = {
  id: string;
};

export const postTVShowsFavoriteRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type PostTVShowsFavoriteRequest = z.infer<typeof postTVShowsFavoriteRequestSchema>;

export type DeleteTVShowsFavoritePathParams = {
  id: string;
};

export const deleteTVShowsFavoriteRequestSchema = z.object({
  session_id: z.string(),
  id: z.number(),
});

export type DeleteTVShowsFavoriteRequest = z.infer<typeof deleteTVShowsFavoriteRequestSchema>;
