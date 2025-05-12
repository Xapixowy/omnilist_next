import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsPopularRequestSchema = z.object({
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetTVShowsPopularRequest = z.infer<typeof getTVShowsPopularRequestSchema>;
