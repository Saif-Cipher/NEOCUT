/**
 * NeoCut Digital — Server-Side Media Security & Asset Resolution Service
 * 
 * Strict Security Guarantees:
 * 1. WHITELIST ENFORCEMENT: Only assets explicitly present in drive-asset-manifest.json
 *    with status 'uploaded' can be retrieved.
 * 2. NO ARBITRARY DRIVE PROBING: Reject all non-conforming or arbitrary Google Drive IDs.
 * 3. METADATA SCRUBBING: Never exposes internal Drive folder IDs, local file system paths,
 *    or server infrastructure details.
 * 4. INPUT VALIDATION: Rejects directory traversal (../), path injection, and malformed characters.
 * 5. LOCAL STATIC ASSET THUMBNAILS: Uses local Next.js public thumbnails (/assets/thumbnails/...)
 *    for instant, 100% reliable image loading with zero CORS or 403 rate limit issues.
 * 6. SPOOF-RESISTANT IP RESOLUTION: Inspects trusted edge proxy headers before falling back to rightmost proxy entry.
 * 7. BOUNDED IN-MEMORY RATE LIMITING: Bounded map with FIFO eviction to prevent memory exhaustion attacks.
 */

import fs from 'fs';
import path from 'path';

const MANIFEST_PATH = path.join(process.cwd(), 'documentation', 'drive-asset-manifest.json');
const ASSET_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// In-memory rate limiting cache with bounded capacity
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 req/min per IP
const MAX_TRACKED_IPS = 2000; // Hard memory cap to prevent resource exhaustion

/**
 * Spoof-resistant client IP extraction
 */
export function extractClientIp(request) {
  if (!request || !request.headers) return '127.0.0.1';

  // 1. Vercel edge trusted header
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  if (vercelIp) return vercelIp.split(',')[0].trim();

  // 2. Real IP set by trusted reverse proxies (e.g., Cloudflare, Nginx)
  const realIp = request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip');
  if (realIp) return realIp.trim();

  // 3. Fallback to rightmost proxy entry (avoids trusting leftmost client-controlled entries)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const list = forwarded.split(',').map(s => s.trim());
    return list[list.length - 1];
  }

  return '127.0.0.1';
}

/**
 * CORS headers validator
 */
const ALLOWED_ORIGINS = new Set([
  'https://neocut.digital',
  'https://www.neocut.digital',
]);

export function getCorsHeaders(request) {
  const origin = request?.headers?.get('origin');
  if (origin && (ALLOWED_ORIGINS.has(origin) || process.env.NODE_ENV !== 'production')) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }
  return {};
}

export function checkRateLimit(clientIp = '127.0.0.1') {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    record.count += 1;
  }

  // Hard bounded map size with FIFO eviction to prevent memory exhaustion
  if (rateLimitMap.size >= MAX_TRACKED_IPS && !rateLimitMap.has(clientIp)) {
    const oldestKey = rateLimitMap.keys().next().value;
    if (oldestKey) rateLimitMap.delete(oldestKey);
  }

  rateLimitMap.set(clientIp, record);

  return {
    allowed: record.count <= MAX_REQUESTS_PER_WINDOW,
    current: record.count,
    limit: MAX_REQUESTS_PER_WINDOW,
    resetTime: record.resetTime,
  };
}

class MediaService {
  constructor() {
    this._cachedManifest = null;
    this._lastLoadTime = 0;
  }

  _loadManifest() {
    const now = Date.now();
    // Cache manifest in memory for 30 seconds
    if (this._cachedManifest && now - this._lastLoadTime < 30000) {
      return this._cachedManifest;
    }

    try {
      if (fs.existsSync(MANIFEST_PATH)) {
        const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
        this._cachedManifest = JSON.parse(raw);
        this._lastLoadTime = now;
        return this._cachedManifest;
      }
    } catch (err) {
      console.error('[MediaService] Manifest read error: Manifest file load failed');
    }

    return { assets: [] };
  }

