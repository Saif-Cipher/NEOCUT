# NeoCut Digital — Neo Navy Color Migration Report

**Document Version:** 1.0.0  
**Date:** November 1, 2026  
**Status:** ✅ Fully Deployed & Verified  
**Scope:** Complete Brand Color Migration to Neo Navy with 100% GlassFold WebGL Shader Preservation

---

## Executive Summary

The entire NeoCut Digital website has been migrated from the legacy palette to the refined **Neo Navy** design system. Every visual layer—including tokens, Tailwind configuration, GlassFold WebGL uniforms, 3D Canvas modules, global navigation, page transitions, skeletons, cards, forms, typography, and footers—now strictly adheres to the Neo Navy specification.

### 🛡️ Critical Architectural Invariants Preserved
1. **GlassFold WebGL Shader**:
   - WebGL vertex and fragment shaders preserved **100% intact**.
   - Zero changes to shader mathematics, 6-pane geometry, fold creases, sine wave timing, rotation matrices, or pointer lens calculations.
   - The **only** changes made to GlassFold were its color uniform props:
     - `color1`: `#1D4ED8` (`[0.1137, 0.3059, 0.8471]`)
     - `color2`: `#050B1F` (`[0.0196, 0.0431, 0.1216]`)
     - `color3`: `#7CC8FF` (`[0.4863, 0.7843, 1.0000]`)
   - `speed: 0.3`, `scale: 1.0`, `noise: 0.08` remain identical.
2. **Founder Portrait Integration**:
   - Saif Hossain's authentic portrait (`/assets/profile/saif-founder.png`), aspect ratio framing (`aspect-square`), responsive diameter, and editorial credits remain completely preserved.
3. **Typography**:
   - Display serif (`Migra` / `Playfair Display`) and UI sans-serif (`Inter`) scales and pairings remain untouched.
4. **All 6 Website Routes**:
   - Home (`/`), Services (`/services`), Portfolio (`/portfolio`), About (`/about`), Process (`/process`), and Contact (`/contact`) all remain functional.

---

## Neo Navy Palette Token Mapping

| Token Name | Hex Code | Normalization / RGB | Semantic Role |
|---|---|---|---|
| `Main background` | `#050B1F` | `[0.0196, 0.0431, 0.1216]` | Base canvas, global backdrop |
| `Secondary background` | `#0A1533` | `rgb(10, 21, 51)` | Section grouping, elevated surface base |
| `Deep background` | `#030716` | `rgb(3, 7, 22)` | Global footer, modal backdrops, mobile drawer |
| `GlassFold body` | `#1D4ED8` | `[0.1137, 0.3059, 0.8471]` | GlassFold shader body, primary blue bloom |
| `GlassFold background` | `#050B1F` | `[0.0196, 0.0431, 0.1216]` | GlassFold shader background |
| `GlassFold illuminated edges` | `#7CC8FF` | `[0.4863, 0.7843, 1.0000]` | GlassFold crease rims, fresnel edge highlights |
| `Standard cards` | `#0D1B3E` | `rgb(13, 27, 62)` | Default card surfaces, bento tiles, timeline panels |
| `Elevated cards` | `#122556` | `rgb(18, 37, 86)` | Active accordion items, highlighted cards |
| `Interactive card hover` | `#1A3377` | `rgb(26, 51, 119)` | Card hover states, elevated interaction |
| `Primary button` | `#2563EB` | `rgb(37, 99, 235)` | Primary call-to-action buttons |
| `Primary button hover` | `#1D4ED8` | `rgb(29, 78, 216)` | Primary CTA hover state |
| `Primary text` | `#FFFFFF` | `rgb(255, 255, 255)` | Headings, hero display typography, prominent copy |
| `Secondary text` | `#DCE6FF` | `rgb(220, 230, 255)` | Body copy, descriptions, navigation links |
| `Muted text` | `#A9B8E0` | `rgb(169, 184, 224)` | Metadata, timestamps, captions, field labels |
| `Accent` | `#5CB2FF` | `rgb(92, 178, 255)` | Badges, icons, focus rings, interactive highlights |
| `Borders` | `#26407F` | `rgb(38, 64, 127)` | Standard cards and container borders |
| `Form field borders` | `#5A7DD0` | `rgb(90, 125, 208)` | Input and textarea borders in brief form |
| `Dividers` | `#162A5C` | `rgb(22, 42, 92)` | Thin hairline dividers, section borders |
| `Error text` | `#FF9A8F` | `rgb(255, 154, 143)` | Form validation and error indicators |

