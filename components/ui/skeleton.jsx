'use client';

/**
 * Base dark navy translucent shimmer skeleton primitive.
 * Designed for dark themes with subtle animated highlight sweep
 * and automatic prefers-reduced-motion fallback.
 */
export function Skeleton({ className = '', style = {}, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-white/[0.05] border border-white/[0.06] ${className}`}
      style={style}
      {...props}
    >
      {/* Subtle sweeping shimmer gradient */}
      <span
        className="skeleton-shimmer-sweep absolute inset-0 -translate-x-full pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
          animation: 'skeleton-shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer-sweep {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}} />
    </div>
  );
}

export default Skeleton;
