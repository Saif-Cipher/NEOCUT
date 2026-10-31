"""
NeoCut Digital — Master Google Drive Synchronization Runner.
Provisions NEOCUT_DIGITAL_ASSETS folder structure, uploads all portfolio assets,
sets public read permissions for embeddable previews, and compiles drive-asset-manifest.json.
"""

import os
import json
import datetime
from auth import get_drive_service, check_auth_status
from folder_manager import provision_structure, get_cached_folders
from uploader import upload_asset

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOC_DIR = os.path.join(BASE_DIR, "documentation")
MANIFEST_IN = os.path.join(DOC_DIR, "asset-manifest.json")
DRIVE_MANIFEST_OUT = os.path.join(DOC_DIR, "drive-asset-manifest.json")

# Mapping of asset categories to Drive folder paths in NEOCUT_DIGITAL_ASSETS
CATEGORY_TO_DRIVE_FOLDER = {
    "hero": "NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Videos",
    "brand-promotion": "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Brand_Promotion",
    "kids-animation": "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Kids_Animation",
    "storytelling": "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Storytelling",
    "cinematography": "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Cinematography",
    "explanation-videos": "NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Explanation_Videos"
}

def main():
    print("=" * 60)
    print("NeoCut Digital — Google Drive Asset Synchronization")
    print("=" * 60)

    # 1. Check Authentication Status
    auth_status = check_auth_status()
    print(f"\nAuthentication Check: {auth_status['status']}")

    if auth_status['status'] == 'authorization_required':
        print("\n[ATTENTION] Google Drive credentials not yet detected.")
        print("To authenticate:")
        print("1. Place your Google Cloud OAuth client credentials in: 'credentials.json'")
        print("   (Or place a Service Account key in: 'service_account.json')")
        print("2. Run: python server/sync_to_drive.py")
        print("3. Follow the one-time browser consent prompt.\n")
        return False

    service = get_drive_service()
    if not service:
        print("[ERROR] Could not initialize Google Drive API client.")
        return False

    # 2. Provision Directory Tree
    print("\n[STEP 1] Provisioning NEOCUT_DIGITAL_ASSETS folder structure on Drive...")
    folders = provision_structure(service)
    print(f"Total folders provisioned: {len(folders)}")

    # 3. Load Base Local Asset Manifest
    with open(MANIFEST_IN, "r", encoding="utf-8") as f:
        base_manifest = json.load(f)

    drive_entries = []
    upload_stats = {"success": 0, "duplicates_skipped": 0, "failed": 0}

    # Upload Logo
    logo_path = os.path.join(BASE_DIR, "public", "assets", "logo", "neocut-logo.png.jpg")
    logo_folder_id = folders.get("NEOCUT_DIGITAL_ASSETS/01_BRAND_ASSETS/Logos")
    if os.path.exists(logo_path) and logo_folder_id:
        try:
            res = upload_asset(service, logo_path, logo_folder_id, make_public=True)
            drive_entries.append({
                "assetId": "neocut-logo-master",
                "name": "neocut-logo.png.jpg",
                "category": "brand-assets",
                "type": "image",
                "localPath": "public/assets/logo/neocut-logo.png.jpg",
                "driveFileId": res["file_id"],
                "driveFolderId": logo_folder_id,
                "mimeType": res["mime_type"],
                "fileSize": res["file_size"],
                "thumbnailDriveFileId": None,
                "previewUrl": res["preview_url"],
                "webViewLink": res["web_view_link"],
                "status": "uploaded",
                "uploadedAt": datetime.datetime.utcnow().isoformat() + "Z"
            })
            upload_stats["success"] += 1
        except Exception as e:
            print(f"[ERROR] Failed to upload logo: {e}")
            upload_stats["failed"] += 1

    # Upload Portfolio & Hero Videos
    print("\n[STEP 2] Uploading portfolio and hero video assets...")
    for idx, asset in enumerate(base_manifest["assets"], 1):
        cat = asset["category"]
        video_rel = asset["video_path"]
        video_abs = os.path.join(BASE_DIR, video_rel)
        vname = asset["final_filename"]
        drive_folder_path = CATEGORY_TO_DRIVE_FOLDER.get(cat)
        target_folder_id = folders.get(drive_folder_path)

        if not os.path.exists(video_abs):
            print(f"[SKIP] Video file missing: {video_abs}")
            upload_stats["failed"] += 1
            continue

        if not target_folder_id:
            print(f"[ERROR] Target folder ID missing for {drive_folder_path}")
            upload_stats["failed"] += 1
            continue

        # Upload Video
        try:
            print(f"\nProcessing [{idx}/{len(base_manifest['assets'])}] {vname}...")
            res_v = upload_asset(service, video_abs, target_folder_id, make_public=True)
            if res_v.get("is_duplicate"):
                upload_stats["duplicates_skipped"] += 1
            else:
                upload_stats["success"] += 1

            # Upload Matching Thumbnail if available
            thumb_file_id = None
            thumb_rel = asset.get("thumbnail_path")
            thumb_abs = os.path.join(BASE_DIR, thumb_rel)
            if os.path.exists(thumb_abs):
                thumb_folder_id = folders.get("NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Thumbnails") if cat == "hero" else target_folder_id
                res_t = upload_asset(service, thumb_abs, thumb_folder_id, make_public=True)
                thumb_file_id = res_t["file_id"]

            drive_entries.append({
                "assetId": vname.replace(".mp4", ""),
                "name": vname,
                "category": cat,
                "type": "video",
                "localPath": video_rel,
                "driveFileId": res_v["file_id"],
                "driveFolderId": target_folder_id,
                "mimeType": res_v["mime_type"],
                "fileSize": res_v["file_size"],
                "thumbnailDriveFileId": thumb_file_id,
                "previewUrl": res_v["preview_url"],
                "webViewLink": res_v["web_view_link"],
                "aspectRatio": asset.get("aspect_ratio", "16:9"),
                "duration": asset.get("duration", 0),
                "durationFormatted": asset.get("duration_formatted", ""),
                "status": "uploaded",
                "uploadedAt": datetime.datetime.utcnow().isoformat() + "Z"
            })
        except Exception as e:
            print(f"[ERROR] Failed to process {vname}: {e}")
            upload_stats["failed"] += 1

    # 4. Save Final Drive Asset Manifest
    manifest_data = {
        "project": "NeoCut Digital Asset Library (Google Drive)",
        "version": "1.0.0",
        "rootFolder": "NEOCUT_DIGITAL_ASSETS",
        "rootFolderId": folders.get("root"),
        "totalAssets": len(drive_entries),
        "statistics": upload_stats,
        "assets": drive_entries
    }

    with open(DRIVE_MANIFEST_OUT, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2)

    print(f"\n[STEP 3] Saved {DRIVE_MANIFEST_OUT} successfully.")
    print("=" * 60)
    print(f"Summary: {upload_stats['success']} uploaded, {upload_stats['duplicates_skipped']} duplicates skipped, {upload_stats['failed']} failed.")
    print("=" * 60)
    return True

if __name__ == "__main__":
    main()
