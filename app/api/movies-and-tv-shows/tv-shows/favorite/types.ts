import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsFavoriteRequestSchema = z.object({
  session_id: z.string(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
  sort_by: z.enum(['created_at.asc', 'created_at.desc']).optional(),
});

export type GetTVShowsFavoriteRequest = z.infer<typeof getTVShowsFavoriteRequestSchema>;
