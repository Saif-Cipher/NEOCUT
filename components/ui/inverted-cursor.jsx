'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * InvertedCursor Component
 * Reference: https://21st.dev/@arunachalam/components/inverted-cursor
 *
 * Replaces default pointer on desktop fine-pointer devices with a smooth,
 * circular inverted-colour cursor using CSS mix-blend-mode: difference.
 * Fully GPU-accelerated via transform scale & RAF damping.
 */
export default function InvertedCursor({ size = 20, hoverScale = 1.8 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const cursorRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isTextInputRef = useRef(false);
  const rafId = useRef(null);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Strict fine-pointer detection: only active on precision mice / trackpads, NEVER on touch devices
    const finePointerMedia = window.matchMedia('(pointer: fine)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkFinePointer = () => {
      const hasFine = finePointerMedia.matches;
      setIsFinePointer(hasFine);
      if (hasFine) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    checkFinePointer();
    finePointerMedia.addEventListener('change', checkFinePointer);

    if (!finePointerMedia.matches) {
      return () => {
        finePointerMedia.removeEventListener('change', checkFinePointer);
        document.documentElement.classList.remove('custom-cursor-active');
      };
    }

    const lerpFactor = reducedMotionMedia.matches ? 1 : 0.25;

    const render = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      // When cursor has settled at target position, pause the RAF loop to save battery & CPU
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
        if (cursorRef.current) {
          const scale = isHoveredRef.current ? hoverScale : 1;
          cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
        isRunning.current = false;
        return;
      }

      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      if (cursorRef.current) {
        const scale = isHoveredRef.current ? hoverScale : 1;
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    const startRender = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      startRender();

      const targetEl = e.target;
      if (!targetEl) return;

      // Preserve native I-beam cursor on text inputs, textareas, and editable fields
      const isInput =
        (targetEl.tagName === 'INPUT' &&
          !['button', 'submit', 'reset', 'checkbox', 'radio'].includes(targetEl.type)) ||
        targetEl.tagName === 'TEXTAREA' ||
        targetEl.isContentEditable;

      if (isTextInputRef.current !== isInput) {
        isTextInputRef.current = isInput;
        setIsTextInput(isInput);
      }

      if (isInput) {
        isHoveredRef.current = false;
        return;
      }

      // Check if hovering interactive element (links, buttons, clickable portfolio media, roles)
      const interactiveEl = targetEl.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], select, [data-interactive="true"], .cursor-pointer'
      );

      // Do NOT trigger hover scale on disabled elements
      const shouldHover = Boolean(
        interactiveEl &&
          !interactiveEl.disabled &&
          interactiveEl.getAttribute('aria-disabled') !== 'true'
      );

      if (isHoveredRef.current !== shouldHover) {
        isHoveredRef.current = shouldHover;
        startRender(); // re-trigger render to immediately apply new scale
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
      startRender();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      finePointerMedia.removeEventListener('change', checkFinePointer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [hoverScale]); // Mounts once and handles updates cleanly

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] bg-white transition-opacity duration-200 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity: isVisible && !isTextInput ? 1 : 0,
        mixBlendMode: 'difference',
        willChange: 'transform, opacity',
      }}
    />
  );
}

export { InvertedCursor as Cursor };
