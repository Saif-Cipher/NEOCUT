import { NextResponse } from 'next/server';
import { mediaService, checkRateLimit, extractClientIp, getCorsHeaders } from '@/lib/mediaService';

export const dynamic = 'force-dynamic';

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function GET(request, context) {
  const corsHeaders = getCorsHeaders(request);

  // 1. Rate Limiting (hardened against IP spoofing)
  const clientIp = extractClientIp(request);
  const rateCheck = checkRateLimit(clientIp);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again shortly.' },
      { status: 429, headers: { ...corsHeaders, 'Retry-After': '60' } }
    );
  }

  // 2. Safe Param Extraction & Input Validation
  const params = await context.params;
  const assetId = params?.id;

  // Enforce boundary check & strict assetId naming: lowercase letters, digits, and hyphens only
  const ASSET_ID_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!assetId || typeof assetId !== 'string' || assetId.length > 64 || !ASSET_ID_REGEX.test(assetId)) {
    return NextResponse.json(
      {
        error: 'Bad Request',
        message: 'Invalid asset identifier format. Must match [a-z0-9-]+ with max length 64.',
      },
      { status: 400, headers: corsHeaders }
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
      { status: 404, headers: corsHeaders }
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
        ...corsHeaders,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}
