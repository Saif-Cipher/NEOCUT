'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    // Return graceful fallback if used outside provider
    return {
      navigate: (url) => {
        if (typeof window !== 'undefined') window.location.href = url;
      },
      isTransitioning: false,
    };
  }
  return ctx;
}

export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'expanding' | 'revealing'
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const pendingUrlRef = useRef(null);
  const safetyTimerRef = useRef(null);
  const pushTimerRef = useRef(null);
  const transitionStartRef = useRef(0);

  // Clear watchdog & push timers on unmount
  useEffect(() => {
    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    };
  }, []);

  // When pathname changes, ensure iris has completed smooth expansion before revealing
  useEffect(() => {
    if (phase === 'expanding' || isTransitioning) {
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }

      const elapsed = Date.now() - transitionStartRef.current;
      const minExpandDuration = 480; // ensure iris smoothly covers screen before revealing
      const remaining = Math.max(0, minExpandDuration - elapsed);

      const revealTimer = setTimeout(() => {
        setPhase('revealing');
        const resetTimer = setTimeout(() => {
          setIsTransitioning(false);
          setPhase('idle');
          pendingUrlRef.current = null;
        }, 450);
        return () => clearTimeout(resetTimer);
      }, remaining);

      return () => clearTimeout(revealTimer);
    }
  }, [pathname]);

  const navigate = useCallback(
    (url, event = null) => {
      if (!url) return;

      // If already on this exact route, don't re-transition
      if (url === pathname) {
        return;
      }

      // Check prefers-reduced-motion
      if (typeof window !== 'undefined') {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
          router.push(url);
          return;
        }
      }

      // Pre-warm route bundle immediately as secondary guarantee
      try {
        router.prefetch(url);
      } catch (err) {
        // Silently catch unsupported prefetch environments
      }

      // Capture click origin coordinates
      let x = '50%';
      let y = '50%';
      if (event && typeof event.clientX === 'number') {
        x = `${event.clientX}px`;
        y = `${event.clientY}px`;
      } else if (typeof window !== 'undefined') {
        x = `${window.innerWidth / 2}px`;
        y = `${window.innerHeight / 2}px`;
      }

      setOrigin({ x, y });
      pendingUrlRef.current = url;
      transitionStartRef.current = Date.now();
      setIsTransitioning(true);
      setPhase('expanding');

      // OPTIMIZATION: Initiate router.push at 120ms rather than 650ms.
      // Calling router.push early allows Next.js route resolution to occur
      // concurrently with the iris animation, eliminating perceived latency.
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
      pushTimerRef.current = setTimeout(() => {
        router.push(url);
      }, 120);

      // Fail-safe watchdog: ensure user is NEVER stuck on an overlay if route stalls
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setPhase('idle');
      }, 1500);
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning, phase, origin, router }}>
      {children}

      {/* Anubi-Inspired Circular Iris Clip-Path Overlay */}
      {isTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'clip-path, opacity',
          }}
        >
          <div
            className={`w-full h-full bg-[#071F22] ${
              phase === 'expanding' ? 'iris-clip-expand' : 'iris-clip-reveal'
            }`}
            style={{
              '--origin-x': origin.x,
              '--origin-y': origin.y,
            }}
          >
            {/* Subtle radial bloom inside expanding iris for cinematic depth */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: `radial-gradient(circle at var(--origin-x) var(--origin-y), rgba(25, 80, 82, 0.45) 0%, rgba(16, 54, 56, 0.3) 50%, transparent 80%)`,
              }}
            />
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

/**
 * Reusable TransitionLink component that uses circular iris transition on click.
 * Automatically prefetches target route on mount and hover.
 */
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  onMouseEnter,
  onFocus,
  onTouchStart,
  prefetch = true,
  ...props
}) {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  // Prefetch route on mount if it's an internal route
  useEffect(() => {
    if (!prefetch || !href) return;
    const isInternal =
      typeof href === 'string' &&
      href.startsWith('/') &&
      !href.startsWith('//') &&
      !href.startsWith('/#');

    if (isInternal && href !== pathname) {
      try {
        router.prefetch(href);
      } catch (e) {
        // Silently catch prefetch errors
      }
    }
  }, [href, prefetch, pathname, router]);

  const handleWarmup = useCallback(() => {
    if (!prefetch || !href) return;
    const isInternal =
      typeof href === 'string' &&
      href.startsWith('/') &&
      !href.startsWith('//');

    if (isInternal) {
      try {
        router.prefetch(href);
      } catch (e) {
        // Silently catch
      }
    }
  }, [href, prefetch, router]);

  const handleClick = (e) => {
    // Allow default browser behavior for modifier clicks (Ctrl/Cmd/Shift/Alt or middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (onClick) onClick(e);

    // If external link or anchor-only, let standard browser navigation handle it
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    e.preventDefault();
    navigate(href, e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={(e) => {
        handleWarmup();
        if (onMouseEnter) onMouseEnter(e);
      }}
      onFocus={(e) => {
        handleWarmup();
        if (onFocus) onFocus(e);
      }}
      onTouchStart={(e) => {
        handleWarmup();
        if (onTouchStart) onTouchStart(e);
      }}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
