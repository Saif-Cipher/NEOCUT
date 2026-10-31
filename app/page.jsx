'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, Film, Play } from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ParticleTypography from '@/components/3d/ParticleTypography';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
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
      <div className="relative min-h-screen bg-[#06080C] text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden">
        {/* Floating Capsule Navigation Bar */}
        <FloatingCapsuleNav />

        {/* Section 01: Hero with 3D Orbit */}
        <HeroSection />

        {/* Section 02: Services Preview */}
        <ServicesSection />

        {/* Section 03: Portfolio Preview (Sticky Card Stacking via GSAP ScrollTrigger) */}
        <PortfolioSection onSelectVideo={(item) => setActiveModalVideo(item)} />

        {/* Section 04: About Preview */}
        <AboutSection />

        {/* Section 05: Creative Process with Interactive 3D Wireframe Torus */}
        <ProcessSection />

        {/* Anubi-Inspired WebGL Interactive Particle Typography Interlude */}
        <section className="py-12 bg-[#06080C] border-t border-white/5 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#82C8E5] block mb-2">
              [ WEBGL SENSORY CRAFT ]
            </span>
            <ParticleTypography />
            <p className="text-xs font-mono text-slate-500 mt-2">
              Move cursor over particles to interact with neural point-cloud repulsion.
            </p>
          </div>
        </section>

        {/* Section 06: Contact CTA */}
        <ContactSection />

        {/* Section 07: Footer */}
        <Footer />

        {/* Cinematic Video Modal Player */}
        {activeModalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={`Playing ${activeModalVideo.name || activeModalVideo.title}`}
          >
            <div className="relative w-full max-w-4xl bg-[#0C1017] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col">
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
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Iframe Video Embed Player (Official Google Drive Streaming) */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <iframe
                  src={activeModalVideo.previewUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full border-0"
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
