import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import {
  DeleteTVShowsWatchlistPathParams,
  deleteTVShowsWatchlistRequestSchema,
  PostTVShowsWatchlistPathParams,
  postTVShowsWatchlistRequestSchema,
} from './types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<PostTVShowsWatchlistPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = postTVShowsWatchlistRequestSchema.safeParse({
    ...data,
    id: data.id ? parseInt(data.id) : undefined,
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

  const { session_id, id: media_id } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const addWatchlistResponse = await tmdbClient.addToWatchlist({
    sessionId: session_id,
    mediaType: 'tv',
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
  request: NextRequest,
  { params }: { params: Promise<DeleteTVShowsWatchlistPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = deleteTVShowsWatchlistRequestSchema.safeParse({
    ...data,
    id: data.id ? parseInt(data.id) : undefined,
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

  const { session_id, id: media_id } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const addWatchlistResponse = await tmdbClient.addToWatchlist({
    sessionId: session_id,
    mediaType: 'tv',
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
