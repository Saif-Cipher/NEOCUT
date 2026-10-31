import { NextResponse } from 'next/server';
import { mediaService } from '@/lib/mediaService';

export const dynamic = 'force-dynamic';

export async function GET() {
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
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: 'degraded',
        error: 'Database connectivity warning',
      },
      { status: 503 }
    );
  }
}
