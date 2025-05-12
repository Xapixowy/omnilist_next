import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { tryCatch } from '@/functions/try-catch';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetFavoriteMoviesResponse } from '@/types/responses/tmdb/get-favorite-movies';
import { HttpStatusCode } from 'axios';
import {
  DeleteMoviesFavoriteRequest,
  deleteMoviesFavoriteRequestSchema,
  getMoviesFavoriteRequestSchema,
  PostMoviesFavoriteRequest,
  postMoviesFavoriteRequestSchema,
} from './types';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const parsedParams = getMoviesFavoriteRequestSchema.safeParse(Object.fromEntries(searchParams));

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

  const favoriteMoviesResponse = await tmdbClient.getFavoriteMovies({
    sessionId: session_id,
    language,
    page: page ? parseInt(page) : undefined,
    sortBy: sort_by,
  });

  if (!favoriteMoviesResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_FAVORITE_MOVIES,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetFavoriteMoviesResponse>(favoriteMoviesResponse, HttpStatusCode.Ok);
}

export async function POST(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const body = await tryCatch<PostMoviesFavoriteRequest>(request.json());

  if (body.error) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_PARSE_REQUEST_BODY,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const parsedBody = postMoviesFavoriteRequestSchema.safeParse({
    ...body.data,
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

  const { session_id, media_type, media_id } = parsedBody.data;
  const tmdbClient = TmdbClient.getInstance();

  const addFavoriteResponse = await tmdbClient.addFavorite({
    sessionId: session_id,
    mediaType: media_type,
    mediaId: media_id,
    favorite: true,
  });

  if (!addFavoriteResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_ADD_FAVORITE_MOVIE,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}

export async function DELETE(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const body = await tryCatch<DeleteMoviesFavoriteRequest>(request.json());

  if (body.error) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_PARSE_REQUEST_BODY,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const parsedBody = deleteMoviesFavoriteRequestSchema.safeParse({
    ...body.data,
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

  const { session_id, media_type, media_id } = parsedBody.data;
  const tmdbClient = TmdbClient.getInstance();

  const addFavoriteResponse = await tmdbClient.addFavorite({
    sessionId: session_id,
    mediaType: media_type,
    mediaId: media_id,
    favorite: false,
  });

  if (!addFavoriteResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_DELETE_FAVORITE_MOVIE,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<null>(null, HttpStatusCode.NoContent);
}
