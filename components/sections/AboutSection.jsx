'use client';

import Image from 'next/image';
import { ArrowUpRight, Award, Video, Cpu, ShieldCheck } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-4 bg-transparent border-t border-[#254845] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#195052]/20 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <StretchSnapText
            as="h2"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7FCFA] leading-none"
          >
            About <span className="text-[#65C6B5] italic font-normal">NeoCut</span>
          </StretchSnapText>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder & Creative Direction Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#315B58]/60 bg-[#103638]/70 shadow-2xl shadow-black/80 flex flex-col items-center group">
              {/* Header Badge */}
              <div className="w-full px-6 py-4 border-b border-[#254845] flex items-center justify-between bg-[#071F22]/70 backdrop-blur-md">
                <span className="font-mono text-xs text-[#65C6B5] tracking-widest uppercase font-semibold">
                  FOUNDER / DIRECTION
                </span>
                <span className="font-mono text-[11px] text-[#B5CEC7]">
                  DHAKA / GLOBAL
                </span>
              </div>

              {/* Founder Circular Profile Stage with Ample Spacing */}
              <div className="py-8 sm:py-10 px-6 flex flex-col items-center justify-center w-full">
                {/* Circular Portrait Container (Mobile: 210px, Tablet: 260px, Desktop: 300px) */}
                <div 
                  className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] aspect-square rounded-full shrink-0 overflow-hidden border-2 border-[#315B58] ring-4 ring-[#103638]/90 ring-offset-2 ring-offset-[#071F22] shadow-[0_0_50px_rgba(101,198,181,0.2),0_20px_40px_rgba(7,31,34,0.7)] transition-all duration-500 group-hover:border-[#65C6B5]/60 group-hover:shadow-[0_0_60px_rgba(101,198,181,0.3),0_25px_45px_rgba(7,31,34,0.8)]"
                  style={{ borderRadius: '50%' }}
                >
                  <Image
                    src="/assets/profile/saif-founder.png"
                    alt="Saif Hossain, founder of NeoCut Digital"
                    fill
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 260px, 300px"
                    className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Founder Meta & Role */}
              <div className="w-full p-6 bg-[#0B2528]/95 border-t border-[#254845] text-center space-y-1.5">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="font-editorial text-2xl font-bold text-[#F7FCFA] m-0">
                    Saif Hossain
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#103638] border border-[#315B58] text-[#65C6B5]">Est. 2024</span>
                </div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#65C6B5] font-semibold m-0">
                  Founder, NeoCut Digital
                </p>
                <p className="text-xs text-[#D9F0EA] leading-relaxed pt-1 max-w-sm mx-auto m-0">
                  Leading creative direction, algorithmic video systems, and cinematic production for digital brands.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Narrative & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#315B58]/50 bg-[#103638]/70 text-[#65C6B5] text-xs font-mono tracking-wider w-fit">
              [ FOUNDER &amp; CREATIVE DIRECTION ]
            </div>

            <StretchSnapText
              as="h3"
              level="secondary"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#F7FCFA] leading-tight"
            >
              Where artificial intelligence meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7FCFA] via-[#65C6B5] to-[#195052]">
                cinematic intuition.
              </span>
            </StretchSnapText>

            <StretchSnapText as="p" level="subtle" split="words" className="text-[#D9F0EA] text-base sm:text-lg leading-relaxed">
              Founded by Saif Hossain, NeoCut Digital was built on a singular conviction: traditional video production is too slow, too rigid, and too costly for modern digital brands. By marrying cutting-edge neural rendering, 3D character animation, and high-end cinematic post-production, we empower forward-thinking creators and enterprises to tell unforgettable visual stories.
            </StretchSnapText>

            <StretchSnapText as="p" level="subtle" split="words" className="text-[#B5CEC7] text-sm sm:text-base leading-relaxed">
              Under Saif&apos;s directorial vision, our studio treats every frame as an artistic statement—whether architecting a hyper-realistic 3D biomedical explainer, producing a viral commercial product campaign, or animating preschool educational series.
            </StretchSnapText>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#254845]">
              <div className="p-4 rounded-2xl bg-[#103638]/70 border border-[#315B58]/40">
                <Video className="w-5 h-5 text-[#65C6B5] mb-2" />
                <h5 className="font-semibold text-[#F7FCFA] text-sm">Cinematic Craft</h5>
                <p className="text-xs text-[#D9F0EA] mt-1">Hollywood-grade framing, color grading, and editorial pacing.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#103638]/70 border border-[#315B58]/40">
                <Cpu className="w-5 h-5 text-[#65C6B5] mb-2" />
                <h5 className="font-semibold text-[#F7FCFA] text-sm">AI Innovation</h5>
                <p className="text-xs text-[#D9F0EA] mt-1">Accelerated workflows with custom AI diffusion and 3D rendering.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#103638]/70 border border-[#315B58]/40">
                <Award className="w-5 h-5 text-[#65C6B5] mb-2" />
                <h5 className="font-semibold text-[#F7FCFA] text-sm">Global Delivery</h5>
                <p className="text-xs text-[#D9F0EA] mt-1">Scalable multi-format exports from 9:16 mobile to 4K widescreen.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <TransitionLink
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#103638] hover:bg-[#174448] text-[#F7FCFA] font-semibold text-xs uppercase tracking-wider border border-[#315B58] hover:border-[#65C6B5]/50 transition-all duration-300 shadow-xl group"
              >
                <StretchSnapText as="span" level="subtle" split="words" interactive>
                  About the Studio &amp; Founder
                </StretchSnapText>
                <ArrowUpRight className="w-4 h-4 text-[#65C6B5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </TransitionLink>

              <a
                href="https://wa.me/8801931245914"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#65C6B5] hover:bg-[#65C6B5]/90 text-[#071F22] font-bold text-xs uppercase tracking-wider border border-[#65C6B5] shadow-xl shadow-[#195052]/30 transition-all duration-300 active:scale-95"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#071F22]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
