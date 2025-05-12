import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import {
  DeleteMoviesWatchlistPathParams,
  deleteMoviesWatchlistRequestSchema,
  PostMoviesWatchlistPathParams,
  postMoviesWatchlistRequestSchema,
} from './types';

export async function POST(
  request: Request,
  { params }: { params: Promise<PostMoviesWatchlistPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const parsedBody = postMoviesWatchlistRequestSchema.safeParse({
    id: parseInt(id),
    session_id: searchParams.get('session_id'),
  });

  if (!parsedBody.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedBody.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { session_id, id: media_id } = parsedBody.data;
  const tmdbClient = TmdbClient.getInstance();

  const addWatchlistResponse = await tmdbClient.addToWatchlist({
    sessionId: session_id,
    mediaType: 'movie',
    mediaId: media_id,
    watchlist: true,
  });

  if (!addWatchlistResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_ADD_TO_WATCHLIST,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<DeleteMoviesWatchlistPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const parsedBody = deleteMoviesWatchlistRequestSchema.safeParse({
    id: parseInt(id),
    session_id: searchParams.get('session_id'),
  });

  if (!parsedBody.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedBody.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { session_id, id: media_id } = parsedBody.data;
  const tmdbClient = TmdbClient.getInstance();

  const addWatchlistResponse = await tmdbClient.addToWatchlist({
    sessionId: session_id,
    mediaType: 'movie',
    mediaId: media_id,
    watchlist: false,
  });

  if (!addWatchlistResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_DELETE_FROM_WATCHLIST,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}
