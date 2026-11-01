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
    window.open(`https://wa.me/8801931245914?text=${encoded}`, '_blank');
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
      <div className="relative min-h-screen bg-transparent text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden pt-28">
        <FloatingCapsuleNav />

        {/* 1. Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-16 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ INITIATE PRODUCTION COLLABORATION ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl mx-auto"
          >
            Let&apos;s Build Your <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#82C8E5] to-[#0047AB]">Film.</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            Submit your production parameters below for an immediate creative review, or connect directly with our founding director via WhatsApp and email.
          </StretchSnapText>
        </section>

        {/* 2. Main Consultation Form & Direct Studio Channels Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Interactive Production Brief Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 sm:p-10 bg-[#0C1017]/95 border border-white/10 shadow-2xl shadow-black/90">
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-white">
                      Production Brief Form
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Configure your project scope to receive a precise timeline and estimate.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#82C8E5] px-3 py-1 rounded-full bg-[#0047AB]/20 border border-[#82C8E5]/30">
                    24h Response SLA
                  </span>
                </div>

                <form className="space-y-8">
                  {/* Step 1: Creative Vertical */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-[#82C8E5]" />
                      <span>1. Select Creative Vertical</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0047AB]/30 border-[#82C8E5] text-white shadow-md shadow-[#0047AB]/20'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
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
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#82C8E5]" />
                      <span>2. Target Production Timeline</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TIMELINE_OPTIONS.map((time) => {
                        const isSelected = selectedTimeline === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTimeline(time)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0047AB]/30 border-[#82C8E5] text-white shadow-md shadow-[#0047AB]/20'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
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
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-[#82C8E5]" />
                      <span>3. Production Budget Range</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BUDGET_OPTIONS.map((budget) => {
                        const isSelected = selectedBudget === budget;
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#0047AB]/30 border-[#82C8E5] text-white shadow-md shadow-[#0047AB]/20'
                                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Contact Fields */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1.5">
                          YOUR NAME / ROLE *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Morgan, Head of Creative"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#82C8E5] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1.5">
                          BRAND / CHANNEL / COMPANY
                        </label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Apex Dynamics, or YouTube Channel"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#82C8E5] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#82C8E5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5">
                        PROJECT SYNOPSIS &amp; DELIVERABLE GOALS
                      </label>
                      <textarea
                        rows={4}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Tell us about your product, target audience, visual references, or key deliverables needed..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#82C8E5] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Action Buttons */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-900/40 active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Launch WhatsApp Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-gradient-to-r from-[#000080] via-[#0047AB] to-[#0055CC] hover:from-[#0047AB] hover:to-[#82C8E5] hover:text-[#06080C] text-white font-bold text-xs uppercase tracking-wider border border-[#82C8E5]/50 shadow-xl shadow-[#0047AB]/40 transition-all duration-300 active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email Brief</span>
                    </button>
                  </div>

                  {submittedStatus && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
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
              <div className="rounded-3xl p-8 bg-[#0C1017]/90 border border-white/10 shadow-xl shadow-black/80 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] block">
                  [ DIRECT STUDIO CHANNELS ]
                </span>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/8801931245914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Direct WhatsApp (Fastest)
                      </span>
                      <span className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors">
                        +880 1931 245914
                      </span>
                      <span className="text-[11px] text-emerald-400/80 block mt-0.5">
                        Typical response: &lt; 2 Hours
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                {/* Email Card */}
                <a
                  href="mailto:pixelcraftbysaif@gmail.com"
                  className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#82C8E5]/50 hover:bg-[#0047AB]/10 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0047AB]/20 border border-[#82C8E5]/30 flex items-center justify-center text-[#82C8E5] group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Official Studio Email
                      </span>
                      <span className="text-white font-semibold text-base group-hover:text-[#82C8E5] transition-colors break-all">
                        pixelcraftbysaif@gmail.com
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Detailed proposals &amp; NDAs
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#82C8E5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              {/* Studio Coordinates Card */}
              <div className="rounded-3xl p-8 bg-[#0C1017]/90 border border-white/10 shadow-xl shadow-black/80 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#82C8E5] block">
                  [ GLOBAL COORDINATES ]
                </span>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#82C8E5] shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      Studio Headquarters
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Dhaka, Bangladesh — Operating 24/7 with a global client roster across North America, Europe, and the Middle East.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#82C8E5] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      Standard Operating Hours
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      GMT+6 timezone. Real-time Slack, WhatsApp, and asynchronous Loom communications available during client business hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0C1017] to-[#000080]/20 border border-[#82C8E5]/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#82C8E5] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The NeoCut Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every consultation is strictly confidential. If we determine our studio is not the optimal fit for your project scope, we will provide honest alternative recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
