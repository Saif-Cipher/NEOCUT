'use client';

/**
 * Base dark navy translucent shimmer skeleton primitive.
 * Designed for dark themes with subtle animated highlight sweep
 * and automatic prefers-reduced-motion fallback via global styles.
 */
export function Skeleton({ className = '', style = {}, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-white/[0.05] border border-white/[0.06] ${className}`}
      style={style}
      {...props}
    >
      <span className="skeleton-shimmer-sweep absolute inset-0 -translate-x-full pointer-events-none" />
    </div>
  );
}

export default Skeleton;
