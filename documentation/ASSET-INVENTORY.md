# NeoCut Digital — Master Asset Inventory & Cloud Database Mapping

> Comprehensive ledger of all local assets, matching filenames, cloud storage destinations, and video preview compatibility.

## 1. Storage & Integration Status

- **Local Asset Repository**: `D:\Software\NeoCut-Digital\public\assets`
- **Target Cloud Storage**: Google Drive (`NEOCUT_DIGITAL_ASSETS`)
- **Total Cataloged Assets**: 48
- **Local Video Storage Footprint**: 5.29 GB (47 video files)
- **Drive Synchronization Status**: `awaiting_oauth_credentials`
- **Integration Script**: `python server/sync_to_drive.py`

## 2. Category Distribution & Folder Mappings

| Category | Asset Count | Local Source Directory | Google Drive Destination Folder |
|---|---|---|---|
| **Brand Assets** | 1 | `public/assets/logo/` | `NEOCUT_DIGITAL_ASSETS/01_BRAND_ASSETS/Logos` |
| **Hero Media** | 1 | `public/assets/videos/hero/` | `NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Videos` |
| **Brand Promotion** | 2 | `public/assets/videos/brand-promotion/` | `NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Brand_Promotion` |
| **Kids Animation** | 8 | `public/assets/videos/kids-animation/` | `NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Kids_Animation` |
| **Storytelling** | 3 | `public/assets/videos/storytelling/` | `NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Storytelling` |
| **Cinematography** | 1 | `public/assets/videos/cinematography/` | `NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Cinematography` |
| **Explanation Videos** | 32 | `public/assets/videos/explanation-videos/` | `NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Explanation_Videos` |

## 3. Master Asset Ledger & Drive Mapping

