'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { X, ShieldCheck, Film, Play, ExternalLink } from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';

// Dynamic import for WebGL Three.js Particle Typography to drop ~140KB gzip from initial critical bundle
const ParticleTypography = dynamic(
  () => import('@/components/3d/ParticleTypography'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[280px] sm:h-[320px] flex flex-col items-center justify-center gap-3" aria-hidden="true">
        <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#5CB2FF] animate-spin" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#5CB2FF]/70">
          Loading Particle Engine...
        </span>
      </div>
    ),
  }
);

export default function HomePage() {
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const triggerElementRef = useRef(null);
  const modalCloseBtnRef = useRef(null);

  const handleOpenModal = (video, triggerEl) => {
    triggerElementRef.current = triggerEl || document.activeElement;
    setActiveModalVideo(video);
  };

  const handleCloseModal = () => {
    setActiveModalVideo(null);
    if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
      setTimeout(() => triggerElementRef.current.focus(), 50);
    }
  };

  // Accessible Modal Keyboard Management (Escape dismiss & initial focus placement)
  useEffect(() => {
    if (!activeModalVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      if (modalCloseBtnRef.current) {
        modalCloseBtnRef.current.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [activeModalVideo]);

  return (
    <SmoothScroll>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen bg-transparent text-[#FFFFFF] selection:bg-[#2563EB] selection:text-[#FFFFFF] overflow-x-hidden outline-none"
      >
        {/* Floating Capsule Navigation Bar */}
        <FloatingCapsuleNav />

        {/* Section 01: Hero with 3D Orbit */}
        <HeroSection />

        {/* Section 02: Services Preview */}
        <ServicesSection />

        {/* Section 03: Portfolio Preview */}
        <PortfolioSection onSelectVideo={(item) => handleOpenModal(item)} />

        {/* Section 04: About Preview */}
        <AboutSection />

        {/* Section 05: Creative Process with Interactive 3D Wireframe Torus */}
        <ProcessSection />

        {/* Anubi-Inspired WebGL Interactive Particle Typography Interlude */}
        <section className="py-12 bg-transparent border-t border-[#162A5C] relative overflow-hidden text-center" aria-label="WebGL Particle Visualizer">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5CB2FF] block mb-2 font-semibold">
              [ WEBGL SENSORY CRAFT ]
            </span>
            <ParticleTypography />
            <StretchSnapText as="p" level="subtle" split="words" className="text-xs font-mono text-[#DCE6FF] mt-2">
              Move cursor over particles to interact with neural point-cloud repulsion.
            </StretchSnapText>
          </div>
        </section>

        {/* Section 06: Contact CTA */}
        <ContactSection />

        {/* Section 07: Footer */}
        <Footer />

        {/* Cinematic Video Modal Player */}
        {activeModalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#030716]/90 backdrop-blur-xl animate-in fade-in duration-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${activeModalVideo.name || activeModalVideo.title}`}
            onClick={handleCloseModal}
          >
            <div
              className="relative w-full max-w-4xl bg-[#0D1B3E] border border-[#26407F]/60 rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#162A5C] flex items-center justify-between bg-[#050B1F]/60">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5CB2FF]">
                    {activeModalVideo.category || activeModalVideo.categoryLabel}
                  </span>
                  <h3 className="text-base font-semibold text-[#FFFFFF] leading-tight mt-0.5">
                    {activeModalVideo.title || activeModalVideo.name?.replace('-video.mp4', '').replace(/-/g, ' ')}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {(activeModalVideo.webViewLink || activeModalVideo.previewUrl) && (
                    <a
                      href={activeModalVideo.webViewLink || activeModalVideo.previewUrl?.replace('/preview', '/view?usp=drivesdk')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050B1F]/70 hover:bg-[#122556] text-[#DCE6FF] hover:text-[#FFFFFF] text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                      title="Open directly in Google Drive"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#5CB2FF]" />
                      <span className="hidden sm:inline">Drive Cloud</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  <button
                    ref={modalCloseBtnRef}
                    onClick={handleCloseModal}
                    className="w-9 h-9 rounded-full bg-[#050B1F]/70 hover:bg-[#122556] text-[#FFFFFF] flex items-center justify-center transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                    aria-label="Close modal dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Iframe Video Embed Player (Official Google Drive Streaming) */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {/* Background Loading Spinner */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#A9B8E0] pointer-events-none">
                  <div className="w-8 h-8 rounded-full border-2 border-[#26407F] border-t-[#5CB2FF] animate-spin" />
                  <span className="font-mono text-xs tracking-wider uppercase text-[#DCE6FF]">
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
              <div className="p-4 bg-[#050B1F]/60 border-t border-[#162A5C] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#A9B8E0] gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Streamed via verified Google Drive preview player</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[#DCE6FF]">
                  <span>{activeModalVideo.aspectRatio || '16:9'}</span>
                  <span>●</span>
                  <span>{activeModalVideo.duration || 'Full Film'}</span>
                  <span>●</span>
                  <a
                    href={activeModalVideo.webViewLink || activeModalVideo.previewUrl?.replace('/preview', '/view?usp=drivesdk')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5CB2FF] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CB2FF]"
                  >
                    Open in Drive
                    <ExternalLink className="w-3 h-3" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SmoothScroll>
  );
}
