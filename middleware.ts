import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorCode } from './enums/error-code';
import { env } from './env';
import { BaseResponseError } from './types/api/base-response';

type Middleware = (req: NextRequest, res: NextResponse) => NextResponse;

const withCors: Middleware = (req, res): NextResponse => {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const allowedOrigin = env.FRONTEND_URL;

  const isTrusted = (origin && origin === allowedOrigin) || (referer && referer.startsWith(allowedOrigin));

  if (!isTrusted) {
    console.warn(`🚫 Blocked request from origin: ${origin} | referer: ${referer} | allowedOrigin: ${allowedOrigin}`);
    return new NextResponse<BaseResponseError>(
      JSON.stringify({
        data: null,
        error: {
          code: ErrorCode.FORBIDDEN_ORIGIN,
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: HttpStatusCode.Forbidden,
      },
    );
  }

  if (origin === allowedOrigin) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    res.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
  }

  return res;
};

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  return withCors(request, response);
}

export const config = {
  matcher: ['/api/:path*'],
};
