import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesSearchRequestSchema = z.object({
  query: z.string(),
  primary_release_year: z.string().optional(),
  region: z.string().optional(),
  year: z.string().optional(),
  include_adult: z.boolean().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetMoviesSearchRequest = z.infer<typeof getMoviesSearchRequestSchema>;
