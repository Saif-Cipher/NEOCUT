'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Lightbulb, FileText, Clapperboard, CheckCircle2, ArrowUpRight } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

// Dynamic import for WebGL Three.js Wireframe Torus to eliminate Three.js from eager entry chunk
const WireframeTorus = dynamic(
  () => import('../3d/WireframeTorus'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center gap-3" aria-hidden="true">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#82C8E5]/30 animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#82C8E5]/50">
          Loading 3D Visualizer...
        </span>
      </div>
    ),
  }
);

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Idea',
    phase: 'Conceptualization & Creative Scoping',
    description: 'We deconstruct your core message, audience demographics, and distribution platforms to crystallize a compelling creative thesis and visual treatment.',
    icon: Lightbulb,
    deliverables: ['Creative Brief', 'Moodboards', 'Visual Style References'],
  },
  {
    number: '02',
    title: 'Script & Planning',
    phase: 'Narrative Architecture & Storyboarding',
    description: 'Our team authors dialogue, voiceover, and shot-by-shot storyboards with precise audio-visual pacing and character design specifications.',
    icon: FileText,
    deliverables: ['Production Script', 'Animatic Storyboards', 'Voiceover Casting'],
  },
  {
    number: '03',
    title: 'Production',
    phase: 'AI Modeling, 3D Animation & Cinematography',
    description: 'Where imagination manifests. We harness custom AI generation pipelines, high-end 3D rendering, simulation physics, and cinematic sound design.',
    icon: Clapperboard,
    deliverables: ['3D Asset Rendering', 'Neural Diffusion Assembly', 'Motion Choreography'],
  },
  {
    number: '04',
    title: 'Final Delivery',
    phase: 'Multi-Platform Mastering & Delivery',
    description: 'Precision color grading, audio normalization, and multi-format exports tailored for broadcast, web, and viral mobile feeds (9:16, 16:9, 1:1).',
    icon: CheckCircle2,
    deliverables: ['4K Master Files', 'Social Cuts & Hooks', 'Drive Archive Access'],
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-28 sm:py-36 px-4 bg-transparent border-t border-white/5 overflow-hidden"
      aria-label="Creative Process Overview"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#000080]/20 rounded-full blur-[140px]" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16">
          <StretchSnapText
            as="h2"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none"
          >
            Creative <span className="text-[#82C8E5] italic font-normal">Process</span>
          </StretchSnapText>
          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-400 max-w-xl text-sm sm:text-base mt-4 leading-relaxed"
          >
            Our disciplined four-stage pipeline transforms raw concepts into market-defining digital cinema.
          </StretchSnapText>
        </div>

        {/* Process Layout: Left interactive timeline + Right interactive 3D Wireframe Torus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 4 Steps Accordion / Chapters */}
          <div className="lg:col-span-7 space-y-4" role="tablist" aria-label="Process Steps">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-expanded={isActive}
                  onClick={() => setActiveStep(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(idx);
                    }
                  }}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82C8E5] ${
                    isActive
                      ? 'bg-[#0E131E] border-[#82C8E5]/50 shadow-xl shadow-[#0047AB]/20 scale-[1.01]'
                      : 'bg-[#080B10] border-white/5 hover:border-white/15 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Number Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-sm font-bold transition-colors ${
                        isActive
                          ? 'bg-[#0047AB] border-[#82C8E5] text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Title & Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <StretchSnapText as="h3" level="secondary" className="font-editorial text-2xl font-bold text-white">
                          {step.title}
                        </StretchSnapText>
                        <span className="text-[11px] font-mono text-[#82C8E5] uppercase tracking-wider">
                          {step.phase}
                        </span>
                      </div>

                      <StretchSnapText as="p" level="subtle" split="words" className="text-slate-400 text-sm mt-2 leading-relaxed">
                        {step.description}
                      </StretchSnapText>

                      {/* Deliverables tags on active */}
                      {isActive && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10 animate-in fade-in duration-300">
                          {step.deliverables.map((del) => (
                            <span
                              key={del}
                              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                            >
                              ✓ {del}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Three.js Interactive Wireframe Torus Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <WireframeTorus />
          </div>
        </div>

        {/* Section Bottom CTA to Dedicated Process Route */}
        <div className="mt-16 text-center">
          <TransitionLink
            href="/process"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 hover:border-[#82C8E5]/50 transition-all duration-300 shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82C8E5]"
          >
            <StretchSnapText as="span" level="subtle" split="words" interactive>
              Explore Our Process
            </StretchSnapText>
            <ArrowUpRight className="w-4 h-4 text-[#82C8E5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
