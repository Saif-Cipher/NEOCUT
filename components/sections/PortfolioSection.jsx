'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play, Film, Layers } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'brand-promotion', label: 'Brand Promotion' },
  { id: 'kids-animation', label: 'Kids Animation' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'cinematography', label: 'Cinematography' },
  { id: 'explanation-videos', label: 'Explanation Videos' },
];

// 6 Flagship Featured Projects for the Sticky Stacking Presentation
const FEATURED_PROJECTS = [
  {
    assetId: 'hero-1-video',
    title: 'NeoCut Studio Flagship Showreel',
    category: 'cinematography',
    categoryLabel: 'Cinematography / Showcase',
    duration: '30s',
    aspectRatio: '16:9',
    description: 'A master editorial montage showcasing AI-driven particle simulations, hyper-realistic character renders, and commercial product direction.',
    previewUrl: 'https://drive.google.com/file/d/1w_L9Q7pN3s1K4t-8Zz6V5qD2X7y9A3B0/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1p-8aJn_yT6xP4s2Cd5i0bZ4w8r3Y6fN2&sz=w1280',
    number: '01',
  },
  {
    assetId: 'promotion-1-video',
    title: 'AI Messenger Bot E-Commerce Commercial',
    category: 'brand-promotion',
    categoryLabel: 'Brand Promotion',
    duration: '39s',
    aspectRatio: '16:9',
    description: '3D character-led narrative depicting customer inquiry overload, presenting automated AI conversational sales solutions for direct-to-consumer brands.',
    previewUrl: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1fYRBGjQCdgxEfLB4ffa1dLW-g3b0AQfO&sz=w1280',
    number: '02',
  },
  {
    assetId: 'promotion-2-video',
    title: 'TOTOPAC Waterproof Pouch Commercial',
    category: 'brand-promotion',
    categoryLabel: 'Brand Promotion',
    duration: '41s',
    aspectRatio: '16:9',
    description: 'Cinematic sunset beach lifestyle spot highlighting product waterproofing, clear phone responsiveness, and high-frequency wave protection.',
    previewUrl: 'https://drive.google.com/file/d/1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1xGfcPTqvdO6huiuwqycY8ddiezwHQ3jY&sz=w1280',
    number: '03',
  },
  {
    assetId: 'kids-animation-1-video',
    title: 'Counting Numbers 1 to 20 Song',
    category: 'kids-animation',
    categoryLabel: 'Kids Animation',
    duration: '2m 03s',
    aspectRatio: '16:9',
    description: 'Engaging, colorful 3D educational musical animation guiding toddlers and preschool audiences through numerical sequences with animated character companions.',
    previewUrl: 'https://drive.google.com/file/d/17y4tDk4Wl60V9qWwz8R8ZfQn2-3uXf9k/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1H-5xGk_vQ3uM1p9Za2f7yW1t5o0V3cK9&sz=w1280',
    number: '04',
  },
  {
    assetId: 'storytelling-1-video',
    title: 'Student Leadership & Academic Profile',
    category: 'storytelling',
    categoryLabel: 'Storytelling / Profile',
    duration: '2m 39s',
    aspectRatio: '1440:1080',
    description: 'Human-centered documentary narrative exploring leadership, perseverance, and institutional student vision through intimate cinematic framing.',
    previewUrl: 'https://drive.google.com/file/d/1d_qQ38N1K-3bBv2Zz7Xm1_vP4W5x9Y6Z/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1x-7zIm_xS5wO3r1Bc4h9aY3v7q2X5eM1&sz=w1280',
    number: '05',
  },
  {
    assetId: 'explanation-1-video',
    title: '3D Human Spine Anatomy & Health',
    category: 'explanation-videos',
    categoryLabel: 'Explanation Videos',
    duration: '41s',
    aspectRatio: '9:16',
    description: 'Medical-grade 3D anatomical visualization breaking down spinal cord vertebrae compression, disc alignment, and therapeutic physical ergonomics.',
    previewUrl: 'https://drive.google.com/file/d/1w_N8Q4pK2s9L3t-7Zz5W6qC1X8y0A2B9/preview',
    thumbnailUrl: 'https://drive.google.com/thumbnail?id=1m9cztSrwu3aVMWY-5hG9CkY0RwOMj0lw&sz=w1280',
    number: '06',
  },
];

export default function PortfolioSection({ onSelectVideo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const filteredProjects = selectedFilter === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === selectedFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    // Sticky stacking animation inspired by Anubi
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card doesn't need to scale down

        const nextCard = cards[index + 1];

        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Scale down previous card to ~0.94 and subtly dim opacity to 0.75
            gsap.set(card, {
              scale: 1 - progress * 0.06,
              opacity: 1 - progress * 0.25,
              y: progress * -10,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 bg-[#06080C] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Chapter Indicator & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#82C8E5] mb-3">
              <span>[ 03 / FEATURED PRODUCTIONS ]</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
              Selected <span className="text-[#82C8E5] italic font-normal">Portfolio</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                  selectedFilter === cat.id
                    ? 'bg-[#0047AB] text-white border border-[#82C8E5]/50 shadow-lg shadow-[#0047AB]/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div ref={cardsContainerRef} className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.assetId}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="sticky top-28 rounded-3xl border border-white/10 bg-[#0C1017]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl shadow-black/90 overflow-hidden group transition-all duration-300"
              style={{
                zIndex: idx + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Metadata & Narrative */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#82C8E5]">
                        {project.number}
                      </span>
                      <span className="w-6 h-px bg-white/20" />
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight group-hover:text-[#82C8E5] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Specs & Launch CTA */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span>{project.duration}</span>
                      <span>●</span>
                      <span>{project.aspectRatio}</span>
                      <span>●</span>
                      <span className="text-emerald-400 font-semibold">Drive Stream</span>
                    </div>

                    <button
                      onClick={() => onSelectVideo && onSelectVideo(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#06080C] hover:bg-[#82C8E5] font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Film</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: 16:9 Media Showcase Card */}
                <div
                  onClick={() => onSelectVideo && onSelectVideo(project)}
                  className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black/80 border border-white/10 cursor-pointer group/media shadow-xl shadow-black/80"
                >
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                      <Film className="w-12 h-12 mb-2" />
                      <span className="font-mono text-xs uppercase">NeoCut Film</span>
                    </div>
                  )}

                  {/* Hover Overlay with Pulsing Play Button */}
                  <div className="absolute inset-0 bg-black/40 group-hover/media:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#0047AB]/90 border border-[#82C8E5]/50 text-white flex items-center justify-center shadow-2xl group-hover/media:scale-110 group-hover/media:bg-[#82C8E5] group-hover/media:text-[#06080C] transition-all duration-300">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-white">
                    {project.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
