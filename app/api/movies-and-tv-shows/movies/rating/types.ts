import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesRatingRequestSchema = z.object({
  session_id: z.string(),
  language: z.nativeEnum(Language).optional(),
  page: z.string().optional(),
  sort_by: z.enum(['created_at.asc', 'created_at.desc']).optional(),
});

export type GetMoviesRatingRequest = z.infer<typeof getMoviesRatingRequestSchema>;