---

## Contrast & Accessibility Compliance (WCAG 2.2 AA / AAA)

All color combinations have been tested and verified to meet or exceed WCAG 2.2 Level AA and AAA standards:

| Foreground | Background | Calculated Ratio | WCAG Benchmark | Result |
|---|---|---|---|---|
| Primary Text (`#FFFFFF`) | Canvas (`#050B1F`) | **19.55:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Primary Text (`#FFFFFF`) | Standard Card (`#0D1B3E`) | **16.89:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Primary Text (`#FFFFFF`) | Elevated Card (`#122556`) | **14.74:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Primary Text (`#FFFFFF`) | Card Hover (`#1A3377`) | **11.77:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Primary Text (`#FFFFFF`) | Deep Background (`#030716`) | **20.08:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Primary Text (`#FFFFFF`) | Primary Button (`#2563EB`) | **5.17:1** | $\ge 4.5:1$ (Normal) | **PASS (AA)** |
| Primary Text (`#FFFFFF`) | Button Hover (`#1D4ED8`) | **6.70:1** | $\ge 4.5:1$ (Normal) | **PASS (AA)** |
| Secondary Text (`#DCE6FF`) | Canvas (`#050B1F`) | **15.65:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Secondary Text (`#DCE6FF`) | Standard Card (`#0D1B3E`) | **13.52:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Secondary Text (`#DCE6FF`) | Elevated Card (`#122556`) | **11.80:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Muted Text (`#A9B8E0`) | Canvas (`#050B1F`) | **9.89:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Muted Text (`#A9B8E0`) | Standard Card (`#0D1B3E`) | **8.54:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Accent Text (`#5CB2FF`) | Canvas (`#050B1F`) | **8.63:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Accent Text (`#5CB2FF`) | Standard Card (`#0D1B3E`) | **7.45:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Accent Text (`#5CB2FF`) | Deep Background (`#030716`) | **8.86:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Error Text (`#FF9A8F`) | Canvas (`#050B1F`) | **9.56:1** | $\ge 4.5:1$ (Normal) | **PASS (AAA)** |
| Form Field Border (`#5A7DD0`) | Standard Card (`#0D1B3E`) | **4.25:1** | $\ge 3.0:1$ (Non-Text UI) | **PASS (AA)** |
| Form Field Border (`#5A7DD0`) | Canvas (`#050B1F`) | **4.91:1** | $\ge 3.0:1$ (Non-Text UI) | **PASS (AA)** |
| Focus Indicator (`#5CB2FF`) | Standard Card (`#0D1B3E`) | **7.45:1** | $\ge 3.0:1$ (Focus Indicator) | **PASS (AA)** |

---

## 31 Files Updated Inventory

### Configuration & Design Tokens
1. `styles/tokens.css` — CSS Custom Properties with Neo Navy palette and rgb helpers.
2. `tailwind.config.js` — Extended theme colors for `background`, `surface`, `border`, `navy`, and `brand`.
3. `app/globals.css` — Root variables, custom scrollbar thumb/track, focus-visible outline, and shimmer sweep gradient.
4. `app/manifest.js` — Manifest theme and background colors updated to `#050B1F`.
5. `app/layout.jsx` — HTML body styling, selection highlight, and keyboard bypass skip-to-content link.

