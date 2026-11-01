'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  FileText, 
  Layers, 
  Clapperboard, 
  Palette, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Share2, 
  FolderLock, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';
import WireframeTorus from '@/components/3d/WireframeTorus';
import { TransitionLink } from '@/components/motion/TransitionProvider';

const PRODUCTION_STAGES = [
  {
    number: '01',
    title: 'Discovery, Thesis & Creative Scoping',
    phase: 'Conceptualization & Strategic Positioning',
    timeline: '24–48 Hours',
    description:
      'We deconstruct your core value proposition, audience psychology, and competitive landscape to establish a singular creative thesis. Through visual moodboards and technical parameters, we align our directorial vision with your business KPIs.',
    deliverables: [
      'Comprehensive Creative Brief',
      'Visual Moodboards & Color Palette Treatments',
      'Distribution Strategy & Aspect Ratio Matrix (16:9, 9:16, 1:1)',
      'Production Timeline & Milestone Agreement',
    ],
    checkpoint: 'Creative Thesis & Moodboard Lock',
  },
  {
    number: '02',
    title: 'Scriptwriting & Narrative Architecture',
    phase: 'Storyboarding, Beat Pacing & Voice Casting',
    timeline: '2–3 Business Days',
    description:
      'We write compelling, conversion-focused scripts engineered around the 3-second hook law. Simultaneously, we develop detailed shot-by-shot storyboards and animatic pacing guides, paired with professional voice actor auditions.',
    deliverables: [
      'Narrative & Direct-Response Script Variants',
      'Visual Storyboards & Camera Framing Guides',
      'Voiceover Audition Selections & Accent Casting',
      'Rough Timing Animatic with Temp Audio Track',
    ],
    checkpoint: 'Script & Voiceover Final Approval',
  },
  {
    number: '03',
    title: '3D Asset Modeling, Rigging & Styleframes',
    phase: 'Visual Development & Look Dev',
    timeline: '3–5 Business Days',
    description:
      'Our 3D artists sculpt, model, and texture bespoke virtual assets in Blender and Unreal Engine. We craft photorealistic PBR materials, set up cinematic lighting rigs, and render 4K styleframes that showcase the exact final aesthetic.',
    deliverables: [
      'High-Poly 3D Asset Models & Product Digital Twins',
      'Photorealistic PBR Textures & Shader Development',
      '3–5 Production Styleframes in Full 4K Resolution',
      '360-Degree Turnaround Render Previews',
    ],
    checkpoint: 'Look Dev & 4K Styleframe Sign-Off',
  },
  {
    number: '04',
    title: 'Kinetic Animation & Neural Frame Synthesis',
    phase: 'Dynamic Motion & Visual Effects',
    timeline: '4–6 Business Days',
    description:
      'The heart of production. We animate characters, coordinate fluid dynamic simulations (cloth, smoke, liquid), and direct dramatic camera moves. Neural frame synthesis is integrated to upscale textures, enhance lighting, and inject organic complexity.',
    deliverables: [
      'Full-Motion 3D Character & Object Animation',
      'Procedural Particle, Fluid & Cloth Physics',
      'Dynamic Camera Move Tracking & Motion Polish',
      'Work-in-Progress Motion Preview Cut (Watermarked)',
    ],
    checkpoint: 'Animation & Kinetic Pacing Review',
  },
  {
    number: '05',
    title: 'ACES Color Grading & Sonic Architecture',
    phase: 'Post-Production, Color Science & Sound Design',
    timeline: '2–3 Business Days',
    description:
      'Every sequence is brought into DaVinci Resolve Studio for 32-bit floating-point ACEScc color grading. In tandem, our audio architects compose bespoke soundscapes, hyper-detailed foley effects, and dynamic audio mastering.',
    deliverables: [
      'Hollywood-Calibrated ACEScc Color Master',
      'Bespoke Foley, Risers, Impacts & Sound Design',
      'Voiceover Audio Restoration & Loudness Normalization',
      'Separate Audio Stem Packages (Music, SFX, Dialogue)',
    ],
    checkpoint: 'Audio-Visual Master Lock',
  },
  {
    number: '06',
    title: 'Multi-Format Delivery & Cloud Archival',
    phase: 'Platform Mastering & Hand-off',
    timeline: '24 Hours',
    description:
      'We generate pristine ProRes 422 HQ and high-bitrate H.265 deliverables for every intended platform. All assets are archived to dedicated Google Drive folders with clean master files, captioned social edits, and thumbnail packs.',
    deliverables: [
      '4K ProRes 422 HQ Master Files (Widescreen 16:9)',
      'Vertical Mobile Edits (9:16) & Square Feeds (1:1)',
      'Subtitled Video Masters (.SRT + Hardcoded burned-in)',
      'Permanent Google Drive Cloud Asset Repository',
    ],
    checkpoint: 'Project Completion & Full License Delivery',
  },
];

