import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { tryCatch } from '@/functions/try-catch';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import {
  DeleteTVShowsRatingPathParams,
  deleteTVShowsRatingRequestSchema,
  PostTVShowsRatingPathParams,
  postTVShowsRatingRequestSchema,
} from './types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<PostTVShowsRatingPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const body = await tryCatch(request.json());

  if (body.error) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_PARSE_REQUEST_BODY,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
    value: body.data.value ?? undefined,
  };

  const parsedData = postTVShowsRatingRequestSchema.safeParse({
    ...data,
    id: data.id ? parseInt(data.id) : undefined,
    value: data.value ? parseFloat(data.value) : undefined,
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

  const { session_id, id: media_id, value } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const addTVShowRatingResponse = await tmdbClient.addTVShowRating({
    sessionId: session_id,
    tvShowId: media_id,
    rating: value,
  });

  if (!addTVShowRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_ADD_TV_SHOW_RATING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<DeleteTVShowsRatingPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = deleteTVShowsRatingRequestSchema.safeParse({
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

  const deleteTVShowRatingResponse = await tmdbClient.deleteTVShowRating({
    sessionId: session_id,
    tvShowId: media_id,
  });

  if (!deleteTVShowRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_DELETE_TV_SHOW_RATING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}
