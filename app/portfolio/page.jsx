'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, Film, Play, ExternalLink, Sparkles } from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';

export default function PortfolioPage() {
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-transparent text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden pt-28">
        <FloatingCapsuleNav />

        {/* Dedicated Page Hero Intro */}
        <section className="relative px-4 pt-12 pb-4 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ ARCHIVE & FEATURED RELEASES ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Selected <span className="text-[#82C8E5] italic font-normal">Productions</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Explore our curated gallery of commercial brand spots, 3D character narratives, preschool musical series, and viral medical visualizations.
          </StretchSnapText>
        </section>

        {/* Core Portfolio Section */}
        <PortfolioSection onSelectVideo={(item) => setActiveModalVideo(item)} />

        {/* Contact CTA */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Cinematic Video Modal Player */}
        {activeModalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${activeModalVideo.name || activeModalVideo.title}`}
            onClick={() => setActiveModalVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-[#0C1017] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/50">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#82C8E5]">
                    {activeModalVideo.category || activeModalVideo.categoryLabel}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-tight mt-0.5">
                    {activeModalVideo.title || activeModalVideo.name?.replace('-video.mp4', '').replace(/-/g, ' ')}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {(activeModalVideo.webViewLink || activeModalVideo.previewUrl) && (
                    <a
                      href={activeModalVideo.webViewLink || activeModalVideo.previewUrl?.replace('/preview', '/view?usp=drivesdk')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                      title="Open directly in Google Drive"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#82C8E5]" />
                      <span className="hidden sm:inline">Drive Cloud</span>
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalVideo(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Iframe Video Embed Player */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500 pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#82C8E5] animate-spin" />
                  <span className="font-mono text-xs tracking-wider uppercase text-slate-400">
                    Connecting to Google Drive Stream...
                  </span>
                </div>

                <iframe
                  src={
                    activeModalVideo.previewUrl ||
                    (activeModalVideo.driveFileId
                      ? `https://drive.google.com/file/d/${activeModalVideo.driveFileId}/preview`
                      : '')
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  className="w-full h-full border-0 relative z-10"
                  title={activeModalVideo.title || activeModalVideo.name}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/50 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Streamed via verified Google Drive preview player</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-slate-400">
                  <span>{activeModalVideo.aspectRatio || '16:9'}</span>
                  <span>●</span>
                  <span>{activeModalVideo.duration || 'Full Film'}</span>
                  <span>●</span>
                  <a
                    href={activeModalVideo.webViewLink || activeModalVideo.previewUrl?.replace('/preview', '/view?usp=drivesdk')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#82C8E5] hover:underline inline-flex items-center gap-1"
                  >
                    Open in Drive
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
