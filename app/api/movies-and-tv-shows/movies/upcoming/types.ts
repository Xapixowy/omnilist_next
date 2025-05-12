import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesUpcomingRequestSchema = z.object({
  region: z.string().optional(),
  language: z.nativeEnum(Language).optional(),
  page: z.number().int().optional(),
});

export type GetMoviesUpcomingRequest = z.infer<typeof getMoviesUpcomingRequestSchema>;
