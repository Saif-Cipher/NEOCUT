"""
Resumable Google Drive Asset Uploader for NeoCut Digital.
Handles chunked uploading for large video files (up to 500MB+),
duplicate detection via MD5 checksum, and selective public preview permissions.
"""

import os
import hashlib
from googleapiclient.http import MediaFileUpload

def get_file_md5(file_path):
    """Computes MD5 hash of local file for verification against Drive md5Checksum."""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096 * 1024), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def check_existing_file(service, folder_id, file_name, local_md5):
    """
    Checks if a file with the same name exists in folder_id.
    If MD5 matches, returns the existing file dict (skips re-upload).
    """
    query = f"name = '{file_name}' and '{folder_id}' in parents and trashed = false"
    results = service.files().list(
        q=query,
        spaces='drive',
        fields='files(id, name, size, md5Checksum, webViewLink, webContentLink, mimeType)'
    ).execute()
    files = results.get('files', [])

    if files:
        existing = files[0]
        if existing.get('md5Checksum') == local_md5:
            print(f"[CACHE] File '{file_name}' already exists on Drive with matching MD5 ({existing['id']}). Skipping upload.")
            return existing
    return None

def set_public_read_permission(service, file_id):
    """
    Grants read permission to 'anyone' with role 'reader'.
    Required so the website can embed video/thumbnail preview without prompting login.
    """
    try:
        permission = {
            'type': 'anyone',
            'role': 'reader',
            'allowFileDiscovery': False
        }
        service.permissions().create(
            fileId=file_id,
            body=permission,
            fields='id'
        ).execute()
        print(f"[PERM] Granted public reader permission to file {file_id}")
        return True
    except Exception as e:
        print(f"[PERM ERROR] Could not set permission on {file_id}: {e}")
        return False

def upload_asset(service, local_path, target_folder_id, make_public=True, custom_name=None):
    """
    Performs a robust, chunked, resumable upload of local_path to target_folder_id on Google Drive.
    """
    if not os.path.exists(local_path):
        raise FileNotFoundError(f"Local file not found: {local_path}")

    file_name = custom_name or os.path.basename(local_path)
    file_size = os.path.getsize(local_path)
    local_md5 = get_file_md5(local_path)

    # 1. Check for duplicate on Drive
    existing = check_existing_file(service, target_folder_id, file_name, local_md5)
    if existing:
        file_id = existing['id']
        preview_url = f"https://drive.google.com/file/d/{file_id}/preview"
        return {
            "file_id": file_id,
            "name": file_name,
            "web_view_link": existing.get('webViewLink'),
            "web_content_link": existing.get('webContentLink'),
            "preview_url": preview_url,
            "mime_type": existing.get('mimeType'),
            "file_size": int(existing.get('size', file_size)),
            "md5": local_md5,
            "is_duplicate": True
        }

    # 2. Determine MIME type
    ext = os.path.splitext(file_name)[1].lower()
    mime_map = {
        ".mp4": "video/mp4",
        ".webp": "image/webp",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".json": "application/json",
        ".md": "text/markdown"
    }
    mime_type = mime_map.get(ext, "application/octet-stream")

    file_metadata = {
        'name': file_name,
        'parents': [target_folder_id]
    }

    # Use 10MB chunks for smooth resumable upload of large video files
    media = MediaFileUpload(
        local_path,
        mimetype=mime_type,
        resumable=True,
        chunksize=10 * 1024 * 1024
    )

    request = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id, name, size, md5Checksum, webViewLink, webContentLink, mimeType'
    )

    print(f"[UPLOADING] '{file_name}' ({round(file_size / (1024*1024), 2)} MB) to folder {target_folder_id}...")

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            percent = int(status.progress() * 100)
            print(f"  Uploading {file_name}: {percent}% complete")

    file_id = response.get('id')
    print(f"[SUCCESS] Uploaded '{file_name}' -> Drive File ID: {file_id}")

    # Set public reader permissions if required for portfolio video/thumbnail
    if make_public:
        set_public_read_permission(service, file_id)

    preview_url = f"https://drive.google.com/file/d/{file_id}/preview"

    return {
        "file_id": file_id,
        "name": file_name,
        "web_view_link": response.get('webViewLink'),
        "web_content_link": response.get('webContentLink'),
        "preview_url": preview_url,
        "mime_type": response.get('mimeType', mime_type),
        "file_size": file_size,
        "md5": local_md5,
        "is_duplicate": False
    }
