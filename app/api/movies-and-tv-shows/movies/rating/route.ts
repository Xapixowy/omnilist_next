import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetRatedMoviesResponse } from '@/types/responses/tmdb/get-rated-movies';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getMoviesRatingRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
    sort_by: searchParams.get('sort_by') ?? undefined,
  };

  const parsedData = getMoviesRatingRequestSchema.safeParse({
    ...data,
    page: data.page ? parseInt(data.page) : undefined,
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

  const { session_id, language, page, sort_by } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const moviesRatingResponse = await tmdbClient.getRatedMovies({
    sessionId: session_id,
    language,
    page,
    sortBy: sort_by,
  });

  if (!moviesRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_RATED_MOVIES,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetRatedMoviesResponse>(moviesRatingResponse, HttpStatusCode.Ok);
}
