'use client';

/**
 * Base Neo Navy translucent shimmer skeleton primitive.
 * Designed for dark teal themes with subtle animated highlight sweep
 * and automatic prefers-reduced-motion fallback via global styles.
 */
export function Skeleton({ className = '', style = {}, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-[#0D1B3E]/70 border border-[#26407F]/30 ${className}`}
      style={style}
      {...props}
    >
      <span className="skeleton-shimmer-sweep absolute inset-0 -translate-x-full pointer-events-none" />
    </div>
  );
}

export default Skeleton;
