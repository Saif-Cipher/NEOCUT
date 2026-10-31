"""
NeoCut Digital — Rigorous Secrets & Vulnerability Scanner
Scans the local working tree and full Git commit history for sensitive credentials,
OAuth secrets, API keys, private certificates, and unprotected environment files.
"""

import os
import sys
import re
import subprocess

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# High-confidence secret patterns
SECRET_PATTERNS = [
    (r"GOCSPX-[a-zA-Z0-9_-]{20,}", "Google OAuth Client Secret"),
    (r"AIza[0-9A-Za-z_-]{35}", "Google API Key"),
    (r"-----BEGIN (RSA|OPENSSH|PRIVATE) KEY-----", "Private Cryptographic Key"),
    (r"ghp_[0-9a-zA-Z]{36}", "GitHub Personal Access Token"),
    (r"github_pat_[0-9a-zA-Z_]{82}", "GitHub Fine-Grained PAT"),
    (r"AKIA[0-9A-Z]{16}", "AWS Access Key"),
    (r"(?:secret|token|password|api[_-]?key)\s*[:=]\s*['\"][a-zA-Z0-9_\-.~!@#$%^&*+=]{16,}['\"]", "Hardcoded Secret Assignment"),
]

# Paths to ignore from scanning
IGNORE_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "venv",
    ".pnpm-store",
    "__pycache__"
}

IGNORE_FILES = {
    ".env.example",
    "package-lock.json",
    "secret_scanner.py"
}

def scan_working_tree():
    print("====================================================")
    print("SCANNING LOCAL WORKING TREE FOR SECRETS")
    print("====================================================")
    
    findings = []
    scanned_count = 0

    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if file in IGNORE_FILES:
                continue

            # Check banned secret filenames
            banned_names = [".env", ".env.local", "credentials.json", "token.json", "service-account.json"]
            if file in banned_names or (file.startswith(".env.") and not file.endswith(".example")):
                findings.append((os.path.join(root, file), 0, "BANNED_FILE", f"Forbidden credentials file found on disk: {file}"))
                continue

            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, ROOT_DIR)
            
            # Skip media binaries
            if file.endswith((".mp4", ".webp", ".jpg", ".jpeg", ".png", ".ico", ".woff", ".woff2", ".ttf", ".pyc")):
                continue

            scanned_count += 1
            try:
                with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                    for line_num, line in enumerate(f, 1):
                        for pattern, desc in SECRET_PATTERNS:
                            # Skip documentation comments or safe examples
                            if "SAFE_PLACEHOLDER" in line or "your-google" in line or "placeholder" in line.lower():
                                continue
                            if re.search(pattern, line):
                                findings.append((rel_path, line_num, desc, line.strip()[:60] + "..."))
            except Exception as e:
                pass

    print(f"Scanned {scanned_count} files across working tree.")
    return findings

def scan_git_history():
    print("\n====================================================")
    print("SCANNING GIT COMMIT HISTORY FOR COMMITTED SECRETS")
    print("====================================================")
    
    findings = []
    try:
        proc = subprocess.run(
            ["git", "-C", ROOT_DIR, "log", "-p", "--all"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False
        )
        diff_text = proc.stdout or ""
        
        lines = diff_text.splitlines()
        current_commit = "unknown"
        current_file = "unknown"
        
        for idx, line in enumerate(lines, 1):
            if line.startswith("commit "):
                current_commit = line.split()[1][:8]
            elif line.startswith("+++ b/"):
                current_file = line[6:]
            elif line.startswith("+") and not line.startswith("+++"):
                added_line = line[1:]
                for pattern, desc in SECRET_PATTERNS:
                    if "SAFE_PLACEHOLDER" in added_line or "your-google" in added_line or "placeholder" in added_line.lower():
                        continue
                    if re.search(pattern, added_line):
                        findings.append((f"Commit {current_commit}:{current_file}", idx, desc, added_line.strip()[:60] + "..."))
                        
    except Exception as e:
        print(f"Warning: Could not run git log scan: {e}")

    return findings

def main():
    tree_findings = scan_working_tree()
    history_findings = scan_git_history()
    
    total_findings = tree_findings + history_findings

    print("\n====================================================")
    print("SECRET SCANNER AUDIT REPORT")
    print("====================================================")

    if not total_findings:
        print("[SUCCESS] CLEAN AUDIT: Zero hardcoded secrets, tokens, or private keys detected!")
        print("[SUCCESS] All Git history and active working tree files passed secret inspection.\n")
        sys.exit(0)
    else:
        print(f"[ALERT] Found {len(total_findings)} potential secret exposure(s):\n")
        for loc, line, desc, snippet in total_findings:
            print(f" - [{desc}] at {loc} (line {line}): {snippet}")
        print("\nSTOPPING: Secrets must be revoked and removed before deployment!")
        sys.exit(1)

if __name__ == "__main__":
    main()
