import { NextResponse } from 'next/server';
import { mediaService, checkRateLimit } from '@/lib/mediaService';

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  // 1. Rate Limiting
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // 2. Safe Param Extraction & Input Validation
  const params = await context.params;
  const assetId = params?.id;

  // Enforce strict assetId naming: lowercase letters, digits, and hyphens only
  const ASSET_ID_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!assetId || !ASSET_ID_REGEX.test(assetId)) {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message: 'Invalid asset identifier format. Must match [a-z0-9-]+.',
      },
      { status: 400 }
    );
  }

  // 3. Whitelist Lookup via Server-Side Media Service
  // Rejects arbitrary Google Drive file IDs or unapproved assets
  const asset = mediaService.getAssetById(assetId);

  if (!asset) {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: `Asset '${assetId}' not found or is not approved for public viewing.`,
      },
      { status: 404 }
    );
  }

  // 4. Return Sanitized Client Payload (No internal server paths or folder IDs)
  return NextResponse.json(
    {
      success: true,
      data: asset,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
