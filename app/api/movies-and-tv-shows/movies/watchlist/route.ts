import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { getMoviesWatchlistRequestSchema } from './types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsedParams = getMoviesWatchlistRequestSchema.safeParse(Object.fromEntries(searchParams));

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

  const moviesWatchlistResponse = await tmdbClient.getMoviesWatchlist({
    sessionId: session_id,
    language,
    page: page ? parseInt(page) : undefined,
    sortBy: sort_by,
  });

  if (!moviesWatchlistResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_MOVIES_WATCHLIST,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<unknown>(moviesWatchlistResponse, HttpStatusCode.Ok);
}
