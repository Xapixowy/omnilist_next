import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { SearchTVShowResponse } from '@/types/responses/tmdb/search-tv-show';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getTVShowsSearchRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    query: searchParams.get('query') ?? undefined,
    first_air_date_year: searchParams.get('first_air_date_year') ?? undefined,
    year: searchParams.get('year') ?? undefined,
    include_adult: searchParams.get('include_adult') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getTVShowsSearchRequestSchema.safeParse({
    ...data,
    first_air_date_year: data.first_air_date_year ? parseInt(data.first_air_date_year) : undefined,
    year: data.year ? parseInt(data.year) : undefined,
    include_adult: data.include_adult === 'true',
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

  const { query, first_air_date_year, year, include_adult, language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const tvShowsSearchResponse = await tmdbClient.searchTVShow({
    query,
    firstAirDateYear: first_air_date_year,
    year,
    includeAdult: include_adult,
    language,
    page,
  });

  if (!tvShowsSearchResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_TV_SHOWS_SEARCH,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<SearchTVShowResponse>(tvShowsSearchResponse, HttpStatusCode.Ok);
}
