# NeoCut Digital — Security Audit Report

**Audit Date**: 2026-11-02  
**Status**: COMPLETE  
**Target Environment**: Next.js 15 (App Router), Node.js / Python 3.11  

---

## 1. Executive Summary

The security posture of NeoCut Digital is **Strong**. The architecture effectively implements a "Zero-Leakage" model where internal Google Drive IDs and server filesystem paths are scrubbed before reaching the client. Input validation is strictly enforced via regex whitelists, and the previous critical vulnerabilities (VULN-01/02/03) have been successfully mitigated.

### Severity Table

| Severity | Count | Status |
|---|---|---|
| **Critical** | 0 | - |
| **High** | 0 | - |
| **Medium** | 2 | NEW |
| **Low** | 1 | NEW |
| **Informational**| 2 | NEW |

---

## 2. Verification of Prior Vulnerabilities

| ID | Status | Verification Result |
|---|---|---|
| **VULN-01** | **RESOLVED** | `extractClientIp` in `lib/mediaService.js` prioritizes trusted headers (`x-vercel-forwarded-for`) and uses the rightmost entry for `x-forwarded-for`, preventing client-side IP spoofing. |
| **VULN-02** | **RESOLVED** | `next.config.mjs` explicitly defines `frame-ancestors 'self'` in the Content-Security-Policy. |
| **VULN-03** | **RESOLVED** | `lib/mediaService.js` implements a bounded `Map` with `MAX_TRACKED_IPS = 2000` and FIFO eviction, preventing memory exhaustion attacks. |

---

## 3. New Findings & Remediation Patches

### FINDING-01: Unsafe Shell Execution in Python Scripts
- **File**: `D:\Websites\NEOCUT\server\batch_drive_sync.py` (Line 30), `D:\Websites\NEOCUT\server\create_drive_folders.py` (Line 22)
- **Description**: The use of `subprocess.run(..., shell=True)` is risky. While currently only used with hardcoded or checked variables, it should be replaced with list-based execution (`shell=False`) to prevent potential command injection if parameters were to change in the future.
- **Exploit Scenario**: Local privilege escalation or unauthorized command execution if an attacker can manipulate the `GDRIVE_BIN` path or other environment variables.
- **Recommended Fix**: Use list-based arguments and set `shell=False`.

#### Patch (Remediation)
```python
# In server/batch_drive_sync.py
# Change:
# proc = subprocess.run(cmd_list, shell=True, ...)
# To:
proc = subprocess.run(cmd_list, shell=False, capture_output=True, text=True, timeout=timeout, cwd=ROOT_DIR)
```

### FINDING-02: Hardcoded Root Folder ID in Secondary Provisioner
- **File**: `D:\Websites\NEOCUT\server\create_drive_folders.py` (Line 7)
- **Description**: The `ROOT_ID` is hardcoded as `1BmM2GJC1-CLsy8zIXaFfwN2nj-I1pJfp`. While not a secret key, hardcoding environment-specific IDs reduces the flexibility of the security model.
- **Recommended Fix**: Migrate the ID to an environment variable or load it from `drive-folders.json`.

### FINDING-03: Use of Deprecated `driveService.js`
- **File**: `D:\Websites\NEOCUT\server\driveService.js`
- **Description**: This file lacks the rigorous input validation found in `lib/mediaService.js`. It is still in the tree and could be imported by mistake.
- **Recommended Fix**: Remove the file or add an explicit deprecation warning/exception.

---

## 4. Test & Scan Results

### Secret Scanner (`npm run scan:secrets`)
```text
====================================================
SCANNING LOCAL WORKING TREE FOR SECRETS
====================================================
Scanned 128 files across working tree.
[SUCCESS] CLEAN AUDIT: Zero hardcoded secrets, tokens, or private keys detected!
```

### Security Test Suite (`npm run test:security`)
```text
✅ PASS: Whitelist: Approved asset retrieval succeeds
✅ PASS: Security: Unknown / arbitrary asset IDs return null
✅ PASS: Security: Directory traversal injection returns null
✅ PASS: Privacy: Sanitized asset scrubs all internal server metadata
✅ PASS: Category: Whitelisted category returns only matching items
✅ PASS: Security: Malformed category throws validation error
✅ PASS: Rate Limiting: Rate limit tracker functions correctly
```

---

## 5. Remediation Priority

1. **High**: None.
2. **Medium**: Refactor `server/batch_drive_sync.py` to use `shell=False` for subprocess calls.
3. **Low**: Remove `server/driveService.js` to ensure the hardened `lib/mediaService.js` is the single source of truth.
4. **Info**: Update `server/create_drive_folders.py` to use environment variables for folder IDs.

---
**Report compiled by Claude Security Auditor.**
