import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getMoviesGenresRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    language: searchParams.get('language') ?? undefined,
  };

  const parsedData = getMoviesGenresRequestSchema.safeParse({
    ...data,
  });

  if (!parsedData.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedData.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { language } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const genresResponse = await tmdbClient.getMovieGenres({
    language,
  });

  if (!genresResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_MOVIES_GENRES,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<unknown>(genresResponse, HttpStatusCode.Ok);
}
