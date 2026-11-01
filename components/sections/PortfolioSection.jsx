'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Film, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'brand-promotion', label: 'Brand Promotion' },
  { id: 'kids-animation', label: 'Kids Animation' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'cinematography', label: 'Cinematography' },
  { id: 'explanation-videos', label: 'Explanation Videos' },
];

// 6 Flagship Featured Projects for the Scroll-Driven Image Stretch Transition
const FEATURED_PROJECTS = [
  {
    assetId: 'hero-1-video',
    title: 'NeoCut Studio Flagship Showreel',
    category: 'cinematography',
    categoryLabel: 'Cinematography / Showcase',
    duration: '30s',
    aspectRatio: '16:9',
    description: 'A master editorial montage showcasing AI-driven particle simulations, hyper-realistic character renders, and commercial product direction.',
    driveFileId: '1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1',
    previewUrl: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/preview',
    webViewLink: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
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
    driveFileId: '1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr',
    previewUrl: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/preview',
    webViewLink: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp',
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
    driveFileId: '1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz',
    previewUrl: 'https://drive.google.com/file/d/1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz/preview',
    webViewLink: 'https://drive.google.com/file/d/1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-2-thumbnail.webp',
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
    driveFileId: '11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI',
    previewUrl: 'https://drive.google.com/file/d/11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI/preview',
    webViewLink: 'https://drive.google.com/file/d/11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-1-ref.jpg',
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
    driveFileId: '1G82iCKZPVUXzAj35shDSy07CDcfMgo4C',
    previewUrl: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/preview',
    webViewLink: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-1-ref.jpg',
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
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    previewUrl: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/preview',
    webViewLink: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-1-ref.jpg',
    number: '06',
  },
];

