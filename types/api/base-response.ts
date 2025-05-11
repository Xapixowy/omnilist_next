import { ErrorCode } from '@/enums/error-code';

export type ResponseError = {
  code: ErrorCode;
  context?: string[];
};

export type BaseResponseError = {
  data: null;
  error: ResponseError;
};

export type BaseResponseSuccess<T> = {
  data: T;
  error: null;
};

export type BaseResponse<T> = BaseResponseSuccess<T> | BaseResponseError;

export const isResponseError = (error: unknown): error is ResponseError => {
  const isError = error instanceof Object && error !== null;

  if (!isError) {
    return false;
  }

  const { code, context } = error as ResponseError;

  const isCodeValid = typeof code === 'string' && Object.values(ErrorCode).includes(code);
  const isContextValid =
    context === undefined || (Array.isArray(context) && context.every((value) => typeof value === 'string'));

  return isCodeValid && isContextValid;
};
