'use client';

import { ArrowUpRight, Film, Sparkles, Wand2, Eye, Compass, CheckCircle2, Layers, Clock, ShieldCheck, Zap } from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';
import { TransitionLink } from '@/components/motion/TransitionProvider';

const DETAILED_SERVICES = [
  {
    id: 'brand-promotion',
    number: '01',
    title: 'Brand Promotion & Commercial Films',
    tagline: 'High-converting video ads engineered for social feeds and direct response',
    icon: Film,
    accent: '#65C6B5',
    description:
      'We conceptualize and produce commercial films that elevate brand stature and drive quantifiable conversions. By blending 3D product simulation, hyper-stylized character narratives, and relentless hook pacing, your product stands out in cluttered algorithmic feeds.',
    capabilities: [
      '3D Product Modeling & Photorealistic Rendering',
      'Dynamic Social First (9:16) & Broadcast (16:9) Cuts',
      'High-Conversion UGC & Direct-to-Consumer Ads',
      'Kinetic Motion Design & Promo Typography',
    ],
    deliverables: ['15s, 30s, and 60s Cuts', '4K Master + Vertical Re-crops', 'Full Commercial Rights', 'Custom Color Grade'],
    idealFor: 'E-commerce brands, tech hardware companies, Kickstarter launches, and lifestyle labels.',
  },
  {
    id: 'kids-animation',
    number: '02',
    title: 'Kids 3D Animation & Musical Series',
    tagline: 'Whimsical characters, preschool songs, and educational world-building',
    icon: Sparkles,
    accent: '#65C6B5',
    description:
      'From preschool counting songs to recurring animated web series, we engineer vibrant 3D character animation tailored to retain young global attention. Our characters are expressive, relatable, and optimized for multi-episode series scaling.',
    capabilities: [
      'Original 3D Character Design, Rigging & Shading',
      'Nursery Rhymes & Educational Musical Choreography',
      'YouTube Kids Channel Packages & Episode Batches',
      'Multilingual Lip-Sync & Cultural Adaptation',
    ],
    deliverables: ['Full HD / 4K Episode Masters', 'Isolated Vocal & Instrumental Stems', 'Character Asset Library', 'YouTube Thumbnail Bundles'],
    idealFor: 'Children entertainment creators, edtech platforms, preschool brands, and family YouTube channels.',
  },
  {
    id: 'storytelling',
    number: '03',
    title: 'Cinematic Storytelling & Documentaries',
    tagline: 'Emotionally resonant human narratives that build enduring brand loyalty',
    icon: Wand2,
    accent: '#195052',
    description:
      'True influence stems from storytelling that moves the soul. We direct and produce intimate documentary profiles, founder journeys, institutional election profiles, and brand origin stories that transform passive viewers into lifelong advocates.',
    capabilities: [
      'Documentary Storyboarding & Interview Direction',
      'Human-Centered Visual Framing & Lighting',
      'Archival Footage Restoration & Mixed Media',
      'Rhythmic Montage & Emotional Score Composition',
    ],
    deliverables: ['Director Master Cut', 'Trailer & Social Teaser Hooks', 'Subtitled International Versions', 'High-Res Press Stills'],
    idealFor: 'Founders, institutional leaders, non-profits, enterprise retrospectives, and cultural initiatives.',
  },
  {
    id: 'cinematography',
    number: '04',
    title: '4K Cinematography & Aerial Showcase',
    tagline: 'Sweeping drone landscapes, high-dynamic-range grading, and rhythmic editorial',
    icon: Compass,
    accent: '#65C6B5',
    description:
      'We combine breathtaking 4K aerial drone cinematography with high-precision rhythmic cutting and Hollywood-calibrated color science. Designed for luxury tourism, real estate, automotive, and grand atmospheric visual showreels.',
    capabilities: [
      '4K / 6K Aerial Drone Pilot Cinematography',
      'ACES Color Managed Grading & Film Emulation',
      'Speed-Ramping & Synchronized Beat Cutting',
      'Atmospheric Soundscape & Foley Architecture',
    ],
    deliverables: ['ProRes 422 HQ Masters', 'LUT Color Grading Packages', 'Horizontal & Vertical Deliverables', 'Raw Camera Log Archives'],
    idealFor: 'Tourism boards, architectural firms, automotive brands, and luxury lifestyle campaigns.',
  },
  {
    id: 'explanation-videos',
    number: '05',
    title: '3D Scientific & Anatomical Explainers',
    tagline: 'Complex mechanisms visualised with microscopic precision and viral clarity',
    icon: Eye,
    accent: '#65C6B5',
    description:
      'We translate complicated physiological, mechanical, and technical concepts into mesmerizing 3D visualizations. Our anatomical animations dissect human biology, surgical procedures, and engineering feats with mathematical clarity.',
    capabilities: [
      'Microscopic Cellular & Anatomical 3D Simulation',
      'Cross-Section Cutaway & Mechanical X-Ray Renders',
      'Scientific Explainer Scripting & Technical Review',
      'Viral Pacing Calibrated for TikTok / Reels Reach',
    ],
    deliverables: ['Medical-Grade 3D Master Video', 'Static High-Res Medical Stills', 'Voiceover Synchronization', 'Educational Diagram Overlays'],
    idealFor: 'Medical device companies, healthcare providers, biotechnology startups, and educational publishers.',
  },
];

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen bg-transparent text-[#F7FCFA] selection:bg-[#65C6B5] selection:text-[#071F22] overflow-x-hidden pt-28 outline-none"
      >
        <FloatingCapsuleNav />

        {/* Page Hero Header */}
        <section className="relative px-4 pt-16 pb-20 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#65C6B5]/40 bg-[#103638]/85 backdrop-blur-md text-[#65C6B5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ STUDIO CAPABILITIES & SERVICE MATRIX ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7FCFA] leading-tight"
          >
            Capabilities & <span className="text-[#65C6B5] italic font-normal">Production</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-[#D9F0EA] text-base sm:text-xl max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            A full-spectrum creative studio uniting generative AI tools, 3D character design, Hollywood color grading, and viral anatomical visualization.
          </StretchSnapText>
        </section>

        {/* Deep-Dive Service Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-16">
          {DETAILED_SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className="p-8 sm:p-12 rounded-3xl border border-[#315B58]/50 bg-[#103638]/85 backdrop-blur-xl shadow-2xl shadow-black/80 hover:border-[#65C6B5] transition-all duration-500"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left Column: Scope & Overview */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#65C6B5]">
                        {service.number} / 05
                      </span>
                      <span className="w-8 h-px bg-[#254845]" />
                      <span className="text-xs font-mono uppercase tracking-widest text-[#B5CEC7]">
                        {service.id.replace(/-/g, ' ')}
                      </span>
                    </div>

                    <StretchSnapText
                      as="h2"
                      level="display"
                      className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F7FCFA] leading-tight"
                    >
                      {service.title}
                    </StretchSnapText>

                    <p className="text-sm sm:text-base font-semibold text-[#65C6B5]">
                      {service.tagline}
                    </p>

                    <p className="text-[#D9F0EA] text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Capabilities Checkmarks */}
                    <div className="pt-4 border-t border-[#254845]">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#B5CEC7] block mb-3 font-semibold">
                        Core Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-xs text-[#D9F0EA]">
                            <CheckCircle2 className="w-4 h-4 text-[#65C6B5] flex-shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deliverables & Action Panel */}
                  <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#071F22]/90 border border-[#315B58]/50 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#195052]/40 border border-[#65C6B5]/40 flex items-center justify-center text-[#65C6B5]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#B5CEC7] block">
                          Production Package
                        </span>
                        <span className="text-sm font-semibold text-[#F7FCFA]">Full Client Scope</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#B5CEC7] block mb-2 font-semibold">
                        Deliverable Specs:
                      </span>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {service.deliverables.map((del) => (
                          <li key={del} className="text-xs font-mono text-[#D9F0EA] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#65C6B5]" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#254845]">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#B5CEC7] block mb-1 font-semibold">
                        Best Suited For:
                      </span>
                      <p className="text-xs text-[#D9F0EA] leading-relaxed">
                        {service.idealFor}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <TransitionLink
                        href="/portfolio"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#103638] hover:bg-[#174448] border border-[#315B58] text-xs font-semibold text-[#F7FCFA] transition-colors"
                      >
                        <span>View Reel</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#65C6B5]" />
                      </TransitionLink>

                      <TransitionLink
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#65C6B5] hover:bg-[#65C6B5]/90 text-xs font-bold text-[#071F22] border border-[#65C6B5] shadow-lg shadow-[#195052]/30 transition-all"
                      >
                        <span>Book Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#071F22]" />
                      </TransitionLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Global Production SLA & Cloud Asset Promise */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-28">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#315B58]/60 bg-gradient-to-br from-[#103638] via-[#071F22] to-[#174448] shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#65C6B5] block font-semibold">
                [ PRODUCTION GUARANTEE ]
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F7FCFA]">
                Enterprise Cloud Asset Infrastructure
              </h2>
              <p className="text-[#D9F0EA] text-sm sm:text-base leading-relaxed">
                Every NeoCut production is archived and served through our verified Google Drive Cloud Asset Database. Clients receive perpetual streaming previews, lossless master exports up to 4K, and structured project folders that never expire.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <TransitionLink
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#65C6B5] text-[#071F22] hover:bg-[#65C6B5]/90 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#195052]/20"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 text-[#071F22]" />
                </TransitionLink>
                <TransitionLink
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#103638] hover:bg-[#174448] text-[#F7FCFA] font-semibold text-xs uppercase tracking-wider border border-[#315B58] transition-colors"
                >
                  <span>Explore Portfolio Archive</span>
                </TransitionLink>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
