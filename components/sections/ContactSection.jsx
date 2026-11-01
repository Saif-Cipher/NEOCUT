'use client';

import { ArrowUpRight, MessageSquare, Mail, Phone, Sparkles } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 sm:py-44 px-4 bg-transparent border-t border-white/5 overflow-hidden"
    >
      {/* Background glowing sphere */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#000080]/30 via-[#0047AB]/25 to-transparent blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Subhead Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>[ 06 / START PRODUCTION ]</span>
        </div>

        {/* Original Headline in Big Editorial Typography with Stretch Snap Kinetics */}
        <StretchSnapText
          as="h2"
          level="display"
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl"
        >
          Let’s Create Something{' '}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#82C8E5] to-[#0047AB]">
            Cinematic.
          </span>
        </StretchSnapText>

        <StretchSnapText
          as="p"
          level="subtle"
          split="words"
          className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed"
        >
          Ready to elevate your brand with world-class AI video production and high-impact storytelling? Connect directly with our creative team.
        </StretchSnapText>

        {/* Contact Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mt-12">
          {/* WhatsApp Direct Connect */}
          <a
            href="https://wa.me/8801931245914"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl border border-white/10 bg-[#0C1017]/90 hover:border-[#82C8E5]/60 hover:bg-[#0E1422] transition-all duration-300 flex items-center justify-between text-left shadow-xl shadow-black/80"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Direct WhatsApp
                </span>
                <span className="text-white font-semibold text-sm sm:text-base group-hover:text-[#82C8E5] transition-colors">
                  +880 1931 245914
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#82C8E5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Email Connect */}
          <a
            href="mailto:pixelcraftbysaif@gmail.com"
            className="group p-6 rounded-3xl border border-white/10 bg-[#0C1017]/90 hover:border-[#82C8E5]/60 hover:bg-[#0E1422] transition-all duration-300 flex items-center justify-between text-left shadow-xl shadow-black/80"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0047AB]/20 border border-[#82C8E5]/30 flex items-center justify-center text-[#82C8E5] group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Official Email
                </span>
                <span className="text-white font-semibold text-sm sm:text-base group-hover:text-[#82C8E5] transition-colors">
                  pixelcraftbysaif@gmail.com
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#82C8E5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Action CTAs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#000080] via-[#0047AB] to-[#0055CC] hover:from-[#0047AB] hover:to-[#82C8E5] hover:text-[#06080C] text-white font-bold text-sm uppercase tracking-wider border border-[#82C8E5]/50 shadow-2xl shadow-[#0047AB]/40 transition-all duration-300 active:scale-95"
          >
            <StretchSnapText as="span" level="subtle" split="words" interactive>
              Contact Us
            </StretchSnapText>
            <ArrowUpRight className="w-5 h-5 text-[#82C8E5] group-hover:text-[#06080C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </TransitionLink>

          <a
            href="https://wa.me/8801931245914"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm uppercase tracking-wider border border-white/10 hover:border-[#82C8E5]/50 transition-all duration-300"
          >
            <span>WhatsApp Direct</span>
            <ArrowUpRight className="w-4 h-4 text-[#82C8E5]" />
          </a>
        </div>
      </div>
    </section>
  );
}
