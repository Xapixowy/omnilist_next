import { Language } from '@/enums/language';
import { z } from 'zod';

export const getTVShowsGenresRequestSchema = z.object({
  language: z.nativeEnum(Language).optional(),
});

export type GetTVShowsGenresRequest = z.infer<typeof getTVShowsGenresRequestSchema>;
