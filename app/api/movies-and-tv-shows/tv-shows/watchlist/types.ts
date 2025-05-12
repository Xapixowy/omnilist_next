import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsWatchlistRequestSchema = z.object({
  session_id: z.string(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
  sort_by: z.enum(['created_at.asc', 'created_at.desc']).optional(),
});

export type GetTVShowsWatchlistRequest = z.infer<typeof getTVShowsWatchlistRequestSchema>;
