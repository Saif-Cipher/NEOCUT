# NeoCut Digital — GitHub Security & Repository Protection Guide

This document defines the recommended security rules and access governance policies for the **[Saif-Cipher/NEOCUT](https://github.com/Saif-Cipher/NEOCUT)** repository.

---

## 1. Branch Protection Rules (`main`)

To prevent accidental destructive overrides or untracked direct commits to production:

1. Navigate to: `GitHub Repository -> Settings -> Branches -> Add branch protection rule`.
2. Apply rule to branch pattern: `main`.
3. Enable the following settings:
   - **Require a pull request before merging**:
     - Require at least **1 approving review**.
     - Dismiss stale pull request approvals when new commits are pushed.
   - **Require status checks to pass before merging**:
     - Require the `Security & Build Verification` GitHub Action workflow to pass.
   - **Do not allow bypassing the above settings**: Ensures repository administrators also adhere to the PR review and testing flow.
   - **Require linear history**: Prevents complex merge bubble commits.
   - **Include administrators**: Enforces rules consistently.

---

## 2. GitHub Secret Scanning & Push Protection

GitHub provides automated native secret scanning that detects exposed tokens before they reach git history:

1. Navigate to: `Settings -> Code security and analysis`.
2. Enable:
   - **Secret scanning**: Scans commit history and PRs for API keys, tokens, and credentials.
   - **Push protection**: Blocks git pushes at the terminal if a credential pattern is detected.

---

## 3. GitHub Actions Secrets Management

Never store sensitive deployment credentials in code or plaintext workflow files.

Configure repository secrets under `Settings -> Secrets and variables -> Actions`:

| Secret Name | Purpose | Example Scope |
|---|---|---|
| `VERCEL_TOKEN` | Automated deployment via Vercel CLI | Read/Write deployments only |
| `VERCEL_ORG_ID` | Vercel team/account ID | Organization identifier |
| `VERCEL_PROJECT_ID` | Vercel project ID | Project identifier |
| `GDRIVE_REFRESH_TOKEN` | Cloud synchronization tests | Read-only Drive scope |

---

## 4. Minimum-Permission Token Policy

- Use **Fine-Grained Personal Access Tokens (PATs)** rather than classic tokens.
- Grant **Repository permissions** strictly scoped to `Saif-Cipher/NEOCUT`.
- Set token expiration to 30–90 days max with automatic calendar rotation.
- Only grant `Contents: Read/Write` and `Pull requests: Read/Write`. Never grant administrative or organization-wide permissions unless specifically required.
