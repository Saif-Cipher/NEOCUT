'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import HeroOrbitRing from '../hero/HeroOrbitRing';
import HeroDecorations from '../hero/HeroDecorations';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

export default function HeroSection() {
  const heroRef = useRef(null);
  const doodleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Coordinated doodle line draw triggered as the headline stretches & snaps
      gsap.fromTo(
        doodleRef.current,
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.85,
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.95,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[115svh] sm:min-h-[120svh] lg:min-h-[125svh] flex flex-col justify-center items-center px-4 pt-36 pb-36 sm:pt-44 sm:pb-44 lg:pt-48 lg:pb-48 bg-transparent overflow-x-clip"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#65C6B5]/40 bg-[#103638]/85 backdrop-blur-md text-[#65C6B5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
          <Sparkles className="w-3.5 h-3.5 text-[#65C6B5]" />
          <StretchSnapText as="span" level="subtle" split="words" trigger="mount" delay={0.1}>
            AI Video Production &amp; Cinematic Storytelling
          </StretchSnapText>
        </div>

        {/* Central Display Wordmark (Anubi Editorial Staging with Stretch Snap Kinetics) */}
        <div className="select-none mb-3">
          <StretchSnapText
            as="p"
            level="display"
            trigger="mount"
            delay={0.2}
            className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#F7FCFA] drop-shadow-[0_15px_30px_rgba(25,80,82,0.5)] m-0"
          >
            NEOCUT
            <span className="text-[#65C6B5] italic ml-2 sm:ml-4 font-normal">Digital</span>
          </StretchSnapText>
        </div>

        {/* Original Headline with Hand-Drawn Animated SVG Accent Underline */}
        <div className="relative max-w-3xl">
          <StretchSnapText
            as="h1"
            level="display"
            trigger="mount"
            delay={0.45}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F7FCFA] leading-[1.15]"
          >
            Cinematic Video Production for{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F7FCFA] via-[#65C6B5] to-[#195052]">
              Modern Brands
            </span>
          </StretchSnapText>

          {/* Hand-drawn SVG doodle underline anchored beneath the keyword */}
          <div className="w-full flex justify-end">
            <div className="w-48 sm:w-64 -mt-2">
              <svg
                className="w-full h-3.5 overflow-visible"
                viewBox="0 0 260 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  ref={doodleRef}
                  d="M4 14C55 5 170 3 256 12C200 6 110 8 45 16"
                  stroke="#65C6B5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Original Supporting Copy */}
        <StretchSnapText
          as="p"
          level="subtle"
          split="words"
          trigger="mount"
          delay={0.7}
          className="mt-6 text-base sm:text-lg text-[#D9F0EA] max-w-2xl leading-relaxed"
        >
          We help brands, creators, and businesses turn ideas into powerful cinematic stories using AI-powered video production.
        </StretchSnapText>

        {/* CTAs: Primary (View Portfolio) & Secondary (Start a Project) */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <TransitionLink
            href="/portfolio"
            className="group px-7 py-3.5 rounded-full bg-[#65C6B5] text-[#071F22] font-bold text-xs uppercase tracking-wider hover:bg-[#65C6B5]/90 hover:text-[#071F22] transition-all duration-300 shadow-xl shadow-[#195052]/30 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.9}>
              View Portfolio
            </StretchSnapText>
          </TransitionLink>

          <a
            href="https://wa.me/8801931245914"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 rounded-full border border-[#315B58] hover:border-[#65C6B5] bg-[#103638]/70 hover:bg-[#174448] text-[#F7FCFA] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95 flex items-center gap-2"
          >
            <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.95}>
              Start a Project
            </StretchSnapText>
            <span className="sr-only">(opens in a new tab)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#65C6B5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
