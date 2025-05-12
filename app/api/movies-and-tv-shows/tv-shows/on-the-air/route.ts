import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetOnTheAirTVShowsResponse } from '@/types/responses/tmdb/get-on-the-air-tv-shows';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getTVShowsOnTheAirRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    timezone: searchParams.get('timezone') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getTVShowsOnTheAirRequestSchema.safeParse({
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

  const tvShowsOnTheAirResponse = await tmdbClient.getOnTheAirTVShows({
    timezone,
    language,
    page,
  });

  if (!tvShowsOnTheAirResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_TV_SHOWS_ON_THE_AIR,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetOnTheAirTVShowsResponse>(tvShowsOnTheAirResponse, HttpStatusCode.Ok);
}
