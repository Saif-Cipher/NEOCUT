"""
Server-Side Asset Service Layer for NeoCut Digital Website.
Provides clean APIs for future website integration:
- Listing portfolio assets by category
- Retrieving single asset by unique ID
- Retrieving video metadata and thumbnail pairing
- Resolving secure preview/embed playback URLs
- Updating the asset manifest
"""

import os
import json

MANIFEST_PATH = os.path.join(os.path.dirname(__file__), "..", "documentation", "drive-asset-manifest.json")

class NeoCutAssetService:
    def __init__(self, manifest_path=None):
        self.manifest_path = manifest_path or MANIFEST_PATH
        self.data = self._load_manifest()

    def _load_manifest(self):
        if os.path.exists(self.manifest_path):
            with open(self.manifest_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"assets": [], "categories": {}}

    def list_categories(self):
        """Returns all available service categories with asset counts."""
        return self.data.get("categories", {})

    def list_assets_by_category(self, category):
        """
        Retrieves all approved portfolio assets belonging to a specific category.
        e.g., 'brand-promotion', 'kids-animation', 'storytelling', 'cinematography', 'explanation-videos'
        """
        assets = [a for a in self.data.get("assets", []) if a.get("category") == category]
        return sorted(assets, key=lambda x: x.get("name", ""))

    def get_asset_by_id(self, asset_id):
        """Retrieves a single asset entry by its unique assetId."""
        for a in self.data.get("assets", []):
            if a.get("assetId") == asset_id:
                return a
        return None

    def get_video_preview_info(self, asset_id):
        """
        Resolves safe preview playback parameters for on-site player embedding.
        Returns iframe preview URL, web view link, MIME type, and aspect ratio.
        """
        asset = self.get_asset_by_id(asset_id)
        if not asset:
            return None

        drive_file_id = asset.get("driveFileId")
        if not drive_file_id or drive_file_id.startswith("GOOGLE_DRIVE_FILE_ID"):
            return {
                "assetId": asset_id,
                "name": asset.get("name"),
                "status": "pending_upload",
                "previewAvailable": False,
                "message": "Asset has not yet been synced to Google Drive"
            }

        # Google Drive standard secure embed player
        preview_embed_url = f"https://drive.google.com/file/d/{drive_file_id}/preview"
        
        return {
            "assetId": asset_id,
            "name": asset.get("name"),
            "category": asset.get("category"),
            "driveFileId": drive_file_id,
            "previewUrl": preview_embed_url,
            "webViewLink": asset.get("webViewLink"),
            "thumbnailUrl": asset.get("thumbnailUrl"),
            "mimeType": asset.get("mimeType", "video/mp4"),
            "aspectRatio": asset.get("aspectRatio", "16:9"),
            "previewAvailable": True,
            "embedType": "iframe"
        }

    def update_asset_entry(self, asset_id, updates):
        """Updates metadata for an asset and saves to drive-asset-manifest.json."""
        for a in self.data.get("assets", []):
            if a.get("assetId") == asset_id:
                a.update(updates)
                with open(self.manifest_path, "w", encoding="utf-8") as f:
                    json.dump(self.data, f, indent=2)
                return True
        return False
