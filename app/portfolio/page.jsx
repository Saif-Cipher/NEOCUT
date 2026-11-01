'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, Film, Play, ExternalLink, Sparkles, Filter, Layers, Clock } from 'lucide-react';
import SmoothScroll from '@/components/motion/SmoothScroll';
import FloatingCapsuleNav from '@/components/layout/FloatingCapsuleNav';
import Footer from '@/components/layout/Footer';
import StretchSnapText from '@/components/motion/StretchSnapText';
import { TransitionLink } from '@/components/motion/TransitionProvider';

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'brand-promotion', label: 'Brand Promotion' },
  { id: 'kids-animation', label: 'Kids Animation' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'cinematography', label: 'Cinematography' },
  { id: 'explanation-videos', label: 'Explanation Videos' },
];

// Initial Core Approved Projects (Loaded with local static thumbnails & verified Drive IDs)
const ALL_PORTFOLIO_PROJECTS = [
  {
    assetId: 'hero-1-video',
    title: 'NeoCut Studio Flagship Showreel',
    category: 'cinematography',
    categoryLabel: 'Cinematography',
    duration: '30s',
    aspectRatio: '16:9',
    description: 'A master editorial montage showcasing AI-driven particle simulations, hyper-realistic character renders, and commercial product direction.',
    driveFileId: '1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1',
    previewUrl: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/preview',
    webViewLink: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
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
  },
  {
    assetId: 'kids-animation-2-video',
    title: 'Alero Kids Nursery Rhymes Compilation',
    category: 'kids-animation',
    categoryLabel: 'Kids Animation',
    duration: '3m 15s',
    aspectRatio: '16:9',
    description: 'Full-length 3D animated musical nursery rhymes compilation featuring the Alero Kids character ensemble.',
    driveFileId: '1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH',
    previewUrl: 'https://drive.google.com/file/d/1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH/preview',
    webViewLink: 'https://drive.google.com/file/d/1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-2-ref.jpg',
  },
  {
    assetId: 'kids-animation-3-video',
    title: "Benny the Bunny's Outdoor Adventure",
    category: 'kids-animation',
    categoryLabel: 'Kids Animation',
    duration: '1m 45s',
    aspectRatio: '16:9',
    description: "3D cartoon children's story following Benny the Bunny on an outdoor learning and play adventure.",
    driveFileId: '1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU',
    previewUrl: 'https://drive.google.com/file/d/1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU/preview',
    webViewLink: 'https://drive.google.com/file/d/1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-3-ref.jpg',
  },
  {
    assetId: 'storytelling-1-video',
    title: 'Hamid Candidate Leadership Manifesto',
    category: 'storytelling',
    categoryLabel: 'Storytelling',
    duration: '2m 39s',
    aspectRatio: '1440:1080',
    description: 'Human-centered documentary narrative exploring leadership, student election vision, and institutional reform.',
    driveFileId: '1G82iCKZPVUXzAj35shDSy07CDcfMgo4C',
    previewUrl: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/preview',
    webViewLink: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-1-ref.jpg',
  },
  {
    assetId: 'cinematography-1-video',
    title: 'Agricultural Paddy & Hillside Documentary',
    category: 'cinematography',
    categoryLabel: 'Cinematography',
    duration: '3m 47s',
    aspectRatio: '16:9',
    description: 'Cinematic outdoor documentary profile of Sazzad in lush green agricultural paddy fields and hillside landscapes.',
    driveFileId: '1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne',
    previewUrl: 'https://drive.google.com/file/d/1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne/preview',
    webViewLink: 'https://drive.google.com/file/d/1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/cinematography/references/cinematography-1-ref.jpg',
  },
  {
    assetId: 'storytelling-2-video',
    title: 'Student Voices & Campus Election Street Poll',
    category: 'storytelling',
    categoryLabel: 'Storytelling',
    duration: '2m 13s',
    aspectRatio: '9:16',
    description: 'Vertical documentary street interview with student voters at Begum Khaleda Zia Hall for Chaksu 2025 election.',
    driveFileId: '1U6uaGajHeRsecmfIpogNg2nUlA86uQYp',
    previewUrl: 'https://drive.google.com/file/d/1U6uaGajHeRsecmfIpogNg2nUlA86uQYp/preview',
    webViewLink: 'https://drive.google.com/file/d/1U6uaGajHeRsecmfIpogNg2nUlA86uQYp/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-2-ref.jpg',
  },
  {
    assetId: 'explanation-1-video',
    title: 'Tick Hypostome Parasitic Skin Embedding',
    category: 'explanation-videos',
    categoryLabel: 'Explanation Videos',
    duration: '41s',
    aspectRatio: '9:16',
    description: '3D microscopic medical animation demonstrating how a tick embeds its hypostome mouthparts into human skin.',
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    previewUrl: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/preview',
    webViewLink: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-1-ref.jpg',
  },
  {
    assetId: 'explanation-2-video',
    title: 'Diaphragm Muscle Spasm & Hiccup Reflex',
    category: 'explanation-videos',
    categoryLabel: 'Explanation Videos',
    duration: '44s',
    aspectRatio: '9:16',
    description: '3D anatomical animation explaining how diaphragm muscle contractions and sudden vocal cord closure cause hiccups.',
    driveFileId: '169qpr9g1XsmL7S93Oc6zTRAluW54_nzu',
    previewUrl: 'https://drive.google.com/file/d/169qpr9g1XsmL7S93Oc6zTRAluW54_nzu/preview',
    webViewLink: 'https://drive.google.com/file/d/169qpr9g1XsmL7S93Oc6zTRAluW54_nzu/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-2-ref.jpg',
  },
  {
    assetId: 'explanation-3-video',
    title: 'Lacrimal Gland Tear Production & Lubrication',
    category: 'explanation-videos',
    categoryLabel: 'Explanation Videos',
    duration: '43s',
    aspectRatio: '9:16',
    description: '3D physiological animation explaining lacrimal gland tear production, eye lubrication, and crying overflow.',
    driveFileId: '1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ',
    previewUrl: 'https://drive.google.com/file/d/1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ/preview',
    webViewLink: 'https://drive.google.com/file/d/1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ/view?usp=drivesdk',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-3-ref.jpg',
  },
];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
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

  const filteredProjects = selectedFilter === 'all'
    ? ALL_PORTFOLIO_PROJECTS
    : ALL_PORTFOLIO_PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-transparent text-[#EDEDED] selection:bg-[#82C8E5] selection:text-[#06080C] overflow-x-hidden pt-28">
        <FloatingCapsuleNav />

        {/* Page Hero Header */}
        <section className="relative px-4 pt-16 pb-12 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-black/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[ ARCHIVE & CLOUD STREAMING CATALOG ]</span>
          </div>

          <StretchSnapText
            as="h1"
            level="display"
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
          >
            Film Archive & <span className="text-[#82C8E5] italic font-normal">Repertoire</span>
          </StretchSnapText>

          <StretchSnapText
            as="p"
            level="subtle"
            split="words"
            className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            Every commercial, preschool musical song, documentary, and viral 3D anatomical explainer streamed with adaptive resolution from our Google Drive cloud database.
          </StretchSnapText>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  selectedFilter === cat.id
                    ? 'bg-[#0047AB] text-white border border-[#82C8E5]/60 shadow-lg shadow-[#0047AB]/30 scale-105'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <StretchSnapText as="span" level="subtle" split="words" interactive>
                  {cat.label}
                </StretchSnapText>
              </button>
            ))}
          </div>
        </section>

        {/* Dedicated Media Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.assetId}
                onClick={() => setActiveModalVideo(project)}
                className="group/card rounded-3xl overflow-hidden border border-white/10 bg-[#0C1017]/85 backdrop-blur-xl shadow-xl shadow-black/80 hover:border-[#82C8E5]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0047AB]/25 cursor-pointer flex flex-col justify-between"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0047AB]/90 border border-[#82C8E5]/50 text-white flex items-center justify-center shadow-2xl group-hover/card:scale-110 group-hover/card:bg-[#82C8E5] group-hover/card:text-[#06080C] transition-all duration-300">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white">
                    {project.duration}
                  </div>

                  {/* Aspect Ratio Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-[#82C8E5] uppercase tracking-wider">
                    {project.aspectRatio}
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#82C8E5] block">
                      {project.categoryLabel}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl font-bold text-white mt-1 group-hover/card:text-[#82C8E5] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Drive Stream
                    </span>
                    <span className="text-white group-hover/card:text-[#82C8E5] transition-colors flex items-center gap-1">
                      Play Film <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Custom Production Callout */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0C1017]/80 backdrop-blur-xl text-center space-y-5">
            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white">
              Need A Bespoke Production Treatment?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We design custom animation sequences, 3D character worlds, and narrative brand films tailored to your precise campaign benchmarks.
            </p>
            <div className="pt-2">
              <TransitionLink
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#000080] via-[#0047AB] to-[#0055CC] hover:from-[#0047AB] hover:to-[#82C8E5] hover:text-[#06080C] text-white font-bold text-xs uppercase tracking-wider border border-[#82C8E5]/40 shadow-xl shadow-[#0047AB]/25 transition-all"
              >
                <span>Request Custom Production</span>
              </TransitionLink>
            </div>
          </div>
        </section>

        {/* Global Footer */}
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
