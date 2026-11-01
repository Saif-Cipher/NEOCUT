'use client';

/**
 * Base Midnight Teal translucent shimmer skeleton primitive.
 * Designed for dark teal themes with subtle animated highlight sweep
 * and automatic prefers-reduced-motion fallback via global styles.
 */
export function Skeleton({ className = '', style = {}, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-[#103638]/70 border border-[#315B58]/30 ${className}`}
      style={style}
      {...props}
    >
      <span className="skeleton-shimmer-sweep absolute inset-0 -translate-x-full pointer-events-none" />
    </div>
  );
}

export default Skeleton;
