'use client';

import { ArrowUpRight, Award, Video, Cpu, ShieldCheck } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-4 bg-[#080B10] border-t border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#000080]/20 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <StretchSnapText
            as="h2"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none"
          >
            About <span className="text-[#82C8E5] italic font-normal">NeoCut</span>
          </StretchSnapText>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder & Creative Direction Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0C1017] via-[#0E1422] to-[#000080]/30 p-8 flex flex-col justify-between shadow-2xl shadow-black/90 group">
              {/* Monogram / Crest Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 backdrop-blur-md">
                  <img
                    src="/assets/logo/neocut-logo.png.jpg"
                    alt="NeoCut Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-xs text-[#82C8E5] tracking-widest uppercase">
                  FOUNDER / DIRECTION
                </span>
              </div>

              {/* Editorial Artistic Visual Centerpiece */}
              <div className="relative flex flex-col items-center justify-center py-10 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#000080] via-[#0047AB] to-[#82C8E5] p-0.5 shadow-2xl shadow-[#0047AB]/50 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-[#080B10] flex items-center justify-center">
                    <span className="font-editorial text-3xl font-bold text-white tracking-wider">
                      NC
                    </span>
                  </div>
                </div>
                <StretchSnapText as="h4" level="secondary" className="font-editorial text-2xl font-bold text-white">
                  Saif
                </StretchSnapText>
                <p className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] mt-1">
                  Creative Technologist &amp; Founder
                </p>
                <StretchSnapText as="p" level="subtle" split="words" className="text-xs text-slate-400 max-w-xs mt-3 leading-relaxed">
                  Directing cutting-edge AI visual pipelines, procedural 3D animation, and cinematic commercial films.
                </StretchSnapText>
              </div>

              {/* Bottom Credential Tag */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EST. 2024</span>
                <span className="text-[#82C8E5]">● Dhaka / Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Narrative & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <StretchSnapText
              as="h3"
              level="secondary"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Where artificial intelligence meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#82C8E5] to-[#0047AB]">
                cinematic intuition.
              </span>
            </StretchSnapText>

            <StretchSnapText as="p" level="subtle" split="words" className="text-slate-300 text-base sm:text-lg leading-relaxed">
              NeoCut Digital was founded on a singular conviction: traditional video production is too slow, too rigid, and too costly for modern digital brands. By marrying cutting-edge neural rendering, 3D character animation, and high-end cinematic post-production, we empower forward-thinking creators and enterprises to tell unforgettable visual stories.
            </StretchSnapText>

            <StretchSnapText as="p" level="subtle" split="words" className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether architecting a hyper-realistic 3D anatomical explainer, producing a viral commercial product campaign, or animating preschool educational characters, our team treats every frame as an artistic statement.
            </StretchSnapText>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Video className="w-5 h-5 text-[#82C8E5] mb-2" />
                <h5 className="font-semibold text-white text-sm">Cinematic Craft</h5>
                <p className="text-xs text-slate-400 mt-1">Hollywood-grade framing, color grading, and editorial pacing.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Cpu className="w-5 h-5 text-[#82C8E5] mb-2" />
                <h5 className="font-semibold text-white text-sm">AI Innovation</h5>
                <p className="text-xs text-slate-400 mt-1">Accelerated workflows with custom AI diffusion and 3D rendering.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Award className="w-5 h-5 text-[#82C8E5] mb-2" />
                <h5 className="font-semibold text-white text-sm">Global Delivery</h5>
                <p className="text-xs text-slate-400 mt-1">Scalable multi-format exports from 9:16 mobile to 4K widescreen.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="https://wa.me/8801931245914"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#000080] to-[#0047AB] hover:from-[#0047AB] hover:to-[#0055CC] text-white font-semibold text-xs uppercase tracking-wider border border-[#82C8E5]/30 shadow-xl shadow-[#0047AB]/25 transition-all duration-300 active:scale-95"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#82C8E5]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
