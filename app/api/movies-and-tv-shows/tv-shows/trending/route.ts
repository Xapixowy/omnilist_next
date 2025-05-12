import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetPopularTVShowsResponse } from '@/types/responses/tmdb/get-popular-tv-shows';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getTVShowsTrendingRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    time_window: searchParams.get('time_window') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getTVShowsTrendingRequestSchema.safeParse({
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

  const { time_window, language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const tvShowsTrendingResponse = await tmdbClient.getTrendingTVShows({
    timeWindow: time_window,
    language,
    page,
  });

  if (!tvShowsTrendingResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_TV_SHOWS_TRENDING,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetPopularTVShowsResponse>(tvShowsTrendingResponse, HttpStatusCode.Ok);
}
