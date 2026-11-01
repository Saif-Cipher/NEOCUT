'use client';

import React, { useEffect, useRef, useState } from 'react';

export type Vec3 = [number, number, number];

export interface GlassFoldProps {
  className?: string;
  speed?: number;
  scale?: number;
  noise?: number;
  color1?: Vec3;
  color2?: Vec3;
  color3?: Vec3;
  interactive?: boolean;
}

// ---------------------------------------------------------------------------
// GLSL Shaders
// ---------------------------------------------------------------------------

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_scale;
  uniform float u_noise;
  uniform vec2 u_resolution;
  uniform vec3 u_pointer; // xy: UV coordinates [0, 1], z: lens intensity [0, 1]

  varying vec2 vUv;

  #define PI 3.14159265359

  mat2 Rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  float noise(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 centered(vec2 uv) {
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / max(u_resolution.y, 1.0);
    return p;
  }

  vec3 foldGradient(vec2 uv, float time) {
    vec2 q = Rot(0.6) * centered(uv) * 2.0 * u_scale;
    float t = time * 0.6;
    float pixel = 2.0 * u_scale / max(u_resolution.y, 1.0);

    vec3 color = mix(u_color2, u_color2 * 0.45, clamp(length(centered(uv)) * 1.3, 0.0, 1.0));

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float bend = mod(fi, 2.0) * 2.0 - 1.0;

      float crease = (fi - 2.5) * 0.4
                   + 0.26 * sin(q.x * (1.05 + 0.12 * fi) + fi * 1.9 + t * (0.25 + 0.05 * fi))
                   + 0.1 * bend * q.x * q.x;
      float s = q.y - crease;
      float pane = smoothstep(-pixel, pixel, s);
      float back = max(s, 0.0);

      // Glass thickness distribution
      float body = exp(-back * 1.7);
      float fresnel = exp(-back * 8.0);
      float rim = exp(-back * 80.0);
      float inner = exp(-pow((back - 0.045) / 0.014, 2.0));
      float bloom = exp(-abs(s) * 20.0);

      vec3 tint = mix(
        u_color1,
        u_color3,
        clamp(fresnel * 0.6 + 0.08 + 0.14 * sin(fi * 2.1 + q.x * 0.8 + t * 0.2), 0.0, 1.0)
      );

      vec3 light = tint * pane * (body * 0.42 + fresnel * 0.4)
                 + u_color3 * (pane * (rim * 0.6 + inner * 0.12) + bloom * 0.1);

      // Screen blend: color + light * (1.0 - color)
      color += light * (1.0 - color);
    }

    return clamp(color, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float time = u_time;

    // Pointer lens effect: pull sample coordinate toward pointer
    if (u_pointer.z > 0.001) {
      vec2 d = uv - u_pointer.xy;
      d.x *= u_resolution.x / max(u_resolution.y, 1.0);
      float lens = exp(-dot(d, d) * 7.0) * u_pointer.z;
      uv -= (uv - u_pointer.xy) * lens * 0.4;
    }

    vec3 color = foldGradient(uv, time);

    // Subtle tactile grain
    if (u_noise > 0.001) {
      float grain = noise(vUv * 200.0 + time * 0.1);
      color *= (1.0 - u_noise * 0.4 + u_noise * grain * 0.4);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// WebGL Compilation & Setup Helpers
// ---------------------------------------------------------------------------

interface UniformLocations {
  u_time: WebGLUniformLocation | null;
  u_color1: WebGLUniformLocation | null;
  u_color2: WebGLUniformLocation | null;
  u_color3: WebGLUniformLocation | null;
  u_scale: WebGLUniformLocation | null;
  u_noise: WebGLUniformLocation | null;
  u_resolution: WebGLUniformLocation | null;
  u_pointer: WebGLUniformLocation | null;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (!gl.isContextLost()) {
      console.error('[GlassFold] Shader compilation error:', gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string
): WebGLProgram | null {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vert);
    gl.deleteShader(frag);
    return null;
  }

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.bindAttribLocation(program, 0, 'position');
  gl.linkProgram(program);

  // Clean intermediate shader objects
  gl.deleteShader(vert);
  gl.deleteShader(frag);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (!gl.isContextLost()) {
      console.error('[GlassFold] Program link error:', gl.getProgramInfoLog(program));
    }
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GlassFold({
  className = '',
  speed = 0.3,
  scale = 1.0,
  noise = 0.08,
  color1 = [0.0, 0.278, 0.6705],       // #0047AB
  color2 = [0.0196, 0.0353, 0.0784],   // #050914
  color3 = [0.5098, 0.7843, 0.8980],   // #82C8E5
  interactive = true,
}: GlassFoldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  // References for live render loop
  const uniformsRef = useRef({ speed, scale, noise, color1, color2, color3, interactive });
  uniformsRef.current = { speed, scale, noise, color1, color2, color3, interactive };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let uniformLocs: UniformLocations | null = null;
    let rafId: number | null = null;
    let lastTime: number | null = null;
    let accumulatedTime = 0.0;
    let isContextLost = false;

    // Smoothed pointer coordinates
    const pointerCurrent: Vec3 = [0.5, 0.5, 0.0];
    const pointerTarget: Vec3 = [0.5, 0.5, 0.0];

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function initGL(): boolean {
      try {
        gl = canvas.getContext('webgl', {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: 'high-performance',
        });
      } catch (err) {
        console.warn('[GlassFold] WebGL not supported:', err);
        return false;
      }

      if (!gl) {
        return false;
      }

      program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
      if (!program) return false;

      // 4-vertex full-screen quad (TRIANGLE_STRIP)
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      const quadVertices = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.useProgram(program);

      // Cache uniform locations
      uniformLocs = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_color1: gl.getUniformLocation(program, 'u_color1'),
        u_color2: gl.getUniformLocation(program, 'u_color2'),
        u_color3: gl.getUniformLocation(program, 'u_color3'),
        u_scale: gl.getUniformLocation(program, 'u_scale'),
        u_noise: gl.getUniformLocation(program, 'u_noise'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_pointer: gl.getUniformLocation(program, 'u_pointer'),
      };

      return true;
    }

    const success = initGL();
    if (!success) {
      setWebglFailed(true);
      return;
    }

    let cssWidth = 1;
    let cssHeight = 1;

    function handleResize() {
      if (!canvas || !gl || isContextLost) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // DPR capping: Math.min(DPR, 2) on desktop, 1.0 on mobile (<640px)
      const dpr = w < 640 ? 1.0 : Math.min(window.devicePixelRatio || 1, 2);

      cssWidth = Math.max(w, 1);
      cssHeight = Math.max(h, 1);
      const pixelWidth = Math.max(Math.round(w * dpr), 1);
      const pixelHeight = Math.max(Math.round(h * dpr), 1);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    function render(now: number) {
      if (!gl || !program || !uniformLocs || isContextLost) return;

      const dt = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const { speed: uSpeed, scale: uScale, noise: uNoise, color1: c1, color2: c2, color3: c3 } =
        uniformsRef.current;

      accumulatedTime += dt * uSpeed;

      // Pointer smoothing
      const follow = 1.0 - Math.exp(-dt * 6.0);
      pointerCurrent[0] += (pointerTarget[0] - pointerCurrent[0]) * follow;
      pointerCurrent[1] += (pointerTarget[1] - pointerCurrent[1]) * follow;
      pointerCurrent[2] += (pointerTarget[2] - pointerCurrent[2]) * follow;

      gl.useProgram(program);
      gl.uniform1f(uniformLocs.u_time, accumulatedTime);
      gl.uniform3fv(uniformLocs.u_color1, c1);
      gl.uniform3fv(uniformLocs.u_color2, c2);
      gl.uniform3fv(uniformLocs.u_color3, c3);
      gl.uniform1f(uniformLocs.u_scale, uScale);
      gl.uniform1f(uniformLocs.u_noise, uNoise);
      gl.uniform2f(uniformLocs.u_resolution, cssWidth, cssHeight);
      gl.uniform3fv(uniformLocs.u_pointer, pointerCurrent);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!reducedMotionQuery.matches && !document.hidden) {
        rafId = requestAnimationFrame(render);
      }
    }

    function startAnimation() {
      if (reducedMotionQuery.matches) {
        // Reduced motion: draw single frame at time=1.5 for optimal fold composition
        accumulatedTime = 1.5;
        render(performance.now());
      } else if (!document.hidden && !rafId) {
        lastTime = null;
        rafId = requestAnimationFrame(render);
      }
    }

    function stopAnimation() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    startAnimation();

    // Visibility handling
    function handleVisibility() {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    // Reduced motion handling
    function handleReducedMotion(e: MediaQueryListEvent) {
      if (e.matches) {
        stopAnimation();
        accumulatedTime = 1.5;
        render(performance.now());
      } else {
        startAnimation();
      }
    }
    reducedMotionQuery.addEventListener('change', handleReducedMotion);

    // Pointer tracking
    function handlePointerMove(e: PointerEvent) {
      if (!uniformsRef.current.interactive) return;
      const x = e.clientX / cssWidth;
      const y = 1.0 - e.clientY / cssHeight; // Invert for WebGL UV coordinate space
      pointerTarget[0] = Math.max(0.0, Math.min(1.0, x));
      pointerTarget[1] = Math.max(0.0, Math.min(1.0, y));
      pointerTarget[2] = 1.0;
    }

    function handlePointerLeave() {
      pointerTarget[2] = 0.0;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    // Context loss / restoration
    function handleContextLost(e: Event) {
      e.preventDefault();
      isContextLost = true;
      stopAnimation();
      console.warn('[GlassFold] WebGL context lost.');
    }

    function handleContextRestored() {
      isContextLost = false;
      console.info('[GlassFold] WebGL context restored.');
      if (initGL()) {
        handleResize();
        startAnimation();
      } else {
        setWebglFailed(true);
      }
    }

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      reducedMotionQuery.removeEventListener('change', handleReducedMotion);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none bg-[#050914] ${className}`.trim()}
    >
      {webglFailed ? (
        // Static CSS Fallback: rich navy gradient with subtle cyan accent
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 50% 15%, rgba(0, 71, 171, 0.35) 0%, rgba(5, 9, 20, 0.92) 68%, #050914 100%), radial-gradient(circle at 78% 40%, rgba(130, 200, 229, 0.14) 0%, transparent 60%)',
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}

export { GlassFold };