const SLA_STANDARDS = [
  {
    icon: RefreshCw,
    title: '2 Iterative Review Rounds',
    desc: 'Each milestone includes 2 structured rounds of feedback to ensure every creative nuance aligns with your vision before proceeding.',
  },
  {
    icon: FolderLock,
    title: '100% Client-Owned IP',
    desc: 'Upon final milestone sign-off, full commercial rights, working files, and master deliverables transfer completely to your organization.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict Confidentiality & NDA',
    desc: 'We routinely handle unreleased hardware, confidential medical procedures, and proprietary software under standard mutual NDAs.',
  },
  {
    icon: Zap,
    title: 'Express Sprint Availability',
    desc: 'High-urgency campaigns and product launches can be expedited through dedicated round-the-clock rendering clusters.',
  },
];

const FAQS = [
  {
    q: 'How long does a typical video production cycle take?',
    a: 'Standard commercial films and 3D explainers take between 10 to 18 business days from creative brief to final master delivery. Urgent 5-to-7 day express sprints are available upon request.',
  },
  {
    q: 'What assets do we need to provide before kicking off?',
    a: 'We require your brand guidelines (logos, fonts, colors), reference product photos or 3D CAD files if available, and any key messaging points you want prioritized.',
  },
  {
    q: 'Can you deliver the same project formatted for both YouTube and TikTok?',
    a: 'Yes. Every project is storyboarded with universal framing guides so we can deliver native 16:9 widescreen masters and optimized 9:16 vertical cuts with re-framed typography and action points.',
  },
  {
    q: 'Do you handle voiceover recording and music licensing?',
    a: 'Yes. We provide complete end-to-end audio production, including professional native voiceover talent in multiple accents and fully cleared global commercial music licensing.',
  },
];

