# NeoCut Digital — Google Drive Asset Database Connection Guide

This document defines the Google Drive integration architecture for **NeoCut Digital**, connecting our localized media library to Google Drive as our cloud media database.

---

## 1. Google Drive Directory Blueprint

All project media files are organized under a single dedicated root folder:

```text
NEOCUT_DIGITAL_ASSETS/
│
├── 01_BRAND_ASSETS/
│   ├── Logos/                      # Master vector & raster logos (neocut-logo.png.jpg)
│   ├── Brand_Graphics/             # Studio banners, brand palettes, and style tokens
│   └── Other_Brand_Assets/         # Watermarks, letterheads, and corporate templates
│
├── 02_HERO_MEDIA/
│   ├── Videos/                     # Primary homepage showcase & showreel videos
│   ├── Thumbnails/                 # High-res 16:9 hero thumbnails
│   └── Preview_Frames/             # Extracted visual reference keyframes
│
├── 03_PORTFOLIO/
│   ├── Brand_Promotion/            # E-commerce, SaaS, and product ads (promotion-1 to 2)
│   ├── Kids_Animation/             # 3D nursery rhymes & educational cartoons (kids-animation-1 to 8)
│   ├── Storytelling/               # Narrative films, documentaries & profiles (storytelling-1 to 3)
│   ├── Cinematography/             # Scenic landscapes & outdoor drone footage (cinematography-1)
│   └── Explanation_Videos/         # 3D medical & scientific viral shorts (explanation-1 to 32)
│
├── 04_WEBSITE_MEDIA/
│   ├── About/                      # Studio culture, workspace & equipment imagery
│   ├── Process/                    # Production pipeline & storyboard graphics
│   └── General/                    # Background textures, UI illustrations & icons
│
└── 05_ASSET_DOCUMENTATION/
    ├── Asset_Inventory/            # Markdown inventories & audit logs
    └── Metadata_Exports/           # JSON manifests (drive-asset-manifest.json)
```

---

## 2. Authentication Architecture

To ensure strict enterprise security, **no API keys, tokens, or credentials are hardcoded into the source code or client-side bundles**.

### Supported Authentication Methods

1. **OAuth 2.0 User Consent Flow (Recommended for Personal/Workspace Drive)**:
   - Client type: *Desktop Application* in Google Cloud Console.
   - Credentials file: `credentials.json` (placed in project root, ignored by git).
   - Token cache: `token.json` (auto-generated on first consent, automatically refreshed).
   - Scope required: `https://www.googleapis.com/auth/drive` (or `drive.file` for application-scoped isolation).

2. **Google Service Account (For Automated CI/CD & Headless Servers)**:
   - Service account key: `service_account.json` (placed in project root, ignored by git).
   - Note: The `NEOCUT_DIGITAL_ASSETS` root folder must be shared with the Service Account email (`xxx@project.iam.gserviceaccount.com`) with *Editor* permissions.

3. **Antigravity Google Drive Plugin (`antigravity-plugins-official/plugin/gdrive`)**:
   - Built-in secure authentication via IDE Plugins Manager.

---

## 3. Video Preview & Embed Compatibility Investigation

A critical requirement is understanding how Google Drive serves video content to web browsers. Google Drive is a storage system, not a dedicated streaming CDN, which introduces specific technical constraints:

### Analysis of Playback Mechanisms:

| Playback Method | Direct `<video>` Element Support | Large File (>100MB) Support | Adaptive Bitrate (DASH/HLS) | Recommendation for NeoCut |
|---|---|---|---|---|
| **Direct Download Link** (`uc?export=download&id=...`) | ❌ Fails on large files | ❌ Fails (triggers Google virus scan interstitial page) | ❌ No | **Do NOT use** for files > 100MB |
| **Google Drive Iframe Player** (`file/d/{id}/preview`) | ✅ Yes (embedded via `<iframe>`) | ✅ Yes (processes files of all sizes up to 5GB) | ✅ Yes (auto-scales 360p to 1080p/4K) | **Recommended Standard** for on-site modal player |
| **Authenticated Streaming API** (`alt=media`) | ⚠️ Requires server proxy | ⚠️ High server bandwidth consumption | ❌ No | Feasible only through backend streaming proxy |

### Permissions & Privacy Rules:
- **Public Portfolio Videos**: Portfolio videos must have the Drive permission:
  `role: 'reader'`, `type: 'anyone'`, `allowFileDiscovery: false`.
  This allows on-site iframe embedding without requiring website visitors to log into Google.
- **Root & Internal Folders**: `NEOCUT_DIGITAL_ASSETS`, `05_ASSET_DOCUMENTATION`, and internal client projects remain **restricted/private** (`type: user`).
- **Zero Frontend Credential Exposure**: Client-side JavaScript never interacts directly with the Google Drive API. All resolution occurs through `server/drive_api.py` or `server/driveService.js`.

---

## 4. Reusable Server Integration Layer

The integration code is divided into clean, decoupled modules in [`server/`](file:///D:/Software/NeoCut-Digital/server):

- [`server/auth.py`](file:///D:/Software/NeoCut-Digital/server/auth.py): Handles OAuth 2.0 token caching, automatic refresh, and Service Account initialization.
- [`server/folder_manager.py`](file:///D:/Software/NeoCut-Digital/server/folder_manager.py): Traverses and provisions the 16-directory folder hierarchy, caching folder IDs in `config/drive-folders.json`.
- [`server/uploader.py`](file:///D:/Software/NeoCut-Digital/server/uploader.py): Implements chunked resumable uploading (10 MB chunks) with local MD5 verification to prevent duplicate re-uploads.
- [`server/drive_api.py`](file:///D:/Software/NeoCut-Digital/server/drive_api.py): Python backend service layer for category queries, ID lookups, and preview resolution.
- [`server/driveService.js`](file:///D:/Software/NeoCut-Digital/server/driveService.js): Node.js service for Next.js / Astro server-rendered components.
- [`server/sync_to_drive.py`](file:///D:/Software/NeoCut-Digital/server/sync_to_drive.py): CLI sync runner that uploads all 47 assets and writes live Drive IDs to the manifest.

---

## 5. How to Run the Sync

When ready to synchronize the 5.3 GB local library to Google Drive:

1. Download your OAuth 2.0 client secret from [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Save the file as `credentials.json` in `D:\Software\NeoCut-Digital\credentials.json`.
3. Run the synchronization command in PowerShell:
   ```powershell
   cd D:\Software\NeoCut-Digital
   python server/sync_to_drive.py
   ```
4. A one-time Google authorization window will open in your default browser. Click **Allow**.
5. The runner will provision the folders, upload all 47 videos with 10MB chunking, apply public reader permissions to videos, and save live Drive IDs into `documentation/drive-asset-manifest.json`.
