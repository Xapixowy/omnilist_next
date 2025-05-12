import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesFavoriteRequestSchema = z.object({
  session_id: z.string(),
  language: z.nativeEnum(Language).optional(),
  page: z.string().optional(),
  sort_by: z.enum(['created_at.asc', 'created_at.desc']).optional(),
});

export type GetMoviesFavoriteRequest = z.infer<typeof getMoviesFavoriteRequestSchema>;

export const postMoviesFavoriteRequestSchema = z.object({
  session_id: z.string(),
  media_type: z.enum(['movie', 'tv']),
  media_id: z.number(),
});

export type PostMoviesFavoriteRequest = z.infer<typeof postMoviesFavoriteRequestSchema>;

export const deleteMoviesFavoriteRequestSchema = z.object({
  session_id: z.string(),
  media_type: z.enum(['movie', 'tv']),
  media_id: z.number(),
});

export type DeleteMoviesFavoriteRequest = z.infer<typeof deleteMoviesFavoriteRequestSchema>;
