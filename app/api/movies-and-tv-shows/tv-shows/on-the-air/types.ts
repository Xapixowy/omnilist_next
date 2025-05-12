import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsOnTheAirRequestSchema = z.object({
  timezone: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetTVShowsOnTheAirRequest = z.infer<typeof getTVShowsOnTheAirRequestSchema>;
