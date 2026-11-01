'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Send, 
  Film, 
  Calendar, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';

const SERVICE_OPTIONS = [
  'Brand Promotion & Commercial Films',
  'Kids 3D Animation & Musical Series',
  'Cinematic Storytelling & Documentaries',
  '4K Cinematography & Aerial Showcase',
  '3D Scientific & Anatomical Explainers',
  'Other Custom Creative Project',
];

const TIMELINE_OPTIONS = [
  'Urgent Sprint (< 1 Week)',
  'Standard Production (2–3 Weeks)',
  'Comprehensive (1 Month+)',
  'Ongoing Episodic Series',
];

const BUDGET_OPTIONS = [
  'Direct Launch (< $1,000 USD)',
  'Commercial Scale ($1,000 – $3,000 USD)',
  'Enterprise Production ($3,000+ USD)',
  'To Be Determined / Flexible',
];

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);
  
  const [fullName, setFullName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const buildBriefText = () => {
    return `Hello Saif / NeoCut Digital Team,

I would like to initiate a production brief:
• Client Name: ${fullName || 'Not specified'}
• Brand / Studio: ${brandName || 'Not specified'}
• Contact Email: ${email || 'Not specified'}
• Selected Service: ${selectedService}
• Target Timeline: ${selectedTimeline}
• Budget Estimate: ${selectedBudget}

Project Overview:
${projectBrief || 'Looking forward to discussing project details and visual direction.'}`;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const message = buildBriefText();
    const encoded = encodeURIComponent(message);
    setSubmittedStatus('whatsapp');
    window.open(`https://wa.me/8801931245914?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const message = buildBriefText();
    const subject = encodeURIComponent(`[NeoCut Production Brief] ${brandName || fullName || 'New Collaboration'}`);
    const body = encodeURIComponent(message);
    setSubmittedStatus('email');
    window.location.href = `mailto:pixelcraftbysaif@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <SmoothScroll>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen bg-transparent text-[#FFFFFF] selection:bg-[#2563EB] selection:text-[#FFFFFF] overflow-x-hidden pt-28 outline-none"
      >
        <FloatingCapsuleNav />

        {/* 1. Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center" aria-label="Contact Studio Introduction">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5CB2FF]/40 bg-[#0D1B3E]/85 backdrop-blur-md text-[#5CB2FF] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ INITIATE PRODUCTION COLLABORATION ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08] max-w-5xl mx-auto"
          >
            Let&apos;s Build Your <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#5CB2FF] to-[#1D4ED8]">Film.</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-[#DCE6FF] text-base sm:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            Submit your production parameters below for an immediate creative review, or connect directly with our founding director via WhatsApp and email.
          </StretchSnapText>
        </section>

        {/* 2. Main Consultation Form & Direct Studio Channels Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32" aria-label="Consultation Form and Channels">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Interactive Production Brief Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 sm:p-10 bg-[#0D1B3E]/95 border border-[#26407F]/60 shadow-2xl shadow-black/90">
                <div className="flex items-center justify-between pb-6 border-b border-[#162A5C] mb-8">
                  <div>
                    <h2 className="font-editorial text-2xl font-bold text-[#FFFFFF]">
                      Interactive Production Brief Form
                    </h2>
                    <p className="text-xs text-[#DCE6FF] mt-1">
                      Configure your project scope to receive a precise timeline and estimate.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#5CB2FF] px-3 py-1 rounded-full bg-[#050B1F]/70 border border-[#5CB2FF]/40">
                    24h Response SLA
                  </span>
                </div>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  {/* Step 1: Creative Vertical */}
                  <div>
                    <span id="vertical-label" className="text-xs font-mono uppercase tracking-wider text-[#A9B8E0] block mb-3 flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-[#5CB2FF]" />
                      <span>1. Select Creative Vertical</span>
                    </span>
                    <div role="radiogroup" aria-labelledby="vertical-label" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedService(service)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF] ${
                              isSelected
                                ? 'bg-[#1D4ED8] border-[#5CB2FF] text-[#FFFFFF] shadow-md shadow-[#1D4ED8]/30 font-bold'
                                : 'bg-[#050B1F]/70 border-[#26407F]/40 text-[#DCE6FF] hover:text-[#FFFFFF] hover:border-[#5CB2FF]/40 hover:bg-[#122556]'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Target Timeline */}
                  <div>
                    <span id="timeline-label" className="text-xs font-mono uppercase tracking-wider text-[#A9B8E0] block mb-3 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#5CB2FF]" />
                      <span>2. Target Production Timeline</span>
                    </span>
                    <div role="radiogroup" aria-labelledby="timeline-label" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TIMELINE_OPTIONS.map((time) => {
                        const isSelected = selectedTimeline === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedTimeline(time)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF] ${
                              isSelected
                                ? 'bg-[#1D4ED8] border-[#5CB2FF] text-[#FFFFFF] shadow-md shadow-[#1D4ED8]/30 font-bold'
                                : 'bg-[#050B1F]/70 border-[#26407F]/40 text-[#DCE6FF] hover:text-[#FFFFFF] hover:border-[#5CB2FF]/40 hover:bg-[#122556]'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Estimated Budget */}
                  <div>
                    <span id="budget-label" className="text-xs font-mono uppercase tracking-wider text-[#A9B8E0] block mb-3 flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-[#5CB2FF]" />
                      <span>3. Production Budget Range</span>
                    </span>
                    <div role="radiogroup" aria-labelledby="budget-label" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BUDGET_OPTIONS.map((budget) => {
                        const isSelected = selectedBudget === budget;
                        return (
                          <button
                            key={budget}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedBudget(budget)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF] ${
                              isSelected
                                ? 'bg-[#1D4ED8] border-[#5CB2FF] text-[#FFFFFF] shadow-md shadow-[#1D4ED8]/30 font-bold'
                                : 'bg-[#050B1F]/70 border-[#26407F]/40 text-[#DCE6FF] hover:text-[#FFFFFF] hover:border-[#5CB2FF]/40 hover:bg-[#122556]'
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Contact Fields */}
                  <div className="space-y-4 pt-4 border-t border-[#162A5C]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="text-xs font-mono text-[#A9B8E0] block mb-1.5">
                          YOUR NAME / ROLE <span className="text-[#5CB2FF]">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          aria-required="true"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan, Head of Creative"
                          className="w-full px-4 py-3 rounded-xl bg-[#050B1F]/80 border border-[#5A7DD0] text-[#FFFFFF] placeholder-[#A9B8E0]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5CB2FF] focus:border-[#5CB2FF] transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="brandName" className="text-xs font-mono text-[#A9B8E0] block mb-1.5">
                          BRAND / CHANNEL / COMPANY
                        </label>
                        <input
                          id="brandName"
                          name="brandName"
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Apex Dynamics, or YouTube Channel"
                          className="w-full px-4 py-3 rounded-xl bg-[#050B1F]/80 border border-[#5A7DD0] text-[#FFFFFF] placeholder-[#A9B8E0]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5CB2FF] focus:border-[#5CB2FF] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="text-xs font-mono text-[#A9B8E0] block mb-1.5">
                        EMAIL ADDRESS <span className="text-[#5CB2FF]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#050B1F]/80 border border-[#5A7DD0] text-[#FFFFFF] placeholder-[#A9B8E0]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5CB2FF] focus:border-[#5CB2FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectBrief" className="text-xs font-mono text-[#A9B8E0] block mb-1.5">
                        PROJECT SYNOPSIS &amp; DELIVERABLE GOALS
                      </label>
                      <textarea
                        id="projectBrief"
                        name="projectBrief"
                        rows={4}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Tell us about your product, target audience, visual references, or key deliverables needed..."
                        className="w-full px-4 py-3 rounded-xl bg-[#050B1F]/80 border border-[#5A7DD0] text-[#FFFFFF] placeholder-[#A9B8E0]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5CB2FF] focus:border-[#5CB2FF] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Action Buttons */}
                  <div className="pt-6 border-t border-[#162A5C] flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#122556] hover:bg-[#1A3377] border border-[#5CB2FF]/50 text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#1D4ED8]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                    >
                      <MessageSquare className="w-4 h-4 text-[#5CB2FF]" />
                      <span>Launch WhatsApp Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider border border-[#5CB2FF] shadow-xl shadow-[#1D4ED8]/30 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                    >
                      <Mail className="w-4 h-4 text-[#050B1F]" />
                      <span>Send Direct Email Brief</span>
                    </button>
                  </div>

                  {submittedStatus && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="p-3.5 rounded-xl bg-[#1D4ED8]/40 border border-[#5CB2FF]/50 text-[#5CB2FF] text-xs flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#5CB2FF]" />
                      <span>
                        Brief compiled successfully! Opening {submittedStatus === 'whatsapp' ? 'WhatsApp direct messenger' : 'email client'}...
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: Direct Channels, Coordinates & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Channels Cards */}
              <div className="rounded-3xl p-8 bg-[#0D1B3E]/90 border border-[#26407F]/50 shadow-xl shadow-black/80 space-y-6">
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#5CB2FF] block">
                    [ DIRECT STUDIO CHANNELS ]
                  </h2>
                  <p className="text-xs text-[#DCE6FF] mt-1">Connect directly with studio leadership</p>
                </div>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/8801931245914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-[#26407F]/50 bg-[#050B1F]/70 hover:border-[#5CB2FF] hover:bg-[#122556] transition-all duration-300 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/50 border border-[#5CB2FF]/40 flex items-center justify-center text-[#5CB2FF] group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#A9B8E0] uppercase tracking-wider block">
                        Direct WhatsApp (Fastest)
                      </span>
                      <span className="text-[#FFFFFF] font-semibold text-base group-hover:text-[#5CB2FF] transition-colors">
                        +880 1931 245914
                      </span>
                      <span className="text-[11px] text-[#5CB2FF] block mt-0.5">
                        Typical response: &lt; 2 Hours
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#A9B8E0] group-hover:text-[#5CB2FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:pixelcraftbysaif@gmail.com"
                  className="group p-5 rounded-2xl border border-[#26407F]/50 bg-[#050B1F]/70 hover:border-[#5CB2FF] hover:bg-[#122556] transition-all duration-300 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/50 border border-[#5CB2FF]/40 flex items-center justify-center text-[#5CB2FF] group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#A9B8E0] uppercase tracking-wider block">
                        Official Studio Email
                      </span>
                      <span className="text-[#FFFFFF] font-semibold text-sm sm:text-base group-hover:text-[#5CB2FF] transition-colors break-all">
                        pixelcraftbysaif@gmail.com
                      </span>
                      <span className="text-[11px] text-[#A9B8E0] block mt-0.5">
                        Guaranteed 24h brief response
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#A9B8E0] group-hover:text-[#5CB2FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Studio Coordinates & Global Operations */}
              <div className="rounded-3xl p-8 bg-[#0D1B3E]/90 border border-[#26407F]/50 shadow-xl shadow-black/80 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#5CB2FF] block">
                  [ GLOBAL COORDINATES ]
                </span>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Globe className="w-5 h-5 text-[#5CB2FF] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[#FFFFFF] font-semibold text-sm">
                        Studio Headquarters
                      </h3>
                      <p className="text-xs text-[#DCE6FF] mt-1 leading-relaxed">
                        Dhaka, Bangladesh · Operating Worldwide across North America, Europe, MENA, and Asia-Pacific.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#5CB2FF] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[#FFFFFF] font-semibold text-sm">
                        Standard Operating Hours
                      </h3>
                      <p className="text-xs text-[#DCE6FF] mt-1 leading-relaxed">
                        Sunday – Thursday: 09:00 – 19:00 (GMT+6)
                        <br />
                        Urgent express sprints monitored 24/7.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-[#5CB2FF] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[#FFFFFF] font-semibold text-sm">
                        Enterprise Confidentiality
                      </h3>
                      <p className="text-xs text-[#DCE6FF] mt-1 leading-relaxed">
                        Mutual NDAs signed before asset transfer. All source 3D files and brand footage stored in encrypted cloud vaults.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
