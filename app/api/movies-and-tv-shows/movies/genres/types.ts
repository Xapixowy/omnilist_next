import { Language } from '@/enums/language';
import { z } from 'zod';

export const getMoviesGenresRequestSchema = z.object({
  language: z.nativeEnum(Language).optional(),
});

export type GetMoviesGenresRequest = z.infer<typeof getMoviesGenresRequestSchema>;
