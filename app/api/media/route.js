import { NextResponse } from 'next/server';
import { mediaService, checkRateLimit } from '@/lib/mediaService';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // 1. Client IP & Rate Limiting
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(rateCheck.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateCheck.resetTime),
        },
      }
    );
  }

  // 2. Query Parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const assets = mediaService.getApprovedMedia(category);

    return NextResponse.json(
      {
        success: true,
        count: assets.length,
        category: category || 'all',
        data: assets,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Limit': String(rateCheck.limit),
          'X-RateLimit-Remaining': String(Math.max(0, rateCheck.limit - rateCheck.current)),
        },
      }
    );
  } catch (err) {
    // Return a clean error without revealing file paths or backend stack traces
    return NextResponse.json(
      { error: 'Bad Request', message: err.message || 'Invalid query parameter' },
      { status: 400 }
    );
  }
}
