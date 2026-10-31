'use client';

/**
 * NeoCut Digital — Global Kindle-Style Ambient Background System
 * 
 * Architecture:
 * - Mounted once in RootLayout (app/layout.jsx) so it persists across all routes.
 * - 5 Calibrated Visual Layers:
 *   1. Base Canvas: #050914 (deep midnight navy foundation)
 *   2. Primary Ambient Bloom: #000080 (18s slow organic breathing motion)
 *   3. Secondary Drifting Bloom: #0047AB (22s electric-blue drifting illumination)
 *   4. Soft Highlight Core: #82C8E5 & #6D8196 (14s subtle cyan highlight with supporting shadow tone)
 *   5. Dark Radial Vignette: Deep edge falloff ensuring all borders fade to midnight navy
 *   6. Subtle Animated Film Grain: 35mm / Kindle Paperwhite tactile micro-texture
 * 
 * Performance & Accessibility:
 * - 100% CSS gradient & transform-gpu driven; zero heavy WebGL overhead.
 * - Fixed position (-z-50), pointer-events: none; zero scroll/click interference.
 * - Zero React re-renders during animation loops.
 * - Respects prefers-reduced-motion media query.
 */

export default function GlobalAmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none bg-[#050914]"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      {/* Layer 1: Primary Ambient Bloom (#000080) — 18s duration */}
      <div
        className="kindle-bloom-primary absolute -top-[20%] left-[8%] w-[82vw] h-[80vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 0, 128, 0.48) 0%, rgba(0, 0, 128, 0.20) 42%, transparent 72%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 2: Secondary Drifting Bloom (#0047AB) — 22s duration */}
      <div
        className="kindle-bloom-secondary absolute top-[30%] -right-[12%] w-[72vw] h-[75vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 71, 171, 0.40) 0%, rgba(0, 71, 171, 0.16) 48%, transparent 75%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 3: Soft Highlight Core (#82C8E5) & Supporting Shadow Tone (#6D8196) — 14s duration */}
      <div
        className="kindle-bloom-highlight absolute top-[16%] left-[28%] w-[48vw] h-[48vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(130, 200, 229, 0.22) 0%, rgba(109, 129, 150, 0.12) 36%, transparent 70%)',
          filter: 'blur(85px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 3b: Lower Supporting Ambient Bloom (#000080 / #0047AB) — 20s duration */}
      <div
        className="kindle-bloom-tertiary absolute -bottom-[15%] left-[12%] w-[78vw] h-[65vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 71, 171, 0.32) 0%, rgba(0, 0, 128, 0.18) 50%, transparent 75%)',
          filter: 'blur(125px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 4: Dark Radial Vignette & Edge Shadow Tone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(5, 9, 20, 0.45) 58%, rgba(5, 9, 20, 0.92) 85%, #050914 100%)',
        }}
      />

      {/* Edge Linear Vignettes to ground header & footer in deep midnight navy */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5, 9, 20, 0.75) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(5, 9, 20, 0.85) 0%, transparent 100%)',
        }}
      />

      {/* Layer 5: Subtle Animated Film Grain (Kindle tactile e-paper texture) */}
      <div
        className="kindle-film-grain absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
