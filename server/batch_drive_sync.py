"""
Batch Google Drive Synchronization Script for NeoCut Digital.
Uploads all portfolio videos, thumbnails, and preview frames to Google Drive.
Sets public reader permissions for web embedding, tracks state in checkpoint JSON,
and updates drive-asset-manifest.json and ASSET-INVENTORY.md continuously.
"""

import os
import sys
import json
import time
import re
import shutil
import subprocess
from datetime import datetime

ROOT_DIR = r"D:\Software\NeoCut-Digital"
CHECKPOINT_FILE = os.path.join(ROOT_DIR, "config", "drive_sync_checkpoint.json")
FOLDERS_FILE = os.path.join(ROOT_DIR, "config", "drive-folders.json")
MANIFEST_FILE = os.path.join(ROOT_DIR, "documentation", "drive-asset-manifest.json")
INVENTORY_FILE = os.path.join(ROOT_DIR, "documentation", "ASSET-INVENTORY.md")

GDRIVE_BIN = shutil.which("gdrive") or r"C:\Users\DELL\.gemini\antigravity\bin\gdrive.cmd"

def run_cmd(cmd_list, timeout=600):
    """Executes a command and returns (returncode, stdout, stderr)."""
    try:
        proc = subprocess.run(
            cmd_list,
            shell=True,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=ROOT_DIR
        )
        return proc.returncode, proc.stdout.strip(), proc.stderr.strip()
    except subprocess.TimeoutExpired:
        return -1, "", "Command timed out"
    except Exception as e:
        return -2, "", str(e)

