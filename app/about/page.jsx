'use client';

import Image from 'next/image';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Video, 
  Cpu, 
  Award, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Clock, 
  Compass, 
  Film, 
  Zap, 
  Target, 
  HeartHandshake,
  Workflow
} from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';
import { TransitionLink } from '@/components/motion/TransitionProvider';

const STUDIO_METRICS = [
  { value: '48+', label: 'Master Assets Delivered', detail: 'Commercial ads, 3D animations, and cinematic documentaries' },
  { value: '100%', label: 'On-Time SLA Record', detail: 'Disciplined sprint milestones with zero missed launch dates' },
  { value: '5', label: 'Creative Verticals', detail: 'Commercial, Kids 3D, Storytelling, Cinematography, Explainers' },
  { value: '4K', label: 'Master Resolution Standard', detail: 'High-dynamic range ACES-managed pipeline for maximum visual fidelity' },
];

const DIRECTORIAL_PILLARS = [
  {
    number: '01',
    title: 'Narrative Supremacy',
    subtitle: 'Every visual frame serves emotional resonance',
    description:
      'We believe spectacular visuals without narrative meaning are empty noise. Every camera move, lighting shift, and character beat is calibrated around your core creative thesis, engaging audiences on both rational and emotional levels.',
    icon: Film,
  },
  {
    number: '02',
    title: 'Hybrid Neural & 3D Engineering',
    subtitle: 'Human directorial taste augmented by AI acceleration',
    description:
      'We don\'t use AI to replace artistry; we use bespoke diffusion architectures, ComfyUI latent nodes, and Blender 3D physics to eradicate traditional timeline bottlenecks, giving directors unlimited creative freedom.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Holistic Sonic Architecture',
    subtitle: 'Sound that commands subconscious attention',
    description:
      'More than 50% of the emotional impact in cinema comes from sound. Our dedicated sound designers craft bespoke foley, psychoacoustic spatial cues, and frequency-sculpted voiceovers that give every project monumental weight.',
    icon: Zap,
  },
  {
    number: '04',
    title: 'Broadcast ACES Color Precision',
    subtitle: 'Hollywood-standard color space management',
    description:
      'From camera sensor to final client display, our production pipeline operates in 32-bit floating-point ACEScc color science. Your films preserve breathtaking dynamic range, luminous highlights, and velvety shadow depth.',
    icon: Sparkles,
  },
];

