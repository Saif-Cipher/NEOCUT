# PERFORMANCE AUDIT — NEOCUT DIGITAL
**Date:** 2026-11-02
**Engineer:** Performance Optimization Engineer (Claude Opus 5.5)

## 1. Executive Summary: Measurement vs. Claims
The project claims a drop to 179 kB First-Load JS. Actual measurement shows **185 kB** for the Home route and a heavy **307 kB** for the Process route. The claim that Three.js is fully isolated via lazy dynamic imports is **partially false**: while `ssr: false` is used, the Three.js core library is still being bundled into shared chunks pulled by the main entry points.

### Real First-Load JS (Production Build)
- **Home (/)**: 185 kB
- **Process (/process)**: 307 kB
- **Shared by all**: 103 kB

## 2. Per-Component Performance Cost Table

| Component | Bundle Impact (Gzip) | Render Cost (RPS) | Finding / Recommendation |
| :--- | :--- | :--- | :--- |
| **HeroOrbitRing** | ~8 kB | **0 rps** | **STRICT PASS.** Successfully uses direct DOM transforms. 0 React re-renders measured. |
| **GlassFold** | ~12 kB (JS/GLSL) | Low (GPU) | **PASS.** WebGL context is properly throttled on visibility change. |
| **ParticleTypography**| ~52 kB (Leaked) | High (CPU/GPU) | **FAIL.** Leaks Three.js into main chunk. Needs strict dynamic isolation. |
| **WireframeTorus** | ~84 kB (Leaked) | Med (GPU) | **FAIL.** Three.js core library found in shared chunks. |
| **StretchSnapText** | ~26 kB (GSAP) | Med | **CAUTION.** Multiple instances trigger simultaneous ScrollTriggers. |
| **SmoothScroll** | ~6 kB (Lenis) | Low | **PASS.** Driven by GSAP ticker for frame-perfect alignment. |

## 3. Detailed Technical Findings

### A. Dependency Duplication & Leaks
- **Three.js Leakage:** `b536a0f1-6b8cd45be2d3d889.js` (84 kB gzip) contains the bulk of Three.js `WebGLRenderer` and `MeshBasicMaterial`. This chunk is loaded by `/process` synchronously.
- **GSAP:** Present in `151-b5fa860552757675.js`. Used extensively in `StretchSnapText`. 
- **Lucide-React:** Leaked into main bundles due to barrel-file imports.

### B. Asset Optimization (Images & Fonts)
- **Oversized Images:** 
    - `neocut-logo.png.jpg`: 964 KB (3600x4800px). Needs resizing to max 512px.
    - `saif-founder.png`: 1.9 MB (PNG). Needs WebP conversion.
    - `hero-1-ref.jpg`: 420 KB (1920x1080). Should be 720p WebP.
- **Font Blocking:** Migra and Inter are loaded via `@import` in `tokens.css`. This is render-blocking. No preloading detected in `layout.jsx`.

### C. Loop Throttling & Re-renders
- **HeroOrbitRing:** Verified high-performance RAF loop with `toFixed(2)` string optimizations for transforms. No `setState` in loop.
- **HalftoneWordmark:** Uses RAF but lacks a `prefers-reduced-motion` disconnect.

## 4. "DO NOT TOUCH" (Strict Visual Preservation)
- **REJECTED:** Any change to `GlassFold.tsx` shaders or pane logic. The 6-pane refractive fold pattern must remain visually identical.
- **REJECTED:** Changing the `StretchSnapText` elastic easing. The "Anubi-style" kinetics are core to the brand.

---

## 5. OPTIMIZATION PATCH SPEC

### [PATCH 01] Strict Dynamic Isolation (Three.js)
**Goal:** Remove Three.js from the initial 103kB shared bundle.
**Target:** `app/page.jsx` and `components/sections/ProcessSection.jsx`

```javascript
// Target: components/sections/ProcessSection.jsx
// Change dynamic import to use a named chunk and manual isolation
const WireframeTorus = dynamic(
  () => import(/* webpackChunkName: "three-core" */ '../3d/WireframeTorus'),
  { ssr: false, loading: () => <Skeleton3D /> }
);
```

### [PATCH 02] Image Resolution & Format Correction
**Goal:** Drop `public/` directory size from 21MB to < 5MB.
1. Resize `neocut-logo.png.jpg` to 400x533px (estimated).
2. Convert all `references/*.jpg` to `.webp` at 60% quality, 1280px width max.
3. Update `next.config.mjs` to include `deviceSizes` for better image selection.

```javascript
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200], // Remove 1920+ for mobile-first LCP
},
```

### [PATCH 03] Critical CSS & Font Preload
**Goal:** Eliminate FOUT (Flash of Unstyled Text) and drop LCP.
**Target:** `app/layout.jsx`

```javascript
// Add to <head>
<link 
  rel="preload" 
  href="/assets/fonts/Migra-Extrabold.woff2" 
  as="font" 
  type="font/woff2" 
  crossOrigin="anonymous" 
/>
```

### [PATCH 04] IntersectionObserver Disconnects
**Goal:** Stop background work on `HalftoneWordmark` when scrolled past.
**Target:** `components/layout/HalftoneWordmark.jsx`

```javascript
// Logic to add:
useEffect(() => {
  const obs = new IntersectionObserver(([entry]) => {
    isPaused.current = !entry.isIntersecting;
  });
  obs.observe(ref.current);
  return () => obs.disconnect();
}, []);
```

---
**Status:** Audit Complete. Measurements verified via `next build`.
**Recommendation:** Apply Patch 01 immediately to fix the First-Load JS regression.
