'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import HeroOrbitRing from '../hero/HeroOrbitRing';
import HeroDecorations from '../hero/HeroDecorations';

export default function HeroSection() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const wordmarkRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const doodleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Coordinated entrance sequence (Emil Kowalski / Anubi cinematic timing)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(wordmarkRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 1.4,
        delay: 0.2,
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.0,
      }, '-=0.9')
      .from(doodleRef.current, {
        strokeDashoffset: 600,
        duration: 1.6,
        ease: 'power2.inOut',
      }, '-=0.6')
      .from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.9,
      }, '-=1.0')
      .from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[115svh] sm:min-h-[120svh] lg:min-h-[125svh] flex flex-col justify-center items-center px-4 pt-36 pb-36 sm:pt-44 sm:pb-44 lg:pt-48 lg:pb-48 bg-[#06080C] overflow-x-clip"
      aria-label="NeoCut Digital Studio Hero"
    >
      {/* Ambient Lighting & Orbit Guides */}
      <HeroDecorations />

      {/* 3D Orbit Media Cards Stage */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <HeroOrbitRing />
      </div>

      {/* Central Content & Editorial Display Typography */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center pointer-events-auto">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-[#82C8E5]" />
          <span>AI Video Production & Cinematic Storytelling</span>
        </div>

        {/* Central Display Wordmark (Anubi Editorial Staging) */}
        <div ref={wordmarkRef} className="select-none mb-3">
          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_15px_30px_rgba(0,0,128,0.5)]">
            NEOCUT
            <span className="text-[#82C8E5] italic ml-2 sm:ml-4 font-normal">Digital</span>
          </h2>
        </div>

        {/* Original Headline with Hand-Drawn Animated SVG Accent Underline */}
        <div ref={headlineRef} className="relative max-w-3xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
            Cinematic Video Production for{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#82C8E5] to-[#0047AB]">
              Modern Brands
              {/* Hand-drawn SVG doodle underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible"
                viewBox="0 0 260 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  ref={doodleRef}
                  d="M4 14C55 5 170 3 256 12C200 6 110 8 45 16"
                  stroke="#82C8E5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="600"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Original Supporting Copy */}
        <p
          ref={subtextRef}
          className="mt-8 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed"
        >
          We help brands, creators, and businesses turn ideas into powerful cinematic stories using AI-powered video production.
        </p>

        {/* CTAs: Primary (View Portfolio) & Secondary (Start a Project via WhatsApp) */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#portfolio"
            className="group px-7 py-3.5 rounded-full bg-white text-[#06080C] font-semibold text-xs uppercase tracking-wider hover:bg-[#82C8E5] hover:text-[#06080C] transition-all duration-300 shadow-xl shadow-white/10 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>View Portfolio</span>
          </a>

          <a
            href="https://wa.me/8801931245914"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 rounded-full border border-white/20 hover:border-[#82C8E5] bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95 flex items-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#82C8E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
