'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function WireframeTorus() {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Parametric Wireframe Torus Geometry & Material
    const geometry = new THREE.TorusGeometry(1.2, 0.45, 18, 48);
    const material = new THREE.MeshBasicMaterial({
      color: 0x82C8E5,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });

    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Subtle inner glowing ring
    const innerGeo = new THREE.TorusGeometry(1.2, 0.08, 12, 36);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0047AB,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerTorus = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerTorus);

    // 3. Pointer Drag & Inertia Physics
    let targetRotationX = 0.3;
    let targetRotationY = 0.2;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let pointerIsDown = false;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = motionQuery.matches;
    const onMotionChange = (e) => {
      prefersReduced = e.matches;
    };
    motionQuery.addEventListener('change', onMotionChange);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onPointerDown = (e) => {
      pointerIsDown = true;
      setIsDragging(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!pointerIsDown) return;
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      pointerIsDown = false;
      setIsDragging(false);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 4. IntersectionObserver: Pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 5. Render Loop with Damped Rotation
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || !isTabActive) return;

      // Base idle continuous rotation (paused under reduced motion)
      if (!pointerIsDown && !prefersReduced) {
        targetRotationY += 0.004;
        targetRotationX += 0.002;
      }

      // Smooth inertia damping
      torus.rotation.x += (targetRotationX - torus.rotation.x) * 0.08;
      torus.rotation.y += (targetRotationY - torus.rotation.y) * 0.08;

      innerTorus.rotation.x = torus.rotation.x;
      innerTorus.rotation.y = -torus.rotation.y * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center text-center p-6 border border-white/10 rounded-3xl bg-[#0C1017]">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#82C8E5]/50 animate-spin flex items-center justify-center">
          <span className="font-mono text-xs text-[#82C8E5]">3D</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] mx-auto select-none" aria-hidden="true">
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing rounded-3xl border border-white/10 bg-gradient-to-b from-[#0C1017] to-[#06080C] p-4 flex items-center justify-center transition-all duration-300 ${
          isDragging ? 'border-[#82C8E5] shadow-2xl shadow-[#0047AB]/40' : 'hover:border-white/20'
        }`}
      />
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-white/5">
          Drag to rotate 3D wireframe
        </span>
      </div>
    </div>
  );
}
