"""
Google Drive Folder Structure Provisioner for NeoCut Digital.
Creates and validates the NEOCUT_DIGITAL_ASSETS folder tree.
Caches folder IDs to config/drive-folders.json for fast lookup without redundant API calls.
"""

import os
import json

DRIVE_STRUCTURE = {
    "name": "NEOCUT_DIGITAL_ASSETS",
    "children": {
        "01_BRAND_ASSETS": {
            "children": {
                "Logos": {},
                "Brand_Graphics": {},
                "Other_Brand_Assets": {}
            }
        },
        "02_HERO_MEDIA": {
            "children": {
                "Videos": {},
                "Thumbnails": {},
                "Preview_Frames": {}
            }
        },
        "03_PORTFOLIO": {
            "children": {
                "Brand_Promotion": {},
                "Kids_Animation": {},
                "Storytelling": {},
                "Cinematography": {},
                "Explanation_Videos": {}
            }
        },
        "04_WEBSITE_MEDIA": {
            "children": {
                "About": {},
                "Process": {},
                "General": {}
            }
        },
        "05_ASSET_DOCUMENTATION": {
            "children": {
                "Asset_Inventory": {},
                "Metadata_Exports": {}
            }
        }
    }
}

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "..", "config", "drive-folders.json")

def find_or_create_folder(service, name, parent_id=None):
    """
    Checks if a folder with the given name exists under parent_id; creates it if not.
    """
    query = f"name = '{name}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false"
    if parent_id:
        query += f" and '{parent_id}' in parents"
    else:
        query += " and 'root' in parents"

    results = service.files().list(
        q=query,
        spaces='drive',
        fields='files(id, name)'
    ).execute()
    files = results.get('files', [])

    if files:
        folder_id = files[0]['id']
        print(f"[DRIVE FOLDER] Found existing folder '{name}' -> {folder_id}")
        return folder_id

    metadata = {
        'name': name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    if parent_id:
        metadata['parents'] = [parent_id]

    folder = service.files().create(body=metadata, fields='id').execute()
    folder_id = folder.get('id')
    print(f"[DRIVE FOLDER] Created new folder '{name}' -> {folder_id}")
    return folder_id

def provision_structure(service):
    """
    Recursively provisions the entire NEOCUT_DIGITAL_ASSETS directory tree on Google Drive.
    Saves folder ID mappings into config/drive-folders.json.
    """
    folder_registry = {}

    root_id = find_or_create_folder(service, DRIVE_STRUCTURE["name"])
    folder_registry["root"] = root_id
    folder_registry[DRIVE_STRUCTURE["name"]] = root_id

    def build_subtree(sub_dict, parent_id, path_prefix):
        for name, data in sub_dict.items():
            curr_path = f"{path_prefix}/{name}"
            f_id = find_or_create_folder(service, name, parent_id)
            folder_registry[curr_path] = f_id
            if "children" in data:
                build_subtree(data["children"], f_id, curr_path)

    build_subtree(DRIVE_STRUCTURE["children"], root_id, DRIVE_STRUCTURE["name"])

    # Persist registry
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(folder_registry, f, indent=2)

    print(f"[DRIVE FOLDER] Complete tree provisioned. Registry saved to {CONFIG_FILE}")
    return folder_registry

def get_cached_folders():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}
