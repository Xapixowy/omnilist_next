import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { tryCatch } from '@/functions/try-catch';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import {
  DeleteMoviesRatingPathParams,
  deleteMoviesRatingRequestSchema,
  PostMoviesRatingPathParams,
  postMoviesRatingRequestSchema,
} from './types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<PostMoviesRatingPathParams> },
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

  const parsedData = postMoviesRatingRequestSchema.safeParse({
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

  const addMovieRatingResponse = await tmdbClient.addMovieRating({
    sessionId: session_id,
    movieId: media_id,
    rating: value,
  });

  if (!addMovieRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_ADD_MOVIE_RATING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<DeleteMoviesRatingPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    session_id: searchParams.get('session_id') ?? undefined,
    id: id ?? undefined,
  };

  const parsedData = deleteMoviesRatingRequestSchema.safeParse({
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

  const deleteMovieRatingResponse = await tmdbClient.deleteMovieRating({
    sessionId: session_id,
    movieId: media_id,
  });

  if (!deleteMovieRatingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_DELETE_MOVIE_RATING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}
