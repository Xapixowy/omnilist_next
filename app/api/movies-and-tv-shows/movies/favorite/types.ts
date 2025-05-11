import { Language } from '@/enums/language';
import { z } from 'zod';

export const getFavoriteMoviesRequestSchema = z.object({
  account_id: z.string(),
  session_id: z.string(),
  language: z.nativeEnum(Language).optional(),
  page: z.string().optional(),
  sort_by: z.enum(['created_at.asc', 'created_at.desc']).optional(),
});

export type GetFavoriteMoviesRequest = z.infer<typeof getFavoriteMoviesRequestSchema>;
