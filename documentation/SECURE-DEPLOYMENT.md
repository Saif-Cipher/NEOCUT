# NeoCut Digital — Secure Vercel Deployment & Environment Checklist

This guide provides the official deployment, security hardening, and environment variable configuration procedures for deploying **NeoCut Digital** to **Vercel**.

---

## 1. Architectural Security Model

NeoCut Digital implements a **zero-leakage server-mediated architecture**:
- **Client Tier**: Web visitors interact exclusively with pre-compiled frontend components and public API routes (`/api/media`).
- **Server Tier**: All Google Drive API communication, manifest loading, and whitelist resolution execute strictly within Next.js Server Components and Node.js Serverless Functions.
- **Data Protection**:
  - Google Drive tokens and OAuth client secrets **never** leave server memory.
  - Zero private credentials appear in browser bundles (no `NEXT_PUBLIC_` secret prefixing).
  - Public endpoints return only sanitized asset metadata (all internal Google Drive folder IDs, local paths, and server timestamps are scrubbed).
  - Video streaming is handled via Google Drive's official secure preview player (`https://drive.google.com/file/d/{id}/preview`), eliminating direct download URL vulnerabilities.

---

## 2. Vercel Environment Variables Configuration

Set these environment variables directly within the **Vercel Project Dashboard** (`Settings` -> `Environment Variables`).

### A. Server-Only Environment Variables (Confidential)
> **CRITICAL**: Never prefix these variables with `NEXT_PUBLIC_`. Keep them scoped to **Production** and **Preview** environments only.

| Variable Name | Required | Description | Example / Value |
|---|---|---|---|
| `GDRIVE_CLIENT_ID` | Optional | Google OAuth 2.0 Web/Desktop Client ID | `your-id.apps.googleusercontent.com` |
| `GDRIVE_CLIENT_SECRET` | Optional | Google OAuth 2.0 Client Secret | `GOCSPX-xxxx...` |
| `GDRIVE_REFRESH_TOKEN` | Optional | Persistent OAuth Refresh Token | `1//04xxxx...` |
| `GDRIVE_ROOT_FOLDER_ID` | **Yes** | Root ID of `NEOCUT_DIGITAL_ASSETS` on Drive | `1BmM2GJC1-CLsy8zIXaFfwN2nj-I1pJfp` |
| `NODE_ENV` | **Yes** | Execution Environment | `production` |

### B. Public Frontend Variables (Safe for Browser Bundles)
> Variables with the `NEXT_PUBLIC_` prefix are embedded into client JavaScript bundles at build time.

| Variable Name | Required | Description | Value |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_NAME` | **Yes** | Studio Brand Name | `NeoCut Digital` |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Production Domain | `https://neocut.digital` |
| `NEXT_PUBLIC_STUDIO_TAGLINE` | No | Studio Tagline | `High-Impact Video Production` |

---

## 3. Pre-Deployment Verification Checklist

Before triggering a production build or promoting a deployment:

- [x] **No Secrets in Source Control**: Verified via `python tests/secret_scanner.py` (0 detected).
- [x] **Zero Vulnerabilities**: Verified via `npm audit` (0 vulnerabilities).
- [x] **Whitelist Enforced**: Only assets with `status: "uploaded"` in `documentation/drive-asset-manifest.json` are served.
- [x] **Rate Limiting Active**: In-memory rate limiting throttles requests to 120 req/min per IP.
- [x] **CSP & Security Headers**: Strict Content-Security-Policy, HSTS, X-Frame-Options configured in `next.config.mjs`.
- [x] **Video Binaries Excluded**: All `.mp4` video files excluded via `.gitignore`.
- [x] **Build Verification**: Production Next.js build passes without compiler or lint errors.

---

## 4. Deploying to Vercel

### Option 1: Vercel Git Integration (Recommended)
1. Navigate to [vercel.com/new](https://vercel.com/new).
2. Import the GitHub repository: `https://github.com/Saif-Cipher/NEOCUT`.
3. Select **Next.js** framework preset.
4. Input the environment variables listed in Section 2 above.
5. Click **Deploy**. Vercel will automatically build and publish the project.

### Option 2: Vercel CLI
```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel account
vercel login

# 3. Deploy preview build
vercel

# 4. Deploy to production
vercel --prod
```

---

## 5. Post-Deployment Smoke Test

Once deployed, verify public endpoint health:

```bash
# 1. Check API Health
curl -s https://your-deployment.vercel.app/api/health | jq .

# 2. Query Approved Media
curl -s https://your-deployment.vercel.app/api/media?category=brand-promotion | jq .

# 3. Verify Arbitrary ID Rejection (Must return 404)
curl -s -o /dev/null -w "%{http_code}\n" https://your-deployment.vercel.app/api/media/malicious-random-id
# Expected output: 404
```
