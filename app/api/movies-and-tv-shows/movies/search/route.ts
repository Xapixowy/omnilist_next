import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { getMoviesSearchRequestSchema } from './types';

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const data: Record<string, string | undefined> = {
    query: searchParams.get('query') ?? undefined,
    primary_release_year: searchParams.get('primary_release_year') ?? undefined,
    region: searchParams.get('region') ?? undefined,
    year: searchParams.get('year') ?? undefined,
    include_adult: searchParams.get('include_adult') ?? undefined,
    language: searchParams.get('language') ?? undefined,
    page: searchParams.get('page') ?? undefined,
  };

  const parsedData = getMoviesSearchRequestSchema.safeParse({
    ...data,
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

  const { query, primary_release_year, region, year, include_adult, language, page } = parsedData.data;
  const tmdbClient = TmdbClient.getInstance();

  const moviesSearchResponse = await tmdbClient.searchMovie({
    query,
    primaryReleaseYear: primary_release_year,
    region,
    year,
    includeAdult: include_adult,
    language,
    page,
  });

  if (!moviesSearchResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.CANNOT_GET_MOVIES_SEARCH,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<unknown>(moviesSearchResponse, HttpStatusCode.Ok);
}
