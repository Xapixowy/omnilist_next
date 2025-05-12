import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

type Middleware = (req: NextRequest, res: NextResponse) => NextResponse;

const withCors: Middleware = (req, res): NextResponse => {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const allowedOrigin = env.FRONTEND_URL;

  const isTrusted = (origin && origin === allowedOrigin) || (referer && referer.startsWith(allowedOrigin));

  if (!isTrusted) {
    console.warn(`🚫 Blocked request from origin: ${origin} | referer: ${referer} | allowedOrigin: ${allowedOrigin}`);
    return new NextResponse('Unauthorized request', { status: 403 });
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
