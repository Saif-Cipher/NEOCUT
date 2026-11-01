import subprocess
import json
import re
import os
import shutil

# Root Drive folder ID. Reads from NEOCUT_DRIVE_ROOT_ID (or NEOCUT_ROOT_FOLDER_ID)
# so the provisioner is not hard-coded to one environment; falls back to the known
# production root only when the variable is unset.
ROOT_ID = (
    os.environ.get("NEOCUT_DRIVE_ROOT_ID")
    or os.environ.get("NEOCUT_ROOT_FOLDER_ID")
    or "1BmM2GJC1-CLsy8zIXaFfwN2nj-I1pJfp"
)

CONFIG_FILE = os.environ.get(
    "NEOCUT_FOLDERS_FILE",
    r"D:\Software\NeoCut-Digital\config\drive-folders.json",
)

gdrive_cmd = shutil.which("gdrive") or r"C:\Users\DELL\.gemini\antigravity\bin\gdrive.cmd"

structure = {
    "01_BRAND_ASSETS": ["Logos", "Brand_Graphics", "Other_Brand_Assets"],
    "02_HERO_MEDIA": ["Videos", "Thumbnails", "Preview_Frames"],
    "03_PORTFOLIO": ["Brand_Promotion", "Kids_Animation", "Storytelling", "Cinematography", "Explanation_Videos"],
    "04_WEBSITE_MEDIA": ["About", "Process", "General"],
    "05_ASSET_DOCUMENTATION": ["Asset_Inventory", "Metadata_Exports"]
}

def mkdir(name, parent_id):
    cmd = [gdrive_cmd, "mutate", "mkdir", name, "--parent", parent_id]
    res = subprocess.run(cmd, capture_output=True, text=True, shell=False)
    out = res.stdout.strip()
    print(f"mkdir '{name}' under '{parent_id}': {out}")
    m = re.search(r"ID:\s*([a-zA-Z0-9_\-]+)", out)
    if m:
        return m.group(1)
    else:
        raise RuntimeError(f"Failed to create folder {name}: {res.stderr}")

folder_map = {
    "NEOCUT_DIGITAL_ASSETS": ROOT_ID,
    "root": ROOT_ID
}

for top_level, subfolders in structure.items():
    top_id = mkdir(top_level, ROOT_ID)
    folder_map[f"NEOCUT_DIGITAL_ASSETS/{top_level}"] = top_id
    for sub in subfolders:
        sub_id = mkdir(sub, top_id)
        folder_map[f"NEOCUT_DIGITAL_ASSETS/{top_level}/{sub}"] = sub_id

os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
with open(CONFIG_FILE, "w", encoding="utf-8") as f:
    json.dump(folder_map, f, indent=2)

print("\nSuccessfully provisioned all Google Drive folders!")
