'use client';

import { useState, useEffect } from 'react';

export default function IrisTransition({ isActive = false, onComplete, children }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isActive) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <>
      {children}
      {animating && (
        <div
          className="fixed inset-0 z-50 pointer-events-none bg-[#06080C] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            clipPath: 'circle(150% at 50% 50%)',
            animation: 'irisExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
