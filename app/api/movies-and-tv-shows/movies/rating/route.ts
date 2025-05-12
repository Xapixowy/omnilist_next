import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetRatedMoviesResponse } from '@/types/responses/tmdb/get-rated-movies';
import { HttpStatusCode } from 'axios';
import { getMoviesRatingRequestSchema } from './types';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const parsedParams = getMoviesRatingRequestSchema.safeParse(Object.fromEntries(searchParams));

  if (!parsedParams.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedParams.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { session_id, language, page, sort_by } = parsedParams.data;
  const tmdbClient = TmdbClient.getInstance();

  const moviesRatingResponse = await tmdbClient.getRatedMovies({
    sessionId: session_id,
    language,
    page: page ? parseInt(page) : undefined,
    sortBy: sort_by,
  });

  if (!moviesRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_MOVIES_RATING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetRatedMoviesResponse>(moviesRatingResponse, HttpStatusCode.Ok);
}
