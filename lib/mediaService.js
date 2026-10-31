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
 */

import fs from 'fs';
import path from 'path';

const MANIFEST_PATH = path.join(process.cwd(), 'documentation', 'drive-asset-manifest.json');
const ASSET_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// In-memory rate limiting cache
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 req/min per IP

export function checkRateLimit(clientIp = 'unknown') {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(clientIp, record);

  // Periodic cleanup
  if (rateLimitMap.size > 5000) {
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }

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
      if (!CATEGORY_PATTERN.test(category)) {
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
    if (!assetId || typeof assetId !== 'string' || !ASSET_ID_PATTERN.test(assetId)) {
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
