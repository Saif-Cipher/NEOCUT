import { NextResponse } from 'next/server';
import { mediaService, checkRateLimit, extractClientIp, getCorsHeaders } from '@/lib/mediaService';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function GET(request) {
  const corsHeaders = getCorsHeaders(request);

  // 1. Client IP & Rate Limiting (hardened against IP spoofing)
  const clientIp = extractClientIp(request);
  const rateCheck = checkRateLimit(clientIp);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again shortly.' },
      {
        status: 429,
        headers: {
          ...corsHeaders,
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
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-RateLimit-Limit': String(rateCheck.limit),
          'X-RateLimit-Remaining': String(Math.max(0, rateCheck.limit - rateCheck.current)),
        },
      }
    );
  } catch (err) {
    // Return a clean error without revealing internal file paths or server stack traces
    console.error('[API /api/media Error]:', err.message);
    return NextResponse.json(
      { error: 'Bad Request', message: 'Invalid query request parameter.' },
      { status: 400, headers: corsHeaders }
    );
  }
}
