'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Film } from 'lucide-react';

/**
 * MediaSkeleton: Card-level media container that prevents layout shifts (CLS)
 * using an exact aspect ratio box and a dark navy shimmer placeholder.
 * Fades in the media smoothly once fully decoded and loaded.
 */
export default function MediaSkeleton({
  src,
  alt = '',
  aspectRatio = 'aspect-video',
  className = '',
  imgClassName = '',
  onError,
  children,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#080B10] ${aspectRatio} ${className}`}
      aria-busy={!isLoaded && !hasError}
      {...props}
    >
      {/* Underlying Shimmer Placeholder */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Skeleton className="w-full h-full rounded-none border-0" />
        </div>
      )}

      {/* Error Fallback Placeholder */}
      {hasError ? (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 p-4 text-center bg-[#0C1017] text-slate-500">
          <Film className="w-8 h-8 text-slate-600" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Media Stream Offline
          </span>
        </div>
      ) : (
        /* Actual Image with Progressive Fade-In */
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}

      {/* Children overlays (Play button, duration pill, aspect ratio badge) */}
      {children}
    </div>
  );
}

export { MediaSkeleton };
