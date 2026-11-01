'use client';

/**
 * NeoCut Digital — Global Ambient Background System (Midnight Teal)
 * 
 * Palette:
 * - Base Canvas: #071F22
 * - Primary Bloom: #195052
 * - Secondary Bloom: #103638
 * - Soft Highlight Core: #65C6B5
 */
export default function GlobalAmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none bg-[#071F22]"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      {/* Layer 1: Primary Ambient Bloom (#195052) — 18s duration */}
      <div
        className="kindle-bloom-primary absolute -top-[20%] left-[8%] w-[82vw] h-[80vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(25, 80, 82, 0.50) 0%, rgba(25, 80, 82, 0.22) 42%, transparent 72%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 2: Secondary Drifting Bloom (#103638) — 22s duration */}
      <div
        className="kindle-bloom-secondary absolute top-[30%] -right-[12%] w-[72vw] h-[75vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 54, 56, 0.45) 0%, rgba(16, 54, 56, 0.18) 48%, transparent 75%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 3: Soft Highlight Core (#65C6B5) — 14s duration */}
      <div
        className="kindle-bloom-accent absolute bottom-[10%] left-[22%] w-[54vw] h-[55vh] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(101, 198, 181, 0.20) 0%, rgba(25, 80, 82, 0.12) 40%, transparent 68%)',
          filter: 'blur(95px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 4: Dark Radial Vignette Falloff */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 45%, rgba(7, 31, 34, 0.75) 85%, #071F22 100%)',
        }}
      />
    </div>
  );
}
