"""
Utility script to synchronize and update ASSET-INVENTORY.md from drive-asset-manifest.json.
Generates a markdown documentation ledger with live Drive file IDs, preview links, and statuses.
"""

import os
import json

ROOT_DIR = r"D:\Software\NeoCut-Digital"
MANIFEST_PATH = os.path.join(ROOT_DIR, "documentation", "drive-asset-manifest.json")
INVENTORY_PATH = os.path.join(ROOT_DIR, "documentation", "ASSET-INVENTORY.md")
FOLDERS_PATH = os.path.join(ROOT_DIR, "config", "drive-folders.json")

def generate_inventory():
    if not os.path.exists(MANIFEST_PATH):
        print(f"Manifest not found: {MANIFEST_PATH}")
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    folders = {}
    if os.path.exists(FOLDERS_PATH):
        with open(FOLDERS_PATH, "r", encoding="utf-8") as f:
            folders = json.load(f)

    assets = manifest.get("assets", [])
    total_assets = len(assets)
    uploaded_assets = sum(1 for a in assets if a.get("status") == "uploaded")

    category_counts = {}
    for a in assets:
        cat = a.get("category", "unknown")
        category_counts[cat] = category_counts.get(cat, 0) + 1

    lines = [
        "# NeoCut Digital — Master Asset Inventory & Cloud Database Mapping",
        "",
        "> Comprehensive ledger of all local assets, matching filenames, cloud storage destinations, and video preview compatibility.",
        "",
        "## 1. Storage & Integration Status",
        "",
        f"- **Local Asset Repository**: `D:\\Software\\NeoCut-Digital\\public\\assets`",
        f"- **Target Cloud Storage**: Google Drive (`NEOCUT_DIGITAL_ASSETS`)",
        f"- **Root Folder ID**: `{manifest.get('rootFolderId', '1BmM2GJC1-CLsy8zIXaFfwN2nj-I1pJfp')}`",
        f"- **Total Cataloged Assets**: {total_assets}",
        f"- **Synced Assets on Drive**: {uploaded_assets} / {total_assets}",
        f"- **Drive Synchronization Status**: `{manifest.get('authenticationStatus', 'active')}`",
        f"- **Integration Script**: `python server/batch_drive_sync.py`",
        "",
        "## 2. Category Distribution & Folder Mappings",
        "",
        "| Category | Asset Count | Local Source Directory | Google Drive Destination Folder | Drive Folder ID |",
        "|---|---|---|---|---|"
    ]

    folder_map = [
        ("Brand Assets", "brand-assets", "public/assets/logo/", "NEOCUT_DIGITAL_ASSETS/01_BRAND_ASSETS/Logos", folders.get("NEOCUT_DIGITAL_ASSETS/01_BRAND_ASSETS/Logos", "N/A")),
        ("Hero Media", "hero", "public/assets/videos/hero/", "NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Videos", folders.get("NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Videos", "N/A")),
        ("Brand Promotion", "brand-promotion", "public/assets/videos/brand-promotion/", "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Brand_Promotion", folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Brand_Promotion", "N/A")),
        ("Kids Animation", "kids-animation", "public/assets/videos/kids-animation/", "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Kids_Animation", folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Kids_Animation", "N/A")),
        ("Storytelling", "storytelling", "public/assets/videos/storytelling/", "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Storytelling", folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Storytelling", "N/A")),
        ("Cinematography", "cinematography", "public/assets/videos/cinematography/", "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Cinematography", folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Cinematography", "N/A")),
        ("Explanation Videos", "explanation-videos", "public/assets/videos/explanation-videos/", "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Explanation_Videos", folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Explanation_Videos", "N/A"))
    ]

    for title, cat_key, local_src, dest_name, f_id in folder_map:
        count = category_counts.get(cat_key, 0)
        lines.append(f"| **{title}** | {count} | `{local_src}` | `{dest_name}` | `{f_id}` |")

    lines.extend([
        "",
        "## 3. Master Asset Ledger & Drive Mapping",
        "",
        "| # | Matched Asset Name | Category | File Size | Drive File ID | Sync Status | Embed Preview URL |",
        "|---|---|---|---|---|---|---|"
    ])

    for idx, asset in enumerate(assets, 1):
        name = asset.get("name")
        cat = asset.get("category")
        size_bytes = asset.get("fileSize", 0)
        size_mb = f"{size_bytes / (1024 * 1024):.2f} MB"
        file_id = asset.get("driveFileId", "Pending")
        status = "✅ Synced" if asset.get("status") == "uploaded" else "⏳ In Progress"
        preview = f"[Preview](https://drive.google.com/file/d/{file_id}/preview)" if file_id and file_id != "PENDING_AUTH_UPLOAD" and file_id != "Pending" else "N/A"
        
        lines.append(f"| {idx:02d} | `{name}` | **{cat}** | {size_mb} | `{file_id}` | {status} | {preview} |")

    lines.extend([
        "",
        "## 4. Video Preview Compatibility Summary",
        "",
        "- **Preview Mechanism**: Google Drive official iframe player `https://drive.google.com/file/d/{fileId}/preview`.",
        "- **Direct Stream Limitation**: Files over 100MB trigger Google's virus scan HTML prompt on `uc?export=download`. The iframe player completely bypasses this limitation, supporting full 1080p/4K adaptive streaming with zero egress costs.",
        "- **Access Level**: All assets are configured with `role: reader`, `type: anyone` for seamless, login-free website embedding.",
        ""
    ])

    with open(INVENTORY_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Updated {INVENTORY_PATH} ({uploaded_assets}/{total_assets} synced).")

if __name__ == "__main__":
    generate_inventory()