export default function PortfolioSection({ onSelectVideo }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const imageLayersRef = useRef([]);
  const imageInnersRef = useRef([]);

  const filteredProjects = selectedFilter === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === selectedFilter);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || FEATURED_PROJECTS[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const count = filteredProjects.length;
    if (count <= 1 || !sectionRef.current || !stageRef.current) return;

    // Reset initial layer states
    imageLayersRef.current.forEach((layer, idx) => {
      if (!layer) return;
      if (idx === 0) {
        gsap.set(layer, { opacity: 1, zIndex: 10, clipPath: 'inset(0% 0% 0% 0%)' });
      } else {
        gsap.set(layer, { opacity: 0, zIndex: 1, clipPath: 'inset(0% 0% 0% 100%)' });
      }
    });

    imageInnersRef.current.forEach((inner) => {
      if (!inner) return;
      gsap.set(inner, { scaleX: 1, scaleY: 1, xPercent: 0, filter: 'blur(0px)' });
    });

    const isMob = window.innerWidth < 768;
    const isTab = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Calibrated elastic stretch factors inspired by Jitter Image Stretch Transition
    const stretchX = prefersReduced ? 1.0 : isMob ? 1.15 : isTab ? 1.25 : 1.38;
    const squashY = prefersReduced ? 1.0 : isMob ? 0.94 : isTab ? 0.88 : 0.82;
    const pullX = prefersReduced ? 0 : -22;
    const blurVal = prefersReduced ? 'blur(0px)' : isMob ? 'blur(0px)' : 'blur(2.5px)';

    // Scroll distance proportional to project count
    const scrollDistance = (count - 1) * (isMob ? 550 : 700);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'portfolio-stretch-trigger',
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: stageRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(Math.floor(p * count), count - 1);
            setActiveIndex(idx);
          },
        },
      });

      // Construct sequential scroll-driven stretch transitions between consecutive project thumbnails
      for (let i = 0; i < count - 1; i++) {
        const outgoingLayer = imageLayersRef.current[i];
        const outgoingInner = imageInnersRef.current[i];
        const incomingLayer = imageLayersRef.current[i + 1];
        const incomingInner = imageInnersRef.current[i + 1];

        if (!outgoingLayer || !incomingLayer) continue;

        const stepTime = i * 1.0;

        // 1. Outgoing thumbnail: stretches horizontally, squashes vertically, and pulls left
        tl.to(
          outgoingInner,
          {
            scaleX: stretchX,
            scaleY: squashY,
            xPercent: pullX,
            filter: blurVal,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          stepTime + 0.2
        );

        tl.to(
          outgoingLayer,
          {
            opacity: 0,
            duration: 0.35,
            ease: 'power1.in',
          },
          stepTime + 0.45
        );

        // 2. Incoming thumbnail: reveals through clipping mask, starting stretched and settling into natural 1:1 proportions
        tl.set(
          incomingLayer,
          {
            opacity: 1,
            zIndex: 10 + i + 1,
            clipPath: 'inset(0% 0% 0% 100%)',
          },
          stepTime + 0.2
        );

        tl.set(
          incomingInner,
          {
            scaleX: stretchX,
            scaleY: squashY,
            xPercent: Math.abs(pullX),
            filter: blurVal,
          },
          stepTime + 0.2
        );

        tl.to(
          incomingLayer,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          stepTime + 0.2
        );

        tl.to(
          incomingInner,
          {
            scaleX: 1,
            scaleY: 1,
            xPercent: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
          },
          stepTime + 0.2
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-transparent border-t border-white/5"
    >
      {/* Pinned Sticky Visual Stage for Scroll-Driven Image Stretch Transition */}
      <div
        ref={stageRef}
        className="min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header with Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-4">
            <div>
              <StretchSnapText
                as="h2"
                level="display"
                className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none"
              >
                Selected <span className="text-[#82C8E5] italic font-normal">Portfolio</span>
              </StretchSnapText>
            </div>

            {/* Category Filter Pills & All Projects Route CTA */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <div className="flex items-center gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedFilter(cat.id);
                      setActiveIndex(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                      selectedFilter === cat.id
                        ? 'bg-[#0047AB] text-white border border-[#82C8E5]/50 shadow-lg shadow-[#0047AB]/30'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <StretchSnapText as="span" level="subtle" split="words" interactive>
                      {cat.label}
                    </StretchSnapText>
                  </button>
                ))}
              </div>

              <TransitionLink
                href="/portfolio"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#000080]/60 hover:bg-[#0047AB] text-white font-semibold text-xs tracking-wider border border-[#82C8E5]/40 transition-all duration-300 whitespace-nowrap shadow-lg shadow-[#000080]/30 group"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#82C8E5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </TransitionLink>
            </div>
          </div>

          {/* Master Two-Column Pinned Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Synchronized Project Metadata & Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div
                key={activeProject.assetId}
                className="flex flex-col justify-between space-y-5 animate-in fade-in duration-300"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#82C8E5]">
                      {activeProject.number} / {String(filteredProjects.length).padStart(2, '0')}
                    </span>
                    <span className="w-6 h-px bg-white/20" />
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      {activeProject.categoryLabel}
                    </span>
                  </div>

                  <StretchSnapText
                    as="h3"
                    level="secondary"
                    className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight transition-colors"
                  >
                    {activeProject.title}
                  </StretchSnapText>

                  <StretchSnapText
                    as="p"
                    level="subtle"
                    split="words"
                    className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed line-clamp-3 sm:line-clamp-none"
                  >
                    {activeProject.description}
                  </StretchSnapText>
                </div>

                {/* Specs & Launch CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>{activeProject.duration}</span>
                    <span>●</span>
                    <span>{activeProject.aspectRatio}</span>
                    <span>●</span>
                    <span className="text-emerald-400 font-semibold">Drive Stream</span>
                  </div>

                  <button
                    onClick={() => onSelectVideo && onSelectVideo(activeProject)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#06080C] hover:bg-[#82C8E5] font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xl shadow-white/10"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <StretchSnapText as="span" level="subtle" split="words" interactive>
                      Play Film
                    </StretchSnapText>
                  </button>
                </div>

                {/* Interactive Project Scrub Indicator Track */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-2">
                    SCROLL TRANSITION:
                  </span>
                  {filteredProjects.map((p, idx) => (
                    <button
                      key={p.assetId}
                      onClick={() => {
                        const st = ScrollTrigger.getById('portfolio-stretch-trigger');
                        if (st && filteredProjects.length > 1) {
                          const target =
                            st.start +
                            (idx / (filteredProjects.length - 1)) *
                              ((filteredProjects.length - 1) * 700);
                          window.scrollTo({ top: target, behavior: 'smooth' });
                        }
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === idx
                          ? 'w-8 bg-[#82C8E5] shadow-sm shadow-[#82C8E5]/50'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Jump to project ${p.number}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Jitter-Inspired Image Stretch Transition Showcase Frame */}
            <div
              onClick={() => onSelectVideo && onSelectVideo(activeProject)}
              className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black/95 border border-white/15 cursor-pointer group/media shadow-2xl shadow-black/90"
              style={{ perspective: 1200 }}
            >
              {/* Stacked Project Image Layers for Seamless Scroll Stretch Transition */}
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.assetId}
                  ref={(el) => (imageLayersRef.current[idx] = el)}
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{
                    zIndex: idx === 0 ? 10 : 1,
                    opacity: idx === 0 ? 1 : 0,
                    clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
                  }}
                >
                  <div
                    ref={(el) => (imageInnersRef.current[idx] = el)}
                    className="w-full h-full transform-gpu will-change-transform"
                    style={{ transformOrigin: '50% 50%' }}
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title || 'NeoCut Production Film'}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Hover Overlay with Pulsing Play Button */}
              <div className="absolute inset-0 z-30 bg-black/30 group-hover/media:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#0047AB]/90 border border-[#82C8E5]/50 text-white flex items-center justify-center shadow-2xl group-hover/media:scale-110 group-hover/media:bg-[#82C8E5] group-hover/media:text-[#06080C] transition-all duration-300">
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </div>
              </div>

              {/* Active Project Tag & Info Pill */}
              <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2 pointer-events-none max-w-[70%] truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="font-bold text-[#82C8E5]">{activeProject.number}</span>
                <span className="text-slate-400">|</span>
                <span className="truncate">{activeProject.title}</span>
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-white pointer-events-none">
                {activeProject.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
