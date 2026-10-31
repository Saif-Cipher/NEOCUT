"""
Google Drive Authentication Manager for NeoCut Digital.
Supports OAuth 2.0 User Consent Flow and Service Account authentication.
Tokens and client secrets are loaded securely from external config files or environment variables.
"""

import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2 import service_account

# Scopes required to create folders, upload assets, and manage permissions
SCOPES = ['https://www.googleapis.com/auth/drive']

def get_drive_service(credentials_path="credentials.json", token_path="token.json"):
    """
    Returns an authorized Google Drive v3 Resource service.
    First checks for token.json (cached credentials), then credentials.json (OAuth client secret),
    and finally service_account.json if present.
    """
    creds = None
    
    # 1. Check for cached user token
    if os.path.exists(token_path):
        try:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        except Exception as e:
            print(f"[AUTH] Error reading {token_path}: {e}")
            creds = None

    # 2. Check if cached token needs refresh or initiate OAuth flow
    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            with open(token_path, 'w', encoding='utf-8') as token_file:
                token_file.write(creds.to_json())
        except Exception as e:
            print(f"[AUTH] Failed to refresh token: {e}")
            creds = None

    # 3. Check for OAuth client secret (user-interactive flow)
    if not creds and os.path.exists(credentials_path):
        print(f"[AUTH] Found {credentials_path}. Launching OAuth flow...")
        flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
        creds = flow.run_local_server(port=0)
        with open(token_path, 'w', encoding='utf-8') as token_file:
            token_file.write(creds.to_json())
        print(f"[AUTH] New credentials saved to {token_path}")

    # 4. Check for Service Account as alternative
    service_account_path = "service_account.json"
    if not creds and os.path.exists(service_account_path):
        print(f"[AUTH] Found service account file {service_account_path}.")
        creds = service_account.Credentials.from_service_account_file(
            service_account_path, scopes=SCOPES
        )

    if not creds:
        return None

    return build('drive', 'v3', credentials=creds)

def check_auth_status(credentials_path="credentials.json", token_path="token.json"):
    """
    Returns a diagnostic dict describing current authentication readiness.
    """
    has_token = os.path.exists(token_path)
    has_oauth_creds = os.path.exists(credentials_path)
    has_service_account = os.path.exists("service_account.json")
    
    return {
        "authenticated": has_token or has_service_account,
        "has_token_cache": has_token,
        "has_oauth_credentials": has_oauth_creds,
        "has_service_account": has_service_account,
        "status": "ready" if (has_token or has_oauth_creds or has_service_account) else "authorization_required"
    }

if __name__ == "__main__":
    status = check_auth_status()
    print("Drive Auth Status:", status)
