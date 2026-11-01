'use client';

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
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#315B58]/50 bg-gradient-to-br from-[#103638] via-[#174448] to-[#195052]/40 p-8 flex flex-col justify-between shadow-2xl shadow-black/90 group">
              {/* Monogram / Crest Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#071F22]/70 border border-[#315B58] flex items-center justify-center p-2 backdrop-blur-md">
                  <img
                    src="/assets/logo/neocut-logo.png.jpg"
                    alt="NeoCut Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-xs text-[#65C6B5] tracking-widest uppercase font-semibold">
                  FOUNDER / DIRECTION
                </span>
              </div>

              {/* Editorial Artistic Visual Centerpiece */}
              <div className="relative flex flex-col items-center justify-center py-10 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#195052] via-[#103638] to-[#65C6B5] p-0.5 shadow-2xl shadow-[#195052]/50 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-[#071F22] flex items-center justify-center">
                    <span className="font-editorial text-3xl font-bold text-[#F7FCFA] tracking-wider">
                      NC
                    </span>
                  </div>
                </div>
                <StretchSnapText as="h4" level="secondary" className="font-editorial text-2xl font-bold text-[#F7FCFA]">
                  Saif
                </StretchSnapText>
                <p className="text-xs font-mono uppercase tracking-widest text-[#65C6B5] mt-1 font-semibold">
                  Creative Technologist &amp; Founder
                </p>
                <StretchSnapText as="p" level="subtle" split="words" className="text-xs text-[#D9F0EA] max-w-xs mt-3 leading-relaxed">
                  Directing cutting-edge AI visual pipelines, procedural 3D animation, and cinematic commercial films.
                </StretchSnapText>
              </div>

              {/* Bottom Credential Tag */}
              <div className="pt-4 border-t border-[#254845] flex items-center justify-between text-xs font-mono text-[#B5CEC7]">
                <span>EST. 2024</span>
                <span className="text-[#65C6B5]">● Dhaka / Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Narrative & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
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
              NeoCut Digital was founded on a singular conviction: traditional video production is too slow, too rigid, and too costly for modern digital brands. By marrying cutting-edge neural rendering, 3D character animation, and high-end cinematic post-production, we empower forward-thinking creators and enterprises to tell unforgettable visual stories.
            </StretchSnapText>

            <StretchSnapText as="p" level="subtle" split="words" className="text-[#B5CEC7] text-sm sm:text-base leading-relaxed">
              Whether architecting a hyper-realistic 3D anatomical explainer, producing a viral commercial product campaign, or animating preschool educational characters, our team treats every frame as an artistic statement.
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
                  About the Studio
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
