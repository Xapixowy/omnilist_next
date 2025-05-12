import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getMoviesNowPlayingRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    region: searchParams.get('region') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getMoviesNowPlayingRequestSchema.safeParse({
    ...data,
    page: data.page ? parseInt(data.page) : undefined,
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

  const { region, language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const nowPlayingMoviesResponse = await tmdbClient.getNowPlayingMovies({
    region,
    language,
    page,
  });

  if (!nowPlayingMoviesResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_NOW_PLAYING_MOVIES,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<unknown>(nowPlayingMoviesResponse, HttpStatusCode.Ok);
}
