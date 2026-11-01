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

  // Clear watchdog on unmount
  useEffect(() => {
    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  // When pathname changes, trigger reveal phase and reset
  useEffect(() => {
    if (phase === 'expanding') {
      setPhase('revealing');
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPhase('idle');
        pendingUrlRef.current = null;
      }, 450);
      return () => clearTimeout(timer);
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
      setIsTransitioning(true);
      setPhase('expanding');

      // Expand phase: exactly 0.65s (expo.inOut) before route push
      const pushTimer = setTimeout(() => {
        router.push(url);
      }, 650);

      // Fail-safe watchdog: ensure user is NEVER stuck on a blank page if route push stalls
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setPhase('idle');
      }, 1500);

      return () => clearTimeout(pushTimer);
    },
    [pathname, router, phase]
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning, phase, origin }}>
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
            className={`w-full h-full bg-[#050914] ${
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
                background: `radial-gradient(circle at var(--origin-x) var(--origin-y), rgba(0, 71, 171, 0.4) 0%, rgba(0, 0, 128, 0.2) 50%, transparent 80%)`,
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
 */
export function TransitionLink({ href, children, className, onClick, ...props }) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e) => {
    // Allow default browser behavior for modifier clicks (Ctrl/Cmd/Shift/Alt or middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (onClick) onClick(e);

    // If external link, let standard browser navigation handle it
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(href, e);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