  /**
   * Resolves the local static thumbnail URL for an asset.
   * Maps to public/assets/thumbnails/{category}/...
   */
  _resolveLocalThumbnail(asset) {
    if (!asset) return null;
    if (asset.thumbnailUrl && asset.thumbnailUrl.startsWith('/assets/')) {
      return asset.thumbnailUrl;
    }

    const cat = asset.category;
    const prefix = (asset.assetId || '').replace('-video', '');
    const publicDir = path.join(process.cwd(), 'public');

    // Priority 1: WebP final thumbnail
    const webpRel = `/assets/thumbnails/${cat}/${prefix}-thumbnail.webp`;
    if (fs.existsSync(path.join(publicDir, 'assets', 'thumbnails', cat, `${prefix}-thumbnail.webp`))) {
      return webpRel;
    }

    // Priority 2: Category reference frame
    const refRel = `/assets/thumbnails/${cat}/references/${prefix}-ref.jpg`;
    if (fs.existsSync(path.join(publicDir, 'assets', 'thumbnails', cat, 'references', `${prefix}-ref.jpg`))) {
      return refRel;
    }

    // Priority 3: Hero reference frame
    if (cat === 'hero' && fs.existsSync(path.join(publicDir, 'assets', 'thumbnails', 'hero', 'references', `${prefix}-ref.jpg`))) {
      return `/assets/thumbnails/hero/references/${prefix}-ref.jpg`;
    }

    // Priority 4: Logo image
    if (asset.type === 'image' && fs.existsSync(path.join(publicDir, 'assets', 'logo', 'neocut-logo.png.jpg'))) {
      return '/assets/logo/neocut-logo.png.jpg';
    }

    return null;
  }

  /**
   * Sanitizes and strips private internal fields from an asset record.
   * Returns only safe, client-facing metadata for public delivery with verified local thumbnails.
   */
  _sanitizeAsset(asset) {
    if (!asset || asset.status !== 'uploaded' || !asset.driveFileId) {
      return null;
    }

    // Official Google Drive iframe player (supports adaptive streaming up to 4K)
    const previewUrl = `https://drive.google.com/file/d/${encodeURIComponent(asset.driveFileId)}/preview`;
    
    // Fast, reliable local static thumbnail path
    const thumbnailUrl = this._resolveLocalThumbnail(asset);

    return {
      assetId: asset.assetId,
      name: asset.name,
      category: asset.category,
      type: asset.type,
      previewUrl,
      thumbnailUrl,
      aspectRatio: asset.aspectRatio || '16:9',
      durationFormatted: asset.durationFormatted || null,
      shortDescription: asset.shortDescription || null,
      embedType: 'iframe',
    };
  }

  /**
   * Retrieves all approved public portfolio media, optionally filtered by category.
   */
  getApprovedMedia(category = null) {
    const manifest = this._loadManifest();
    const assets = manifest.assets || [];

    if (category) {
      if (!category || category.length > 64 || !CATEGORY_PATTERN.test(category)) {
        throw new Error('Invalid category parameter format');
      }
      return assets
        .filter(a => a.category === category && a.status === 'uploaded')
        .map(a => this._sanitizeAsset(a))
        .filter(Boolean);
    }

    return assets
      .filter(a => a.status === 'uploaded')
      .map(a => this._sanitizeAsset(a))
      .filter(Boolean);
  }

  /**
   * Retrieves a single approved asset by unique assetId.
   */
  getAssetById(assetId) {
    if (!assetId || typeof assetId !== 'string' || assetId.length > 64 || !ASSET_ID_PATTERN.test(assetId)) {
      return null;
    }

    const manifest = this._loadManifest();
    const assets = manifest.assets || [];
    const match = assets.find(a => a.assetId === assetId && a.status === 'uploaded');

    return this._sanitizeAsset(match);
  }

  /**
   * Returns summary counts of approved assets per category.
   */
  getCategories() {
    const media = this.getApprovedMedia();
    const categories = {};
    for (const item of media) {
      categories[item.category] = (categories[item.category] || 0) + 1;
    }
    return categories;
  }
}

export const mediaService = new MediaService();
