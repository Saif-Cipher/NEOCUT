'use client';

import React, { useEffect, useRef } from 'react';

const STIFFNESS = 0.08;
const DAMPING = 0.88;
const REPEL_RADIUS = 135;
const REPEL_STRENGTH = 16;
const GRID_STEP = 7;
const BASE_COLOR = { r: 226, g: 232, b: 240, a: 0.82 };
const ACCENT_COLOR = { r: 130, g: 200, b: 229, a: 1.0 };

/**
 * HalftoneWordmark
 * High-performance Canvas-rendered halftone brand wordmark with spring-based
 * cursor repulsion, click shockwave rings, idle sleep state, and responsive bottom-cropping.
 */
export default function HalftoneWordmark({
  className = '',
  wordmark = 'NEOCUT',
  minHeight = '280px',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Non-reactive animation state to prevent React re-renders during RAF
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafIdRef = useRef(null);
  const isVisibleRef = useRef(false);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = motionQuery.matches;

    const handleMotionChange = (e) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        stopAnimation();
        drawStatic(ctx, Math.min(window.devicePixelRatio || 1, 2));
      } else {
        startAnimation();
      }
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Draw static halftone state
    const drawStatic = (context, scale) => {
      context.save();
      context.scale(scale, scale);
      context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
      context.fillStyle = `rgba(${BASE_COLOR.r}, ${BASE_COLOR.g}, ${BASE_COLOR.b}, ${BASE_COLOR.a})`;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        context.beginPath();
        context.arc(p.ox, p.oy, p.baseR, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    };

    // Offscreen rasterization and grid sampling
    const rasterizeAndBuildGrid = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Offscreen canvas for font rasterization
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      // Dynamic font size: spans ~96% container width
      let testFontSize = 100;
      offCtx.font = `900 ${testFontSize}px "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
      const measured = offCtx.measureText(wordmark).width;
      const targetWidth = width * 0.96;
      const calculatedFontSize = Math.floor(testFontSize * (targetWidth / (measured || 1)));

      offCtx.font = `900 ${calculatedFontSize}px "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#FFFFFF';

      // Bottom cropping: position baseline so bottom 28-32% extends past container bottom
      const baselineY = height + calculatedFontSize * 0.28;
      offCtx.fillText(wordmark, width / 2, baselineY);

      // Extract pixel alpha buffer
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const newParticles = [];
      const step = width < 640 ? 6 : GRID_STEP;

      for (let y = 2; y < height; y += step) {
        for (let x = 2; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const alpha = imgData[idx + 3];

          if (alpha > 35) {
            const coverage = alpha / 255;
            const baseR = Math.max(0.75, (step * 0.46) * Math.pow(coverage, 0.75));
            newParticles.push({
              ox: x,
              oy: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              baseR,
              proximity: 0,
            });
          }
        }
      }

      particlesRef.current = newParticles;
      shockwavesRef.current = [];

      // Render initial static representation immediately to prevent flash of blank canvas
      drawStatic(ctx, dpr);

      if (!isReducedMotionRef.current && isVisibleRef.current) {
        startAnimation();
      }
    };

    // Main animation loop
    const render = () => {
      if (!isVisibleRef.current) return;

      const particles = particlesRef.current;
      const shockwaves = shockwavesRef.current;
      const mouse = mouseRef.current;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Update active shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      const numShockwaves = shockwaves.length;
      const mouseActive = mouse.active;
      const mx = mouse.x;
      const my = mouse.y;

      let totalMotion = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Pointer Repulsion (Elastic inverse distance)
        let targetProximity = 0;
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
            const dist = Math.sqrt(distSq) || 1;
            const factor = 1 - dist / REPEL_RADIUS;
            const force = factor * factor * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            targetProximity = factor;
          }
        }

        // 2. Shockwave Impulse Ring
        for (let s = 0; s < numShockwaves; s++) {
          const sw = shockwaves[s];
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.hypot(sdx, sdy) || 1;
          const delta = Math.abs(sdist - sw.radius);
          const bandWidth = 32;

          if (delta < bandWidth) {
            const waveIntensity = (1 - delta / bandWidth) * (1 - sw.radius / sw.maxRadius);
            const impulse = waveIntensity * sw.strength;
            p.vx += (sdx / sdist) * impulse;
            p.vy += (sdy / sdist) * impulse;
            targetProximity = Math.max(targetProximity, waveIntensity);
          }
        }

        // 3. Spring Return (Hooke's Law + Viscous Damping)
        const springX = (p.ox - p.x) * STIFFNESS;
        const springY = (p.oy - p.y) * STIFFNESS;
        p.vx = (p.vx + springX) * DAMPING;
        p.vy = (p.vy + springY) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // 4. Smooth proximity decay & color calculation
        p.proximity += (targetProximity - p.proximity) * 0.12;
        const prox = p.proximity;

        totalMotion += Math.abs(p.vx) + Math.abs(p.vy) + prox;

        // Modulate color from soft white to cyan accent (#82C8E5)
        const r = Math.round(BASE_COLOR.r + (ACCENT_COLOR.r - BASE_COLOR.r) * prox);
        const g = Math.round(BASE_COLOR.g + (ACCENT_COLOR.g - BASE_COLOR.g) * prox);
        const b = Math.round(BASE_COLOR.b + (ACCENT_COLOR.b - BASE_COLOR.b) * prox);
        const a = BASE_COLOR.a + (ACCENT_COLOR.a - BASE_COLOR.a) * prox;
        const currentR = p.baseR * (1 + 0.35 * prox);

        // 5. Draw Particle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Energy Conservation: sleep RAF when particles settle to equilibrium rest
      if (!mouseActive && numShockwaves === 0 && totalMotion < 0.05) {
        stopAnimation();
        drawStatic(ctx, dpr);
        return;
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (isReducedMotionRef.current) return;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    // IntersectionObserver: active loop ONLY when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Event Listeners (touch-friendly, passive, zero React re-renders)
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      startAnimation();
    };

    const handlePointerDeactivate = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handlePointerDown = (e) => {
      if (isReducedMotionRef.current) return;
      const rect = canvas.getBoundingClientRect();
      shockwavesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: Math.max(rect.width, rect.height) * 0.85,
        speed: 14,
        strength: 24,
      });
      startAnimation();
    };

    // ResizeObserver for responsive recalculation
    let resizeTimer = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        rasterizeAndBuildGrid();
      }, 60);
    });
    resizeObserver.observe(container);

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerDeactivate, { passive: true });
    container.addEventListener('pointerup', handlePointerDeactivate, { passive: true });
    container.addEventListener('pointercancel', handlePointerDeactivate, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Initial setup
    rasterizeAndBuildGrid();

    return () => {
      stopAnimation();
      observer.disconnect();
      resizeObserver.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerDeactivate);
      container.removeEventListener('pointerup', handlePointerDeactivate);
      container.removeEventListener('pointercancel', handlePointerDeactivate);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [wordmark]);

  return (
    <div
      ref={containerRef}
      role="img"
      className={`relative w-full overflow-hidden select-none touch-pan-y ${className}`}
      style={{ minHeight }}
      aria-label={`${wordmark} interactive brand wordmark`}
    >
      {/* Interactive Canvas Surface */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 block w-full h-full pointer-events-auto cursor-crosshair"
      />

      {/* Static SSR / Non-JS Fallback */}
      <noscript>
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end overflow-hidden opacity-85 pointer-events-none">
          <span
            className="font-black tracking-tighter text-slate-200 select-none text-[22vw] leading-[0.78] translate-y-[28%]"
            style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
          >
            {wordmark}
          </span>
        </div>
      </noscript>

      {/* Accessible off-screen label for screen readers */}
      <span className="sr-only">{wordmark} Digital Studio</span>
    </div>
  );
}
