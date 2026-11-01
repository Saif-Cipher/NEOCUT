'use client';

/**
 * NeoCut Digital — Global Ambient Background System (Neo Navy)
 * 
 * Palette:
 * - Base Canvas: #050B1F
 * - Primary Bloom: #1D4ED8
 * - Secondary Bloom: #0D1B3E
 * - Soft Highlight Core: #5CB2FF
 */
export default function GlobalAmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none bg-[#050B1F]"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      {/* Layer 1: Primary Ambient Bloom (#1D4ED8) — 18s duration */}
      <div
        className="kindle-bloom-primary absolute -top-[20%] left-[8%] w-[82vw] h-[80vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(29, 78, 216, 0.50) 0%, rgba(29, 78, 216, 0.22) 42%, transparent 72%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 2: Secondary Drifting Bloom (#0D1B3E) — 22s duration */}
      <div
        className="kindle-bloom-secondary absolute top-[30%] -right-[12%] w-[72vw] h-[75vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(13, 27, 62, 0.45) 0%, rgba(13, 27, 62, 0.18) 48%, transparent 75%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 3: Soft Highlight Core (#5CB2FF) — 14s duration */}
      <div
        className="kindle-bloom-accent absolute bottom-[10%] left-[22%] w-[54vw] h-[55vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(92, 178, 255, 0.20) 0%, rgba(29, 78, 216, 0.12) 40%, transparent 68%)',
          filter: 'blur(95px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 4: Dark Radial Vignette Falloff */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 45%, rgba(5, 11, 31, 0.75) 85%, #050B1F 100%)',
        }}
      />
    </div>
  );
}
