'use client';

import { useState, useEffect, useRef } from 'react';
import OrbitCard from './OrbitCard';

// 8 Verified, Approved Master Portfolio Assets with Local High-Resolution Thumbnails
const FEATURED_ORBIT_ASSETS = [
  {
    assetId: 'promotion-1-video',
    name: 'AI Messenger Bot Commercial',
    category: 'Brand Promotion',
    previewUrl: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/preview',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp',
    aspectRatio: '16:9',
  },
  {
    assetId: 'promotion-2-video',
    name: 'Totopac Waterproof Pouch Commercial',
    category: 'Brand Promotion',
    previewUrl: 'https://drive.google.com/file/d/1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz/preview',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-2-thumbnail.webp',
    aspectRatio: '16:9',
  },
  {
    assetId: 'kids-animation-1-video',
    name: 'Counting Numbers 1 to 20 Song',
    category: 'Kids Animation',
    previewUrl: 'https://drive.google.com/file/d/17y4tDk4Wl60V9qWwz8R8ZfQn2-3uXf9k/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-1-ref.jpg',
    aspectRatio: '16:9',
  },
  {
    assetId: 'kids-animation-2-video',
    name: 'Alero Kids Nursery Rhymes Compilation',
    category: 'Kids Animation',
    previewUrl: 'https://drive.google.com/file/d/1zJv_9KwLp1O3m4t5Qy6R7u-8W9f0E1s2/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-2-ref.jpg',
    aspectRatio: '16:9',
  },
  {
    assetId: 'storytelling-1-video',
    name: 'Student Leadership Profile Story',
    category: 'Storytelling',
    previewUrl: 'https://drive.google.com/file/d/1d_qQ38N1K-3bBv2Zz7Xm1_vP4W5x9Y6Z/preview',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-1-ref.jpg',
    aspectRatio: '1440:1080',
  },
  {
    assetId: 'cinematography-1-video',
    name: 'Canyon Landscape Documentary Film',
    category: 'Cinematography',
    previewUrl: 'https://drive.google.com/file/d/1r_K8P5jN0s4L3t-9Zz2W7qF5V6y1X8B9/preview',
    thumbnailUrl: '/assets/thumbnails/cinematography/references/cinematography-1-ref.jpg',
    aspectRatio: '16:9',
  },
  {
    assetId: 'hero-1-video',
    name: 'Cinematic Studio Showreel',
    category: 'Showcase',
    previewUrl: 'https://drive.google.com/file/d/1w_L9Q7pN3s1K4t-8Zz6V5qD2X7y9A3B0/preview',
    thumbnailUrl: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
    aspectRatio: '16:9',
  },
  {
    assetId: 'explanation-1-video',
    name: '3D Human Spine Anatomy & Health',
    category: 'Explanation Videos',
    previewUrl: 'https://drive.google.com/file/d/1w_N8Q4pK2s9L3t-7Zz5W6qC1X8y0A2B9/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-1-ref.jpg',
    aspectRatio: '9:16',
  },
];

export default function HeroOrbitRing() {
  const [angleOffset, setAngleOffset] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Respect user's motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Mouse movement listener with damped pointer tracking
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to +1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to +1
      targetMouseRef.current = { x: normX, y: normY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Continuous 60fps orbit animation loop
    let lastTime = performance.now();
    const updateLoop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && !prefersReducedMotion) {
        // Continuous gentle angular rotation
        setAngleOffset((prev) => (prev + delta * 0.12) % (Math.PI * 2));
      }

      if (prefersReducedMotion) {
        setMouseTilt({ x: 0, y: 0 });
      } else {
        // Smooth mouse lerp damping
        currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
        currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;

        setMouseTilt({
          x: currentMouseRef.current.y * 10, // tilt X around horizontal axis
          y: -currentMouseRef.current.x * 16, // tilt Y around vertical axis
        });
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, prefersReducedMotion]);

  // Viewport-based responsive tuning
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  // Mobile uses 4 cards to keep viewport clean; Tablet uses 6 cards; Desktop displays all 8 cards
  const displayAssets = isMobile
    ? FEATURED_ORBIT_ASSETS.slice(0, 4)
    : isTablet
    ? FEATURED_ORBIT_ASSETS.slice(0, 6)
    : FEATURED_ORBIT_ASSETS;

  // Elliptical orbit radii based on viewport
  const radiusX = isMobile ? Math.min(viewportWidth * 0.42, 175) : isTablet ? 360 : 520;
  const radiusY = isMobile ? 110 : isTablet ? 150 : 200;
  const radiusZ = isMobile ? 140 : isTablet ? 240 : 380;
  const totalCards = displayAssets.length;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[640px] sm:min-h-[760px] lg:min-h-[860px] flex items-center justify-center orbit-stage-container pointer-events-none select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic 3D Orbit Plane with smooth damped Euler rotation */}
      <div
        className="relative w-full h-full flex items-center justify-center orbit-plane"
        style={{
          transform: `rotateX(${mouseTilt.x}deg) rotateY(${mouseTilt.y}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {displayAssets.map((asset, index) => {
          // Calculate angle for symmetrically distributed elliptical slots
          const baseAngle = (index / totalCards) * Math.PI * 2;
          const currentAngle = baseAngle + angleOffset;

          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY * 0.7; // angled ellipse
          const z = Math.sin(currentAngle) * radiusZ;

          // Card faces outward subtly matching angle
          const rotateY = -Math.cos(currentAngle) * 22;
          const rotateX = Math.sin(currentAngle) * 8;
          const rotateZ = Math.cos(currentAngle) * 3;

          return (
            <OrbitCard
              key={asset.assetId}
              item={asset}
              x={x}
              y={y}
              z={z}
              rotateX={rotateX}
              rotateY={rotateY}
              rotateZ={rotateZ}
            />
          );
        })}
      </div>
    </div>
  );
}
