import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesPopularRequestSchema = z.object({
  region: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetMoviesPopularRequest = z.infer<typeof getMoviesPopularRequestSchema>;
