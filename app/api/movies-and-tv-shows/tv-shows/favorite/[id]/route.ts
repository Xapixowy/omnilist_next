import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import {
  DeleteTVShowsFavoritePathParams,
  deleteTVShowsFavoriteRequestSchema,
  PostTVShowsFavoritePathParams,
  postTVShowsFavoriteRequestSchema,
} from './types';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<PostTVShowsFavoritePathParams> },
): Promise<Response> => {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = postTVShowsFavoriteRequestSchema.safeParse({
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

  const addFavoriteResponse = await tmdbClient.addFavorite({
    sessionId: session_id,
    mediaType: 'tv',
    mediaId: media_id,
    favorite: true,
  });

  if (!addFavoriteResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_ADD_FAVORITE_TV_SHOW,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<DeleteTVShowsFavoritePathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = deleteTVShowsFavoriteRequestSchema.safeParse({
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

  const addFavoriteResponse = await tmdbClient.addFavorite({
    sessionId: session_id,
    mediaType: 'tv',
    mediaId: media_id,
    favorite: false,
  });

  if (!addFavoriteResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_DELETE_FAVORITE_TV_SHOW,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}
