import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { getFavoriteMoviesRequestSchema } from './types';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const parsedParams = getFavoriteMoviesRequestSchema.safeParse(Object.fromEntries(searchParams));

  if (!parsedParams.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedParams.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { account_id, session_id, language, page, sort_by } = parsedParams.data;
  const tmdbClient = TmdbClient.getInstance();

  const favoriteMoviesResponse = await tmdbClient.getFavouriteMovies({
    accountId: parseInt(account_id),
    token: session_id,
    language,
    page: page ? parseInt(page) : undefined,
    sortBy: sort_by,
  });

  if (!favoriteMoviesResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.SOMETHING_WENT_WRONG,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<unknown>(favoriteMoviesResponse, HttpStatusCode.Ok);
}