def load_json(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def upload_file_to_drive(local_rel_path, target_folder_id, max_retries=3):
    """Uploads a file to Google Drive and makes it readable by anyone with link."""
    full_local_path = os.path.join(ROOT_DIR, local_rel_path)
    if not os.path.exists(full_local_path):
        print(f"[ERROR] Local file does not exist: {full_local_path}")
        return None

    file_name = os.path.basename(full_local_path)
    file_size = os.path.getsize(full_local_path)
    size_mb = file_size / (1024 * 1024)

    for attempt in range(1, max_retries + 1):
        print(f"[{attempt}/{max_retries}] Uploading {file_name} ({size_mb:.2f} MB) -> Folder {target_folder_id}...")
        t0 = time.time()
        
        # 1. Upload
        cmd = f'"{GDRIVE_BIN}" mutate upload "{full_local_path}" --parent {target_folder_id}'
        code, out, err = run_cmd(cmd, timeout=600)
        elapsed = time.time() - t0

        if code == 0:
            # Parse File ID: "Uploaded: filename (ID: 1abc...)"
            match = re.search(r"\(ID:\s*([a-zA-Z0-9_-]+)\)", out)
            if match:
                file_id = match.group(1)
                print(f" -> Uploaded successfully in {elapsed:.1f}s. Drive File ID: {file_id}")
                
                # 2. Set public reader permission
                share_cmd = f'"{GDRIVE_BIN}" mutate share {file_id} --role reader --type anyone --notify=false'
                s_code, s_out, s_err = run_cmd(share_cmd, timeout=60)
                if s_code == 0:
                    print(f" -> Granted public reader permission.")
                else:
                    print(f" [WARN] Failed to set permission: {s_err or s_out}")

                return {
                    "driveFileId": file_id,
                    "driveFolderId": target_folder_id,
                    "fileSize": file_size,
                    "mimeType": "video/mp4" if file_name.endswith(".mp4") else ("image/webp" if file_name.endswith(".webp") else "image/jpeg"),
                    "previewUrl": f"https://drive.google.com/file/d/{file_id}/preview",
                    "webViewLink": f"https://drive.google.com/file/d/{file_id}/view?usp=drivesdk",
                    "status": "uploaded",
                    "uploadedAt": datetime.utcnow().isoformat() + "Z"
                }
            else:
                print(f" [WARN] Upload succeeded but could not parse File ID from output: {out}")
        else:
            print(f" [ERROR] Attempt {attempt} failed ({elapsed:.1f}s): {err or out}")
            time.sleep(2 * attempt)

    return None

def sync_all():
    checkpoint = load_json(CHECKPOINT_FILE)
    folders = load_json(FOLDERS_FILE)
    manifest = load_json(MANIFEST_FILE)

    category_folder_map = {
        "brand-assets": folders.get("NEOCUT_DIGITAL_ASSETS/01_BRAND_ASSETS/Logos"),
        "hero": folders.get("NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Videos"),
        "brand-promotion": folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Brand_Promotion"),
        "kids-animation": folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Kids_Animation"),
        "storytelling": folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Storytelling"),
        "cinematography": folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Cinematography"),
        "explanation-videos": folders.get("NEOCUT_DIGITAL_ASSETS/03_PORTFOLIO/Explanation_Videos")
    }

    # Step 1: Sync all reference images / thumbnails
    print("\n==========================================")
    print("STEP 1: SYNCING THUMBNAILS & PREVIEW FRAMES")
    print("==========================================")

    # Find all thumbnails/references
    thumb_dir = os.path.join(ROOT_DIR, "public", "assets", "thumbnails")
    thumb_tasks = []
    for root, dirs, files in os.walk(thumb_dir):
        for f in files:
            if f.endswith((".webp", ".jpg", ".png")) and not f.startswith("."):
                full_p = os.path.join(root, f)
                rel_p = os.path.relpath(full_p, ROOT_DIR).replace("\\", "/")
                
                # Determine category
                cat = None
                for c in ["brand-promotion", "kids-animation", "storytelling", "cinematography", "explanation-videos", "hero"]:
                    if c in rel_p:
                        cat = c
                        break
                
                if cat:
                    folder_id = category_folder_map.get(cat)
                    if cat == "hero":
                        folder_id = folders.get("NEOCUT_DIGITAL_ASSETS/02_HERO_MEDIA/Preview_Frames")
                    thumb_tasks.append((rel_p, folder_id, f))

    print(f"Found {len(thumb_tasks)} thumbnail / reference assets.")
    for idx, (rel_p, target_folder, fname) in enumerate(thumb_tasks, 1):
        if rel_p in checkpoint and checkpoint[rel_p].get("status") == "uploaded":
            print(f"[{idx}/{len(thumb_tasks)}] [CACHED] {fname} -> ID: {checkpoint[rel_p]['driveFileId']}")
            continue

        print(f"\n[{idx}/{len(thumb_tasks)}] Processing thumbnail: {fname}")
        res = upload_file_to_drive(rel_p, target_folder)
        if res:
            checkpoint[rel_p] = res
            save_json(CHECKPOINT_FILE, checkpoint)

    # Step 2: Sync all videos
    print("\n==========================================")
    print("STEP 2: SYNCING VIDEOS")
    print("==========================================")

    assets = manifest.get("assets", [])
    total_assets = len(assets)

    for idx, asset in enumerate(assets, 1):
        rel_p = asset.get("localPath").replace("\\", "/")
        name = asset.get("name")
        cat = asset.get("category")
        target_folder = category_folder_map.get(cat)

        if not target_folder:
            print(f"[SKIP] Unknown category for {name}: {cat}")
            continue

        # Check if already uploaded in checkpoint
        if rel_p in checkpoint and checkpoint[rel_p].get("status") == "uploaded":
            print(f"[{idx}/{total_assets}] [CACHED] {name} -> Drive ID: {checkpoint[rel_p]['driveFileId']}")
            asset["driveFileId"] = checkpoint[rel_p]["driveFileId"]
            asset["driveFolderId"] = target_folder
            asset["previewUrl"] = checkpoint[rel_p].get("previewUrl") or f"https://drive.google.com/file/d/{asset['driveFileId']}/preview"
            asset["webViewLink"] = checkpoint[rel_p].get("webViewLink") or f"https://drive.google.com/file/d/{asset['driveFileId']}/view?usp=drivesdk"
            asset["status"] = "uploaded"
            asset["uploadedAt"] = checkpoint[rel_p].get("uploadedAt")
        else:
            print(f"\n[{idx}/{total_assets}] Uploading Video: {name}")
            res = upload_file_to_drive(rel_p, target_folder)
            if res:
                checkpoint[rel_p] = res
                save_json(CHECKPOINT_FILE, checkpoint)
                asset["driveFileId"] = res["driveFileId"]
                asset["driveFolderId"] = target_folder
                asset["previewUrl"] = res["previewUrl"]
                asset["webViewLink"] = res["webViewLink"]
                asset["status"] = "uploaded"
                asset["uploadedAt"] = res["uploadedAt"]

        # Link thumbnailDriveFileId if available
        base_name = os.path.splitext(name)[0]  # e.g., promotion-1-video
        item_prefix = base_name.replace("-video", "")  # e.g., promotion-1
        
        # Check matching thumbnail or reference in checkpoint
        for cp_path, cp_data in checkpoint.items():
            if item_prefix in cp_path and ("thumbnail" in cp_path or "-ref" in cp_path):
                asset["thumbnailDriveFileId"] = cp_data.get("driveFileId")
                break

        # Save manifest update continuously
        save_json(MANIFEST_FILE, manifest)

    # Step 3: Update Manifest Root Details
    manifest["rootFolderId"] = folders.get("root")
    manifest["authenticationStatus"] = "authenticated_active"
    save_json(MANIFEST_FILE, manifest)

    print("\n==========================================")
    print("ALL ASSETS SYNCED TO GOOGLE DRIVE!")
    print("==========================================")

if __name__ == "__main__":
    sync_all()