### 3D & WebGL Canvas Modules
6. `components/ui/glass-fold.tsx` — Normalized uniforms `u_color1`, `u_color2`, `u_color3`, and CSS fallback gradient.
7. `components/3d/WireframeTorus.jsx` — Three.js basic materials updated to `0x5CB2FF` (outer torus) and `0x1D4ED8` (inner glow).
8. `components/3d/ParticleTypography.jsx` — Three.js point cloud material updated to `0x5CB2FF`.
9. `components/layout/HalftoneWordmark.jsx` — Canvas 2D halftone particles: `BASE_COLOR` `#FFFFFF` and `ACCENT_COLOR` `#5CB2FF`.

### Layout & Page Shells
10. `components/layout/FloatingCapsuleNav.jsx` — Capsule background, link states, indicator dot, primary CTA, and `#030716/95` mobile drawer.
11. `components/layout/Footer.jsx` — Deep background `#030716`, thin divider `#162A5C`, text colors, and back-to-top interaction.
12. `components/motion/TransitionProvider.jsx` — Iris transition backdrop and internal radial glow bloom.

### Skeletons & Media Loaders
13. `components/ui/skeleton.jsx` — Shimmer element background and borders.
14. `components/ui/media-skeleton.jsx` — Container background and offline placeholder icon colors.
15. `components/ui/portfolio-skeleton.jsx` — Portfolio grid shimmer containers and cards.
16. `components/ui/page-skeleton.jsx` — Route skeletons for Services, About, Process, and Contact.

### Hero & Homepage Sections
17. `components/sections/HeroSection.jsx` — Studio badge, headline gradient, animated doodle underline `#5CB2FF`, and primary CTA button `#2563EB`.
18. `components/hero/HeroDecorations.jsx` — Ambient radial glows and SVG orbit gradients.
19. `components/hero/OrbitCard.jsx` — Orbit cards `#0D1B3E`, borders `#26407F`, and hover glow `#1D4ED8`.
20. `components/ui/tilted-grid-hero.jsx` — Stream cards, play button `#1D4ED8`, corner pills, and edge vignette gradients.
21. `components/sections/ServicesSection.jsx` — Bento tiles `#0D1B3E`, hover `#122556`, dividers `#162A5C`, and badges.
22. `components/sections/AboutSection.jsx` — Founder frame, caption block `#030716/95`, pillars, and action buttons.
23. `components/sections/ProcessSection.jsx` — Accordion cards, active stage `#122556`, and number pills.
24. `components/sections/ContactSection.jsx` — WhatsApp and Email cards, headline gradient, and CTA button.
25. `components/effects/GlobalAmbientBackground.jsx` — Kinetic ambient blooms in `#1D4ED8`, `#0D1B3E`, and `#5CB2FF`.

### Route Pages & Error Screens
26. `app/page.jsx` — Video modal backdrop `#030716/90` and modal player frame `#0D1B3E`.
27. `app/services/page.jsx` — 5 service deep-dive cards, scope boxes `#050B1F/90`, and guarantee card.
28. `app/portfolio/page.jsx` — Filter pills, media cards, and video modal player backdrop `#030716/90`.
29. `app/about/page.jsx` — Studio metrics bar, founder card, 4 core pillars, and technical arsenal grid.
30. `app/process/page.jsx` — 6-stage interactive timeline, stage checkpoints, SLA cards, and FAQ accordion.
31. `app/contact/page.jsx` — Interactive brief form, form field borders `#5A7DD0`, WhatsApp brief CTA, and direct email CTA.
32. `app/not-found.jsx` — 404 error card `#0D1B3E`, ambient lighting, and action buttons `#2563EB` & `#122556`.

---

## Verification & Audit Results

1. **Automated Design Token & Leak Audit (`tests/neo_navy_verification.py`):**
   - Result: **100% Passed (0 stale leaks)**
2. **Security & API Guardrail Test Suite (`tests/security.test.mjs`):**
   - Result: **7/7 Passed (0 failed)**
3. **Secret Scanner Audit (`tests/secret_scanner.py`):**
   - Result: **Clean Audit (0 hardcoded credentials)**
4. **Founder Portrait Verification (`tests/founder_portrait_verification.py`):**
   - Result: **20/20 Passed (0 failed)**
5. **Next.js Production Build (`npm run build`):**
   - Result: **Compiled successfully; all 12/12 static pages generated**
