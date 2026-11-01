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

  // Rate Limiting on health checks to prevent denial-of-service
  const clientIp = extractClientIp(request);
  const rateCheck = checkRateLimit(clientIp);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Rate limit exceeded.' },
      { status: 429, headers: { ...corsHeaders, 'Retry-After': '60' } }
    );
  }

  try {
    const categories = mediaService.getCategories();
    const totalApproved = Object.values(categories).reduce((acc, count) => acc + count, 0);

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'NeoCut Digital Asset Gateway',
        environment: process.env.NODE_ENV || 'production',
        database: {
          status: 'connected',
          provider: 'Google Drive Cloud Asset Database',
          totalApprovedAssets: totalApproved,
          categoryBreakdown: categories,
        },
      },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err) {
    console.error('[API /api/health Error]:', err.message);
    return NextResponse.json(
      {
        status: 'degraded',
        error: 'Database connectivity warning',
      },
      { status: 503, headers: corsHeaders }
    );
  }
}