const ARSENAL_TOOLS = [
  { name: 'Blender 4.x & Cycles', category: '3D Simulation & PBR Lighting' },
  { name: 'Unreal Engine 5.4', category: 'Real-Time Virtual Production' },
  { name: 'DaVinci Resolve Studio', category: 'ACEScc Color Grading & Mastering' },
  { name: 'Bespoke ComfyUI Pipelines', category: 'Neural Frame Synthesis & Upscaling' },
  { name: 'Adobe Premiere & After Effects', category: 'Kinetic Motion Typography & Assembly' },
  { name: 'iZotope RX & Ableton Live', category: 'Acoustic Sculpting & Sound Design' },
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen bg-transparent text-[#F7FCFA] selection:bg-[#65C6B5] selection:text-[#071F22] overflow-x-hidden pt-28 outline-none"
      >
        <FloatingCapsuleNav />

        {/* 1. Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#65C6B5]/40 bg-[#103638]/85 backdrop-blur-md text-[#65C6B5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ STUDIO PHILOSOPHY &amp; DNA ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7FCFA] leading-[1.08] max-w-5xl mx-auto"
          >
            Where Neural Innovation Meets{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F7FCFA] via-[#65C6B5] to-[#195052]">
              Cinematic Intuition.
            </span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-[#D9F0EA] text-base sm:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            NeoCut Digital is an avant-garde creative studio operating at the frontier of high-impact visual storytelling, advanced 3D motion systems, and algorithmic video engineering.
          </StretchSnapText>
        </section>

        {/* 2. Studio Metrics Bar */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#103638]/85 border border-[#315B58]/50 backdrop-blur-xl shadow-2xl shadow-black/80">
            {STUDIO_METRICS.map((metric, idx) => (
              <div 
                key={metric.label}
                className={`p-4 sm:p-6 flex flex-col justify-between ${
                  idx !== STUDIO_METRICS.length - 1 ? 'lg:border-r lg:border-[#254845]' : ''
                }`}
              >
                <div>
                  <span className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7FCFA] tracking-tight block">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#65C6B5] uppercase tracking-wider mt-2 block">
                    {metric.label}
                  </span>
                </div>
                <p className="text-xs text-[#D9F0EA] mt-3 leading-relaxed hidden sm:block">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Dedicated Founder Profile Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32" aria-label="Founder & Creative Director Profile">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Founder Editorial Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#315B58]/60 bg-[#103638]/70 shadow-2xl shadow-black/90 flex flex-col group">
                {/* Header Tag */}
                <div className="px-6 py-4 border-b border-[#254845] flex items-center justify-between bg-[#071F22]/70 backdrop-blur-md">
                  <span className="font-mono text-xs text-[#65C6B5] tracking-widest uppercase font-semibold">
                    FOUNDER PROFILE
                  </span>
                  <span className="font-mono text-[11px] text-[#B5CEC7]">
                    DHAKA / GLOBAL
                  </span>
                </div>

                {/* Large Portrait Image Container */}
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#071F22]">
                  <Image
                    src="/assets/profile/saif-founder.png"
                    alt="Saif Hossain, founder of NeoCut Digital"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Portrait Caption */}
                <div className="p-6 bg-[#0B2528]/95 border-t border-[#254845] space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-editorial text-2xl font-bold text-[#F7FCFA] m-0">
                      Saif Hossain
                    </h3>
                    <span className="text-[11px] font-mono text-[#65C6B5]">Est. 2024</span>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#65C6B5] font-semibold m-0">
                    Founder &amp; Creative Director — NeoCut Digital
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Founder Profile & Directorial Vision */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#315B58]/50 bg-[#103638]/70 text-[#65C6B5] text-xs font-mono tracking-wider w-fit">
                [ FOUNDER &amp; CREATIVE LEADERSHIP ]
              </div>

              <div>
                <StretchSnapText
                  as="h2"
                  level="display"
                  className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7FCFA] leading-tight"
                >
                  Saif Hossain
                </StretchSnapText>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#65C6B5] mt-1 font-semibold">
                  Founder &amp; Creative Director — NeoCut Digital
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#D9F0EA]">
                <p>
                  Saif Hossain established NeoCut Digital to build an agile, technology-driven studio capable of producing broadcast-grade motion media at the velocity required by modern digital brands. Confronting the high friction and prohibitive timelines of traditional agencies, he architected an alternative studio infrastructure engineered for creative agility.
                </p>

                <p className="text-[#B5CEC7]">
                  At NeoCut, Saif focuses on developing integrated AI-powered video workflows—combining ComfyUI latent diffusion models, neural frame synthesis, and procedural 3D physics in Blender. Under his leadership, artificial intelligence is deployed as an amplifier for directorial intent, enabling rapid visual iteration without sacrificing cinematic polish.
                </p>

                <p className="text-[#B5CEC7]">
                  He oversees creative direction across all five production verticals: commercial brand films, 3D character animations, narrative storytelling, 4K cinematography, and scientific explanation videos. From narrative conception and acoustic design to lighting composition and ACES color grading, Saif steers each production to ensure technical rigor and emotional impact.
                </p>
              </div>

              {/* Directorial Creed Blockquote */}
              <div className="p-5 rounded-2xl bg-[#071F22]/80 border-l-2 border-[#65C6B5] border-y border-r border-[#254845] space-y-2">
                <p className="font-editorial italic text-base sm:text-lg text-[#F7FCFA] leading-snug m-0">
                  &ldquo;Artificial intelligence does not replace human artistry—it liberates the director to explore previously impossible scales of visual storytelling with precision and speed.&rdquo;
                </p>
                <span className="block text-[11px] font-mono text-[#65C6B5] uppercase tracking-wider">
                  — Saif Hossain, Founder
                </span>
              </div>

              {/* Direct Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <TransitionLink
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#65C6B5] hover:bg-[#65C6B5]/90 text-[#071F22] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#195052]/30"
                >
                  <span>Explore Master Gallery</span>
                  <ArrowUpRight className="w-4 h-4" />
                </TransitionLink>

                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#103638] hover:bg-[#174448] border border-[#315B58] text-[#F7FCFA] text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  <span>Contact Creative Director</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B5CEC7]" />
                </TransitionLink>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Four Core Pillars Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#65C6B5]/40 bg-[#103638]/85 backdrop-blur-md text-[#65C6B5] text-xs font-semibold tracking-wider uppercase mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>[ GUIDING PRINCIPLES ]</span>
            </div>
            <StretchSnapText
              as="h2"
              level="display"
              className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7FCFA] tracking-tight"
            >
              The Four Pillars of <span className="text-[#65C6B5] italic font-normal">NeoCut</span>
            </StretchSnapText>
            <p className="text-[#D9F0EA] text-sm sm:text-base mt-4 leading-relaxed">
              Every production that leaves our workstations is rigorously measured against these four non-negotiable standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DIRECTORIAL_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="group relative p-8 sm:p-10 rounded-3xl bg-[#103638]/90 border border-[#315B58]/50 hover:border-[#65C6B5] hover:bg-[#174448] transition-all duration-500 shadow-xl shadow-black/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#071F22]/70 border border-[#315B58]/50 flex items-center justify-center text-[#65C6B5] group-hover:scale-110 group-hover:bg-[#195052]/40 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-[#B5CEC7] uppercase tracking-widest">
                        PILLAR // {pillar.number}
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7FCFA] group-hover:text-[#65C6B5] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-[#65C6B5] uppercase tracking-wider mt-1 mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-[#D9F0EA] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#254845] flex items-center justify-between text-xs text-[#B5CEC7] font-mono">
                    <span>STANDARD SPECIFICATION</span>
                    <span className="text-[#65C6B5] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> CERTIFIED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Production Arsenal & Hardware / Software Stack */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#103638]/90 border border-[#315B58]/60 shadow-2xl shadow-black/90">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-mono text-[#65C6B5] uppercase tracking-widest block mb-2">
                [ STUDIO INFRASTRUCTURE ]
              </span>
              <StretchSnapText
                as="h2"
                level="secondary"
                className="font-editorial text-3xl sm:text-4xl font-bold text-[#F7FCFA] tracking-tight"
              >
                The Technical Arsenal
              </StretchSnapText>
              <p className="text-sm text-[#D9F0EA] mt-3 leading-relaxed">
                We combine industry-standard visual effects suites with proprietary deep-learning pipelines to deliver seamless, photo-real execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {ARSENAL_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="p-5 rounded-2xl bg-[#071F22]/70 border border-[#315B58]/40 hover:border-[#65C6B5] hover:bg-[#174448] transition-all duration-300 flex flex-col justify-between"
                >
                  <span className="text-[#F7FCFA] font-semibold text-sm sm:text-base block">
                    {tool.name}
                  </span>
                  <span className="text-xs font-mono text-[#65C6B5] tracking-wider mt-2 block">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Closing Directorial CTA */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center mb-28">
          <div className="p-12 sm:p-16 rounded-3xl border border-[#315B58]/60 bg-[#103638]/95 shadow-2xl shadow-black/90 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#195052]/30 via-transparent to-transparent" />
            
            <span className="text-xs font-mono uppercase tracking-widest text-[#65C6B5] block mb-4">
              [ DIRECT STUDIO COLLABORATION ]
            </span>
            <StretchSnapText
              as="h2"
              level="display"
              className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-[#F7FCFA] leading-tight"
            >
              Ready to elevate your <span className="text-[#65C6B5] italic font-normal">visual narrative?</span>
            </StretchSnapText>
            <p className="text-[#D9F0EA] text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Connect directly with our founding director to analyze your brand story, schedule a production sprint, and review our creative workflow.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <TransitionLink
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#65C6B5] hover:bg-[#65C6B5]/90 text-[#071F22] font-bold text-xs uppercase tracking-wider border border-[#65C6B5] shadow-xl shadow-[#195052]/30 transition-all duration-300"
              >
                <span>Initiate Studio Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </TransitionLink>

              <TransitionLink
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#071F22]/80 hover:bg-[#174448] text-[#F7FCFA] font-semibold text-xs uppercase tracking-wider border border-[#315B58] transition-all duration-300"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4 text-[#B5CEC7]" />
              </TransitionLink>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
