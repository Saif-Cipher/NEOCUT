/**
 * NeoCut Digital — Node.js / Next.js Server-Side Drive Asset Service
 * Keeps all Drive queries on the backend so no private credentials reach client bundles.
 *
 * ⚠️  DEPRECATED — DO NOT USE.
 * This module is retained only for historical reference. All Drive asset
 * resolution must go through the hardened `lib/mediaService.js`, which enforces
 * manifest whitelisting, input sanitization, and rate limiting. Importing this
 * module throws so it cannot be silently reintroduced as a fallback path.
 */

throw new Error(
  'server/driveService.js is deprecated and must not be imported. ' +
  'Use lib/mediaService.js instead.'
);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MANIFEST_PATH = path.join(__dirname, '..', 'documentation', 'drive-asset-manifest.json');

export class DriveAssetService {
  constructor(manifestPath = MANIFEST_PATH) {
    this.manifestPath = manifestPath;
  }

  loadManifest() {
    if (fs.existsSync(this.manifestPath)) {
      const raw = fs.readFileSync(this.manifestPath, 'utf-8');
      return JSON.parse(raw);
    }
    return { assets: [], categories: {} };
  }

  /**
   * List all portfolio assets for a specific service category.
   * @param {string} category 
   */
  listByCategory(category) {
    const manifest = this.loadManifest();
    return manifest.assets.filter(item => item.category === category);
  }

  /**
   * Retrieve a single asset by unique assetId.
   * @param {string} assetId 
   */
  getById(assetId) {
    const manifest = this.loadManifest();
    return manifest.assets.find(item => item.assetId === assetId) || null;
  }

  /**
   * Resolve secure embed playback details for website video player.
   * Uses Google Drive's iframe preview endpoint to bypass 100MB download caps.
   * @param {string} assetId 
   */
  resolvePreview(assetId) {
    const asset = this.getById(assetId);
    if (!asset) return null;

    if (!asset.driveFileId || asset.driveFileId.startsWith('GOOGLE_DRIVE_FILE_ID')) {
      return {
        assetId,
        name: asset.name,
        previewAvailable: false,
        status: 'pending_upload'
      };
    }

    return {
      assetId: asset.assetId,
      name: asset.name,
      category: asset.category,
      driveFileId: asset.driveFileId,
      previewUrl: `https://drive.google.com/file/d/${asset.driveFileId}/preview`,
      webViewLink: asset.webViewLink,
      thumbnailUrl: asset.thumbnailUrl,
      aspectRatio: asset.aspectRatio || '16:9',
      embedType: 'iframe',
      previewAvailable: true
    };
  }
}

export default DriveAssetService;
