import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { GetPopularTVShowsResponse } from '@/types/responses/tmdb/get-popular-tv-shows';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getTVShowsPopularRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getTVShowsPopularRequestSchema.safeParse({
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

  const { language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const tvShowsPopularResponse = await tmdbClient.getPopularTVShows({
    language,
    page,
  });

  if (!tvShowsPopularResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_TV_SHOWS_POPULAR,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<GetPopularTVShowsResponse>(tvShowsPopularResponse, HttpStatusCode.Ok);
}
