'use client';

import { useEffect, useRef } from 'react';
import OrbitCard from './OrbitCard';

// Approved 10 featured portfolio showpieces with verified local thumbnails (Exactly 10 unique assets)
const FEATURED_ORBIT_ASSETS = [
  {
    assetId: 'hero-1-video',
    title: 'NeoCut Studio Flagship Showreel',
    category: 'Showreel',
    categoryLabel: 'Master Reel',
    thumbnailUrl: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
    driveFileId: '1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1',
    duration: '0:30',
    aspectRatio: '16:9',
  },
  {
    assetId: 'brand-promotion-1-video',
    title: 'AI Messenger Bot E-Commerce Commercial',
    category: 'Commercial',
    categoryLabel: 'Brand Film',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp',
    driveFileId: '1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr',
    duration: '0:39',
    aspectRatio: '16:9',
  },
  {
    assetId: 'kids-animation-1-video',
    title: 'Counting Numbers 1 to 20 Song',
    category: 'Animation',
    categoryLabel: '3D Kids Series',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-1-ref.jpg',
    driveFileId: '11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI',
    duration: '2:03',
    aspectRatio: '16:9',
  },
  {
    assetId: 'explanation-1-video',
    title: 'How An Apple Watch Measures Blood Oxygen',
    category: 'Explainer',
    categoryLabel: '3D Medical Explainer',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-1-ref.jpg',
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    duration: '1:15',
    aspectRatio: '16:9',
  },
  {
    assetId: 'brand-promotion-2-video',
    title: 'TOTOPAC Waterproof Pouch Commercial',
    category: 'Commercial',
    categoryLabel: 'Commercial Ad',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-2-thumbnail.webp',
    driveFileId: '1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz',
    duration: '0:41',
    aspectRatio: '16:9',
  },
  {
    assetId: 'cinematography-1-video',
    title: 'Alpine Peak 4K Aerial Drone Reel',
    category: 'Cinematography',
    categoryLabel: '4K Aerial Film',
    thumbnailUrl: '/assets/thumbnails/cinematography/references/cinematography-1-ref.jpg',
    driveFileId: '1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne',
    duration: '1:45',
    aspectRatio: '16:9',
  },
  {
    assetId: 'storytelling-3-video',
    title: 'Road Guardians Safety 3D Narrative',
    category: 'Storytelling',
    categoryLabel: 'Cinematic Narrative',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-3-ref.jpg',
    driveFileId: '10aFx7Lyb7DM9dlBpbBr0VHyUhN8Qm6hl',
    duration: '0:30',
    aspectRatio: '16:9',
  },
  {
    assetId: 'kids-animation-2-video',
    title: 'Alero Kids Nursery Rhymes Ensemble',
    category: 'Animation',
    categoryLabel: '3D Musical Series',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-2-ref.jpg',
    driveFileId: '1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH',
    duration: '3:15',
    aspectRatio: '16:9',
  },
  {
    assetId: 'explanation-2-video',
    title: 'Human Diaphragm & Vocal Cord Simulation',
    category: 'Explainer',
    categoryLabel: 'Anatomical 3D',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-2-ref.jpg',
    driveFileId: '169qpr9g1XsmL7S93Oc6zTRAluW54_nzu',
    duration: '0:58',
    aspectRatio: '16:9',
  },
  {
    assetId: 'explanation-3-video',
    title: 'Human Lacrimal Tear Gland Anatomy',
    category: 'Explainer',
    categoryLabel: 'Physiological 3D',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-3-ref.jpg',
    driveFileId: '1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ',
    duration: '0:43',
    aspectRatio: '16:9',
  },
];

export default function HeroOrbitRing() {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const cardRefs = useRef([]);
  const animFrameRef = useRef(null);
  const isPausedRef = useRef(false);
  const isTabVisibleRef = useRef(true);
  const isIntersectingRef = useRef(true);
  const angleRef = useRef(0);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Background tab throttling (pauses RAF loop when tab is hidden)
    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Mouse movement listener with normalized pointer tracking
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      targetMouseRef.current = { x: normX, y: normY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // High-performance RAF loop (zero React setState calls = 0 component re-renders per second)
    let lastTime = performance.now();
    const updateLoop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Only advance when active, tab is visible, and container is on-screen
      if (!isPausedRef.current && isTabVisibleRef.current && isIntersectingRef.current && !motionQuery.matches) {
        angleRef.current = (angleRef.current + delta * 0.12) % (Math.PI * 2);

        // Dynamically compute responsive radii for fluid adaptation without clipping
        const width = window.innerWidth;
        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;
        const radiusX = isMobile ? Math.min(width * 0.36, 140) : isTablet ? 360 : 540;
        const radiusY = isMobile ? 120 : isTablet ? 160 : 210;
        const radiusZ = isMobile ? 150 : isTablet ? 250 : 390;
        const totalCards = FEATURED_ORBIT_ASSETS.length;

        // Smooth mouse lerp damping
        currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
        currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;

        // Apply plane tilt directly to DOM
        if (planeRef.current) {
          const tiltX = (currentMouseRef.current.y * 10).toFixed(2);
          const tiltY = (-currentMouseRef.current.x * 16).toFixed(2);
          planeRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }

        // Apply card positions directly to card element transforms
        for (let i = 0; i < totalCards; i++) {
          const cardEl = cardRefs.current[i];
          if (!cardEl) continue;

          const baseAngle = (i / totalCards) * Math.PI * 2;
          const currentAngle = baseAngle + angleRef.current;

          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY * 0.7;
          const z = Math.sin(currentAngle) * radiusZ;

          const rotateY = -Math.cos(currentAngle) * 22;
          const rotateX = Math.sin(currentAngle) * 8;
          const rotateZ = Math.cos(currentAngle) * 3;

          cardEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg)`;
          cardEl.style.zIndex = Math.round(z + 500);
        }
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Exactly 10 unique video thumbnails rendered in 3D orbit
  const displayAssets = FEATURED_ORBIT_ASSETS;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-full min-h-[640px] sm:min-h-[760px] lg:min-h-[860px] flex items-center justify-center orbit-stage-container pointer-events-none select-none"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
    >
      {/* Dynamic 3D Orbit Plane */}
      <div
        ref={planeRef}
        className="relative w-full h-full flex items-center justify-center orbit-plane"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {displayAssets.map((asset, index) => (
          <OrbitCard
            key={asset.assetId}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            item={asset}
            isLeadingCard={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
