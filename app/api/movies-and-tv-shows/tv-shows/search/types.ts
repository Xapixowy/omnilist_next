import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsSearchRequestSchema = z.object({
  query: z.string(),
  first_air_date_year: z.number().int().min(1000).max(9999).optional(),
  year: z.number().int().min(1000).max(9999).optional(),
  include_adult: z.boolean().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetTVShowsSearchRequest = z.infer<typeof getTVShowsSearchRequestSchema>;
