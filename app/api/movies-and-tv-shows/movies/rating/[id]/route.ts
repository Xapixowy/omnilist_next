import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { tryCatch } from '@/functions/try-catch';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import {
  DeleteMoviesRatingPathParams,
  deleteMoviesRatingRequestSchema,
  PostMoviesRatingPathParams,
  postMoviesRatingRequestSchema,
} from './types';

export async function POST(
  request: Request,
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

  const parsedBody = postMoviesRatingRequestSchema.safeParse({
    id: parseInt(id),
    session_id: searchParams.get('session_id'),
    value: parseFloat(body.data.value),
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

  const { session_id, id: media_id, value } = parsedBody.data;
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
  request: Request,
  { params }: { params: Promise<DeleteMoviesRatingPathParams> },
): Promise<Response> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);

  const parsedBody = deleteMoviesRatingRequestSchema.safeParse({
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
