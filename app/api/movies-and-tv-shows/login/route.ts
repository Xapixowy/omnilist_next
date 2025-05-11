import { ErrorCode } from '@/enums/error-code';
import { createApiResponse } from '@/functions/create-api-response';
import { parseZodValidationErrorsToStringArray } from '@/functions/parse-zod-validation-errors';
import { tryCatch } from '@/functions/try-catch';
import { TmdbClient } from '@/services/api-clients/tmdb-client';
import { ResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';
import { PostLoginRequest, postLoginRequestSchema, PostLoginResponse } from './types';

export async function POST(request: Request): Promise<Response> {
  const body = await tryCatch<PostLoginRequest>(request.json());

  if (body.error) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.SOMETHING_WENT_WRONG,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const parsedBody = postLoginRequestSchema.safeParse(body.data);

  if (!parsedBody.success) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.INVALID_DATA_VALIDATION,
        context: parseZodValidationErrorsToStringArray(parsedBody.error),
      },
      HttpStatusCode.BadRequest,
    );
  }

  const tmdbClient = TmdbClient.getInstance();
  const createRequestTokenResponse = await tmdbClient.createRequestToken();

  if (!createRequestTokenResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.SOMETHING_WENT_WRONG,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const { username, password } = parsedBody.data;

  const createSessionWithLoginResponse = await tmdbClient.createSessionWithLogin({
    username,
    password,
    requestToken: createRequestTokenResponse.request_token,
  });

  if (!createSessionWithLoginResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.SOMETHING_WENT_WRONG,
      },
      HttpStatusCode.BadRequest,
    );
  }

  const createSessionResponse = await tmdbClient.createSession({
    requestToken: createSessionWithLoginResponse.request_token,
  });

  if (!createSessionResponse) {
    return createApiResponse<ResponseError>(
      {
        code: ErrorCode.SOMETHING_WENT_WRONG,
      },
      HttpStatusCode.BadRequest,
    );
  }

  return createApiResponse<PostLoginResponse>(
    {
      session_id: createSessionResponse.session_id,
      user: 'DUPA',
    },
    HttpStatusCode.Ok,
  );
}
