import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsTrendingRequestSchema = z.object({
  time_window: z.enum(['day', 'week']),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetTVShowsTrendingRequest = z.infer<typeof getTVShowsTrendingRequestSchema>;
