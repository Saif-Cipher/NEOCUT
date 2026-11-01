'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ParticleTypography() {
  const mountRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 180;

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl');
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Offscreen 2D canvas text rasterizer to sample particle coordinates
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 700;
    offCanvas.height = 160;
    const ctx2d = offCanvas.getContext('2d');
    ctx2d.font = 'bold 110px "Playfair Display", Georgia, serif';
    ctx2d.fillStyle = '#ffffff';
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';
    ctx2d.fillText('NEOCUT', offCanvas.width / 2, offCanvas.height / 2);

    const imgData = ctx2d.getImageData(0, 0, offCanvas.width, offCanvas.height).data;
    const step = 4; // Sample density
    const particlePositions = [];
    const originalPositions = [];
    const velocities = [];

    for (let y = 0; y < offCanvas.height; y += step) {
      for (let x = 0; x < offCanvas.width; x += step) {
        const index = (y * offCanvas.width + x) * 4;
        if (imgData[index + 3] > 128) {
          // Centered 3D coordinates
          const posX = (x - offCanvas.width / 2) * 0.45;
          const posY = -(y - offCanvas.height / 2) * 0.45;
          const posZ = (Math.random() - 0.5) * 5;

          particlePositions.push(posX, posY, posZ);
          originalPositions.push(posX, posY, posZ);
          velocities.push(0, 0, 0);
        }
      }
    }

    const count = particlePositions.length / 3;
    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.Float32BufferAttribute(particlePositions, 3);
    geometry.setAttribute('position', posAttr);

    // Particle Shader Material in NeoCut Midnight Teal Accent (#65C6B5)
    const material = new THREE.PointsMaterial({
      color: 0x65C6B5,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // 3. Mouse Coordinate Tracking
    let mouse = { x: -9999, y: -9999 };
    let isVisible = true;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Project mouse coordinates to 3D world space approximately
      mouse.x = (clientX - width / 2) * 0.45;
      mouse.y = -(clientY - height / 2) * 0.45;
    };

    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);

    // 4. IntersectionObserver: Pause when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // 5. Physics Simulation Loop with Repulsion and Spring Return
    let animId;
    const repulsionRadius = 35;
    const springStrength = 0.08;
    const damping = 0.88;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const positions = geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const px = positions[i3];
        const py = positions[i3 + 1];
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];

        // Vector to mouse
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor Repulsion Force
        if (dist < repulsionRadius) {
          const force = (1 - dist / repulsionRadius) * 4.5;
          const angle = Math.atan2(dy, dx);
          velocities[i3] += Math.cos(angle) * force;
          velocities[i3 + 1] += Math.sin(angle) * force;
        }

        // Spring Pull back to Origin
        const springX = (ox - px) * springStrength;
        const springY = (oy - py) * springStrength;

        velocities[i3] += springX;
        velocities[i3 + 1] += springY;

        // Apply Damping
        velocities[i3] *= damping;
        velocities[i3 + 1] *= damping;

        // Update Coordinates
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) return null;

  return (
    <div className="relative w-full overflow-hidden select-none py-6">
      <div
        ref={mountRef}
        className="w-full h-[180px] flex items-center justify-center cursor-crosshair"
      />
    </div>
  );
}
