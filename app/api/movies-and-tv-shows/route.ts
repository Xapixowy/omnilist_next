import { env } from '@/env';

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: env.TMDB_API_KEY }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