export default function ProcessPage() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-transparent text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden pt-28">
        <FloatingCapsuleNav />

        {/* 1. Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ SYSTEMATIC WORKFLOW PIPELINE ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl mx-auto"
          >
            Mathematical Rhythm,{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#82C8E5] to-[#0047AB]">
              Uncompromising Vision.
            </span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            Our disciplined six-stage creative engineering framework transforms abstract concepts into broadcast-grade digital cinema with complete transparency at every milestone.
          </StretchSnapText>
        </section>

        {/* 2. Interactive Production Pipeline Workbench (Left: Interactive Stages, Right: Stage Details & 3D Visualizer) */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Stages List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-[#82C8E5] uppercase tracking-widest block mb-4">
                [ PRODUCTION PHASES ]
              </span>
              {PRODUCTION_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div
                    key={stage.number}
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0E1422] border-[#82C8E5]/60 shadow-xl shadow-[#0047AB]/20 scale-[1.01]'
                        : 'bg-[#080B10]/90 border-white/5 hover:border-white/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-[#0047AB] border-[#82C8E5] text-white shadow-md'
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          {stage.number}
                        </span>
                        <div>
                          <h3
                            className={`font-semibold text-sm sm:text-base transition-colors ${
                              isActive ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {stage.title}
                          </h3>
                          <span className="text-xs text-[#82C8E5]/80 font-mono block mt-0.5">
                            {stage.timeline}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-[#82C8E5] translate-x-0.5 -translate-y-0.5' : 'text-slate-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Stage Deep-Dive Card + 3D Torus Visualizer */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 sm:p-10 bg-[#0C1017]/95 border border-white/10 shadow-2xl shadow-black/90 relative overflow-hidden">
                {/* Stage Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#82C8E5]">
                      {PRODUCTION_STAGES[activeStage].number}
                    </span>
                    <div>
                      <h4 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                        {PRODUCTION_STAGES[activeStage].title}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                        {PRODUCTION_STAGES[activeStage].phase}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0047AB]/20 border border-[#82C8E5]/30 text-xs font-mono text-[#82C8E5]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{PRODUCTION_STAGES[activeStage].timeline}</span>
                  </div>
                </div>

                {/* Stage Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed my-6">
                  {PRODUCTION_STAGES[activeStage].description}
                </p>

                {/* Stage Deliverables */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
                    KEY MILESTONE DELIVERABLES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRODUCTION_STAGES[activeStage].deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#82C8E5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Checkpoint Box */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block">
                        MILESTONE CHECKPOINT &amp; SIGN-OFF:
                      </span>
                      <span className="text-white text-xs sm:text-sm font-semibold">
                        {PRODUCTION_STAGES[activeStage].checkpoint}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300/80 px-2.5 py-1 rounded-md bg-emerald-500/20">
                    REQUIRED
                  </span>
                </div>

                {/* Integrated Interactive Three.js Wireframe Torus Canvas */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#82C8E5]" />
                      <span>Interactive 3D Geometry Core (Drag to Rotate)</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#82C8E5]">WebGL Engine</span>
                  </div>
                  <div className="relative aspect-[16/7] rounded-2xl overflow-hidden border border-white/5 bg-[#080B10]">
                    <WireframeTorus />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Studio SLA & Production Guarantees */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] block mb-2">
              [ SERVICE LEVEL COMMITMENT ]
            </span>
            <StretchSnapText
              as="h2"
              level="secondary"
              className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Enterprise-Grade Production Standards
            </StretchSnapText>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              We eliminate guesswork with contractual delivery dates, clear milestone checkpoints, and total IP ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SLA_STANDARDS.map((sla) => {
              const Icon = sla.icon;
              return (
                <div
                  key={sla.title}
                  className="p-6 rounded-3xl bg-[#0C1017]/90 border border-white/10 hover:border-[#82C8E5]/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/80 group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#82C8E5] group-hover:scale-110 group-hover:bg-[#0047AB]/20 transition-all duration-300 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-white text-base mb-2 group-hover:text-[#82C8E5] transition-colors">
                      {sla.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sla.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> GUARANTEED
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Production FAQ Section */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 mb-32">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] block mb-2">
              [ FREQUENTLY ASKED QUESTIONS ]
            </span>
            <StretchSnapText
              as="h2"
              level="secondary"
              className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Client Workflow Inquiries
            </StretchSnapText>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-[#0C1017]/80 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#82C8E5] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-base mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Direct Action CTA */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center mb-28">
          <div className="p-12 sm:p-16 rounded-3xl border border-[#82C8E5]/30 bg-gradient-to-b from-[#0C1017]/90 to-[#080B10] shadow-2xl shadow-black/90 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0047AB]/20 via-transparent to-transparent" />
            
            <span className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] block mb-4">
              [ KICK OFF YOUR PROJECT ]
            </span>
            <StretchSnapText
              as="h2"
              level="display"
              className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            >
              Experience the NeoCut <span className="text-[#82C8E5] italic font-normal">precision.</span>
            </StretchSnapText>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Submit your project brief to receive a customized timeline breakdown, script treatment, and production estimate within 24 hours.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <TransitionLink
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#000080] via-[#0047AB] to-[#0055CC] hover:from-[#0047AB] hover:to-[#82C8E5] hover:text-[#06080C] text-white font-bold text-xs uppercase tracking-wider border border-[#82C8E5]/50 shadow-xl shadow-[#0047AB]/40 transition-all duration-300"
              >
                <span>Initiate Production Sprint</span>
                <ArrowUpRight className="w-4 h-4" />
              </TransitionLink>

              <TransitionLink
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all duration-300"
              >
                <span>Review Shipped Works</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </TransitionLink>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
