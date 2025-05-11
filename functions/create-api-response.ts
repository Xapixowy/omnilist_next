import { BaseResponseError, BaseResponseSuccess, isResponseError } from '@/types/api/base-response';
import { HttpStatusCode } from 'axios';

export const createApiResponse = <T>(data: T, statusCode: HttpStatusCode, options?: ResponseInit): Response => {
  if (isResponseError(data)) {
    const response: BaseResponseError = {
      data: null,
      error: data,
    };

    return new Response(JSON.stringify(response), {
      ...options,
      status: statusCode,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    });
  }

  const response: BaseResponseSuccess<T> = {
    data,
    error: null,
  };

  return new Response(JSON.stringify(response), {
    ...options,
    status: statusCode,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
  });
};
