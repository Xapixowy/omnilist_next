import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetAiringTodayTVShowsResponse } from '@/types/responses/tmdb/get-airing-today-tv-shows';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getTVShowsAiringTodayRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    timezone: searchParams.get('timezone') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getTVShowsAiringTodayRequestSchema.safeParse({
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

  const { timezone, language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const tvShowsAiringTodayResponse = await tmdbClient.getAiringTodayTVShows({
    timezone,
    language,
    page,
  });

  if (!tvShowsAiringTodayResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_TV_SHOWS_AIRING_TODAY,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetAiringTodayTVShowsResponse>(tvShowsAiringTodayResponse, HttpStatusCode.Ok);
}