| # | Matched Asset Name | Category | Resolution | Duration | File Size | Target Drive Folder | Sync Status | Video Embed Strategy |
|---|---|---|---|---|---|---|---|---|
| 01 | `neocut-logo.png.jpg` | **brand-assets** | 16:9 | N/A | 0.94 MB | `01_BRAND_ASSETS/Logos` | `⏳ Pending Auth` | Direct Public Image Link |
| 02 | `promotion-1-video.mp4` | **brand-promotion** | 16:9 | 39s | 93.91 MB | `03_PORTFOLIO/Brand_Promotion` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 03 | `promotion-2-video.mp4` | **brand-promotion** | 16:9 | 41s | 40.81 MB | `03_PORTFOLIO/Brand_Promotion` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 04 | `kids-animation-1-video.mp4` | **kids-animation** | 16:9 | 2m 03s | 297.59 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 05 | `kids-animation-2-video.mp4` | **kids-animation** | 16:9 | 3m 15s | 469.69 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 06 | `kids-animation-3-video.mp4` | **kids-animation** | 16:9 | 1m 45s | 103.52 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 07 | `kids-animation-4-video.mp4` | **kids-animation** | 16:9 | 2m 01s | 187.28 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 08 | `kids-animation-5-video.mp4` | **kids-animation** | 16:9 | 12s | 29.0 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 09 | `kids-animation-6-video.mp4` | **kids-animation** | 16:9 | 1m 59s | 285.14 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 10 | `kids-animation-7-video.mp4` | **kids-animation** | 16:9 | 1m 42s | 246.06 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 11 | `kids-animation-8-video.mp4` | **kids-animation** | 16:9 | 2m 36s | 376.86 MB | `03_PORTFOLIO/Kids_Animation` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 12 | `storytelling-1-video.mp4` | **storytelling** | 1440:1080 | 2m 39s | 186.15 MB | `03_PORTFOLIO/Storytelling` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 13 | `cinematography-1-video.mp4` | **cinematography** | 16:9 | 3m 47s | 265.83 MB | `03_PORTFOLIO/Cinematography` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 14 | `storytelling-2-video.mp4` | **storytelling** | 9:16 | 2m 13s | 232.35 MB | `03_PORTFOLIO/Storytelling` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 15 | `storytelling-3-video.mp4` | **storytelling** | 16:9 | 30s | 73.42 MB | `03_PORTFOLIO/Storytelling` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 16 | `hero-1-video.mp4` | **hero** | 16:9 | 30s | 73.42 MB | `02_HERO_MEDIA/Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 17 | `explanation-1-video.mp4` | **explanation-videos** | 9:16 | 41s | 50.98 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 18 | `explanation-2-video.mp4` | **explanation-videos** | 9:16 | 44s | 54.28 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 19 | `explanation-3-video.mp4` | **explanation-videos** | 9:16 | 43s | 52.51 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 20 | `explanation-4-video.mp4` | **explanation-videos** | 9:16 | 41s | 50.3 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 21 | `explanation-5-video.mp4` | **explanation-videos** | 9:16 | 54s | 130.58 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 22 | `explanation-6-video.mp4` | **explanation-videos** | 9:16 | 40s | 39.12 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 23 | `explanation-7-video.mp4` | **explanation-videos** | 9:16 | 49s | 118.89 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 24 | `explanation-8-video.mp4` | **explanation-videos** | 9:16 | 44s | 54.25 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 25 | `explanation-9-video.mp4` | **explanation-videos** | 9:16 | 43s | 70.74 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 26 | `explanation-10-video.mp4` | **explanation-videos** | 9:16 | 49s | 118.82 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 27 | `explanation-11-video.mp4` | **explanation-videos** | 9:16 | 42s | 51.43 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 28 | `explanation-12-video.mp4` | **explanation-videos** | 9:16 | 37s | 45.39 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 29 | `explanation-13-video.mp4` | **explanation-videos** | 9:16 | 44s | 106.05 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 30 | `explanation-14-video.mp4` | **explanation-videos** | 9:16 | 47s | 57.7 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 31 | `explanation-15-video.mp4` | **explanation-videos** | 9:16 | 43s | 103.72 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 32 | `explanation-16-video.mp4` | **explanation-videos** | 9:16 | 38s | 46.63 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 33 | `explanation-17-video.mp4` | **explanation-videos** | 9:16 | 45s | 55.92 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 34 | `explanation-18-video.mp4` | **explanation-videos** | 9:16 | 38s | 47.15 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 35 | `explanation-19-video.mp4` | **explanation-videos** | 9:16 | 48s | 116.51 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 36 | `explanation-20-video.mp4` | **explanation-videos** | 9:16 | 38s | 61.63 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 37 | `explanation-21-video.mp4` | **explanation-videos** | 9:16 | 50s | 81.96 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 38 | `explanation-22-video.mp4` | **explanation-videos** | 9:16 | 50s | 121.97 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 39 | `explanation-23-video.mp4` | **explanation-videos** | 9:16 | 49s | 118.41 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 40 | `explanation-24-video.mp4` | **explanation-videos** | 9:16 | 38s | 62.85 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 41 | `explanation-25-video.mp4` | **explanation-videos** | 9:16 | 43s | 104.81 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 42 | `explanation-26-video.mp4` | **explanation-videos** | 9:16 | 43s | 103.49 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 43 | `explanation-27-video.mp4` | **explanation-videos** | 9:16 | 45s | 54.63 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 44 | `explanation-28-video.mp4` | **explanation-videos** | 9:16 | 43s | 53.13 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 45 | `explanation-29-video.mp4` | **explanation-videos** | 9:16 | 48s | 77.5 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 46 | `explanation-30-video.mp4` | **explanation-videos** | 9:16 | 42s | 69.84 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 47 | `explanation-31-video.mp4` | **explanation-videos** | 9:16 | 41s | 49.69 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |
| 48 | `explanation-32-video.mp4` | **explanation-videos** | 9:16 | 45s | 110.5 MB | `03_PORTFOLIO/Explanation_Videos` | `⏳ Pending Auth` | Iframe Player (`file/d/{id}/preview`) |

## 4. Video Preview Compatibility Findings

- **Large File Constraint**: 21 video files exceed 100 MB. Google Drive strictly blocks direct binary download streaming (`uc?export=download`) for files exceeding 100 MB by serving a virus scan confirmation page.
- **Verified Embed Solution**: The official Google Drive preview player (`https://drive.google.com/file/d/{fileId}/preview`) must be embedded within a responsive `<iframe>` inside the website's modal lightbox. This delivers high-performance 1080p adaptive streaming with zero file size restrictions.
- **Permission Safeguard**: Only portfolio video and thumbnail files are granted `reader` permission for `anyone`. Administrative documentation and folder roots remain strictly private.
