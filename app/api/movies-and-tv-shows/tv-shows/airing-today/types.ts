import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsAiringTodayRequestSchema = z.object({
  timezone: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetTVShowsAiringTodayRequest = z.infer<typeof getTVShowsAiringTodayRequestSchema>;
