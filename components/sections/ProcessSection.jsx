'use client';

import { useState } from 'react';
import { Lightbulb, FileText, Clapperboard, CheckCircle2 } from 'lucide-react';
import WireframeTorus from '../3d/WireframeTorus';

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
      className="relative py-28 sm:py-36 px-4 bg-[#06080C] border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#000080]/20 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#82C8E5] mb-3">
            <span>[ 05 / METHODOLOGY ]</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
            Creative <span className="text-[#82C8E5] italic font-normal">Process</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-4 leading-relaxed">
            Our disciplined four-stage pipeline transforms raw concepts into market-defining digital cinema.
          </p>
        </div>

        {/* Process Layout: Left interactive timeline + Right interactive 3D Wireframe Torus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 4 Steps Accordion / Chapters */}
          <div className="lg:col-span-7 space-y-4">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${
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
                        <h4 className="font-editorial text-2xl font-bold text-white">
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-mono text-[#82C8E5] uppercase tracking-wider">
                          {step.phase}
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                        {step.description}
                      </p>

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
      </div>
    </section>
  );
}
