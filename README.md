# NeoCut Digital — High-Impact Video Production Studio

> Official production repository, web showcase application, and Google Drive cloud media database integration for **NeoCut Digital**.

[![Security & Build Verification CI](https://github.com/Saif-Cipher/NEOCUT/actions/workflows/security-ci.yml/badge.svg)](https://github.com/Saif-Cipher/NEOCUT/actions/workflows/security-ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-blue.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1%20App%20Router-black.svg)](https://nextjs.org/)
[![Google Drive Cloud DB](https://img.shields.io/badge/Google%20Drive-Active%20(48%20Assets)-green.svg)](https://drive.google.com/)
[![License: Private](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 1. Project Overview

**NeoCut Digital** is a digital-first video production agency delivering high-impact visual media across five core service verticals:
1. **Brand Promotion**: Commercial e-commerce showcases and SaaS product launches.
2. **Kids Animation**: 3D cartoon educational musical series and preschool storytelling.
3. **Storytelling**: Narrative films, student leadership profiles, and safety awareness documentaries.
4. **Cinematography**: Scenic drone footage, outdoor exploration, and nature documentaries.
5. **Explanation Videos**: High-precision 3D scientific, anatomical, and viral medical animations.

---

## 2. Cloud Media Database Architecture

To preserve fast repository performance, eliminate multi-gigabyte git clones, and ensure zero-cost egress streaming, all 5.3 GB of video files reside within an enterprise Google Drive asset database:

```text
NEOCUT_DIGITAL_ASSETS/ (ID: 1BmM2GJC1-CLsy8zIXaFfwN2nj-I1pJfp)
│
├── 01_BRAND_ASSETS/
│   ├── Logos/                      # Master vector/raster logos
│   ├── Brand_Graphics/             # Studio banners & color tokens
│   └── Other_Brand_Assets/         # Corporate templates
│
├── 02_HERO_MEDIA/
│   ├── Videos/                     # Primary homepage showcase showreels
│   ├── Thumbnails/                 # 16:9 hero thumbnails
│   └── Preview_Frames/             # Extracted visual keyframes
│
├── 03_PORTFOLIO/
│   ├── Brand_Promotion/            # Commercial promo videos (promotion-1 to 2)
│   ├── Kids_Animation/             # 3D cartoon educational series (kids-1 to 8)
│   ├── Storytelling/               # Narrative films & profiles (storytelling-1 to 3)
│   ├── Cinematography/             # Cinematic documentaries (cinematography-1)
│   └── Explanation_Videos/         # Viral 3D medical shorts (explanation-1 to 32)
│
├── 04_WEBSITE_MEDIA/
│   ├── About/                      # Studio culture & leadership
│   ├── Process/                    # Production pipeline diagrams
│   └── General/                    # Textures, UI illustrations & icons
│
└── 05_ASSET_DOCUMENTATION/
    ├── Asset_Inventory/            # Markdown inventory backups
    └── Metadata_Exports/           # Live machine-readable manifests
```

- **Video Streaming Mechanism**: Videos stream through the Google Drive preview player (`https://drive.google.com/file/d/{fileId}/preview`), bypassing Google's 100 MB download cap and providing adaptive 1080p/4K resolution.
- **Access Control**: Public reader permission (`anyoneWithLink`) is granted strictly to portfolio media; internal folders and documentation remain private.

---

## 3. Server-Mediated Security Architecture

All media requests are mediated through server-side routes to protect infrastructure:
- **Whitelist Enforcement**: The server only serves assets matching the approved `documentation/drive-asset-manifest.json` ledger. Arbitrary Drive file IDs are rejected with `404 Not Found`.
- **Zero Token Exposure**: Google OAuth client secrets, refresh tokens, and internal Drive folder IDs are kept strictly in server memory and never sent to client browsers.
- **Input Sanitization**: All endpoint inputs are strictly validated against `^[a-z0-9-]+$` to block directory traversal and injection attacks.
- **Rate Limiting**: Built-in IP rate limiting (120 req/min) protects public endpoints from automated scraping.

---

## 4. API Endpoints

### `GET /api/media`
Returns sanitized metadata for approved portfolio media.
- **Query Parameter**: `category` (optional, e.g. `brand-promotion`, `kids-animation`).
- **Response**: Sanitized array of assets with `assetId`, `name`, `category`, `previewUrl`, `thumbnailUrl`, and `aspectRatio`.

### `GET /api/media/:id`
Retrieves single approved asset details by unique `assetId`.
- **Validation**: Rejects invalid format with `400` or unknown/unapproved assets with `404`.

### `GET /api/health`
Health check endpoint reporting cloud database connection status and approved asset counts.

---

## 5. Getting Started & Local Development

### Prerequisites
- Node.js 20.x or higher
- Python 3.10+ (for asset sync and security scanning scripts)

### Installation
```bash
# Clone the repository
git clone https://github.com/Saif-Cipher/NEOCUT.git
cd NEOCUT

# Install dependencies
npm install

# Setup environment configuration
cp .env.example .env.local
```

### Running the Development Server
```bash
npm run dev
# Server listening at http://localhost:3000
```

### Security & Whitelist Tests
```bash
# Run API security and whitelist test suite
npm run test:security

# Run automated repository secret scanner
npm run scan:secrets

# Run Next.js production build verification
npm run build
```

---

## 6. Vercel Deployment

See [`documentation/SECURE-DEPLOYMENT.md`](documentation/SECURE-DEPLOYMENT.md) for full deployment instructions, environment variable schemas, and post-launch smoke tests.

See [`documentation/GITHUB-PROTECTION.md`](documentation/GITHUB-PROTECTION.md) for GitHub branch protection and push security guidelines.

---

## 7. License

Proprietary © NeoCut Digital. All rights reserved.
