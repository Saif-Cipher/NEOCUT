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
      className="relative min-h-[100svh] sm:min-h-[115svh] lg:min-h-[120svh] flex flex-col justify-center items-center px-4 pt-20 pb-20 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44 bg-transparent overflow-x-clip"
      aria-label="NeoCut Digital Studio Hero"
    >
      {/* Ambient Lighting & Orbit Guides */}
      <HeroDecorations />

      {/* 3D Orbit Media Cards Stage */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <HeroOrbitRing />
      </div>

      {/* Central Content & Editorial Display Typography */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center pointer-events-auto px-2">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#5CB2FF]/40 bg-[#0D1B3E]/85 backdrop-blur-md text-[#5CB2FF] text-[11px] font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-black/50">
          <Sparkles className="w-3 h-3 text-[#5CB2FF]" />
          <StretchSnapText as="span" level="subtle" split="words" trigger="mount" delay={0.1}>
            AI Video Production &amp; Cinematic Storytelling
          </StretchSnapText>
        </div>

        {/* Central Display Wordmark (Anubi Editorial Staging with Stretch Snap Kinetics) */}
        <div className="select-none mb-2">
          <StretchSnapText
            as="p"
            level="display"
            trigger="mount"
            delay={0.2}
            className="font-editorial text-[2.6rem] sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#FFFFFF] drop-shadow-[0_15px_30px_rgba(25,80,82,0.5)] m-0 leading-[0.95]"
          >
            NEOCUT
            <span className="text-[#5CB2FF] italic ml-1.5 sm:ml-4 font-normal">Digital</span>
          </StretchSnapText>
        </div>

        {/* Original Headline with Hand-Drawn Animated SVG Accent Underline */}
        <div className="relative max-w-[min(92%,32rem)]">
          <StretchSnapText
            as="h1"
            level="display"
            trigger="mount"
            delay={0.45}
            className="text-[1.45rem] leading-[1.2] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
          >
            Cinematic Video Production for{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#5CB2FF] to-[#1D4ED8]">
              Modern Brands
            </span>
          </StretchSnapText>

          {/* Hand-drawn SVG doodle underline anchored beneath the keyword */}
          <div className="w-full flex justify-end mt-1">
            <div className="w-32 sm:w-48">
              <svg
                className="w-full h-3 overflow-visible"
                viewBox="0 0 260 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  ref={doodleRef}
                  d="M4 14C55 5 170 3 256 12C200 6 110 8 45 16"
                  stroke="#5CB2FF"
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
          className="mt-4 text-[0.95rem] sm:text-base text-[#DCE6FF] max-w-[min(90%,30rem)] leading-relaxed"
        >
          We help brands, creators, and businesses turn ideas into powerful cinematic stories using AI-powered video production.
        </StretchSnapText>

        {/* CTAs: Primary (View Portfolio) & Secondary (Start a Project) */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <TransitionLink
            href="/portfolio"
            className="group px-7 py-3.5 rounded-full bg-[#2563EB] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] hover:text-[#FFFFFF] transition-all duration-300 shadow-xl shadow-[#1D4ED8]/30 active:scale-95 flex items-center gap-2"
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
            className="group px-7 py-3.5 rounded-full border border-[#26407F] hover:border-[#5CB2FF] bg-[#0D1B3E]/70 hover:bg-[#122556] text-[#FFFFFF] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg active:scale-95 flex items-center gap-2"
          >
            <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.95}>
              Start a Project
            </StretchSnapText>
            <span className="sr-only">(opens in a new tab)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#5CB2FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
