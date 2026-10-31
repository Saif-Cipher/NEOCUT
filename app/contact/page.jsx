'use client';

import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';
import { Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-transparent text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden pt-28">
        <FloatingCapsuleNav />

        {/* Dedicated Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-4 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ INITIATE COLLABORATION ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Let&apos;s Build Your <span className="text-[#82C8E5] italic font-normal">Film</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Direct studio communication via WhatsApp, high-priority email inquiry, and executive director consultations.
          </StretchSnapText>
        </section>

        {/* Core Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
