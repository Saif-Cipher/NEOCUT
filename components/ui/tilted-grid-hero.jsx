'use client';

import { useState } from 'react';
import { Play, ArrowUpRight, Sparkles } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

// Curated 20 Approved Portfolio Projects for the Tilted Grid Moving Exhibition
const APPROVED_PROJECTS = [
  // Row 1 Projects
  {
    assetId: 'hero-1-video',
    title: 'NeoCut Studio Flagship Showreel',
    category: 'Cinematography',
    duration: '30s',
    aspectRatio: '16:9',
    driveFileId: '1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1',
    previewUrl: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/preview',
    thumbnailUrl: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
  },
  {
    assetId: 'promotion-1-video',
    title: 'AI Messenger Bot E-Commerce Commercial',
    category: 'Brand Promotion',
    duration: '39s',
    aspectRatio: '16:9',
    driveFileId: '1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr',
    previewUrl: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/preview',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp',
  },
  {
    assetId: 'kids-animation-3-video',
    title: "Benny the Bunny's Outdoor Adventure",
    category: 'Kids Animation',
    duration: '1m 45s',
    aspectRatio: '16:9',
    driveFileId: '1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU',
    previewUrl: 'https://drive.google.com/file/d/1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-3-ref.jpg',
  },
  {
    assetId: 'cinematography-1-video',
    title: 'Agricultural Paddy & Hillside Documentary',
    category: 'Cinematography',
    duration: '3m 47s',
    aspectRatio: '16:9',
    driveFileId: '1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne',
    previewUrl: 'https://drive.google.com/file/d/1qzVK-AHdrt4r4h2zPalCMApEh-tGCGne/preview',
    thumbnailUrl: '/assets/thumbnails/cinematography/references/cinematography-1-ref.jpg',
  },
  {
    assetId: 'explanation-1-video',
    title: 'Tick Hypostome Parasitic Skin Embedding',
    category: 'Explanation Videos',
    duration: '41s',
    aspectRatio: '9:16',
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    previewUrl: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-1-ref.jpg',
  },
  {
    assetId: 'storytelling-1-video',
    title: 'Hamid Candidate Leadership Manifesto',
    category: 'Storytelling',
    duration: '2m 39s',
    aspectRatio: '1440:1080',
    driveFileId: '1G82iCKZPVUXzAj35shDSy07CDcfMgo4C',
    previewUrl: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/preview',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-1-ref.jpg',
  },
  {
    assetId: 'promotion-2-video',
    title: 'TOTOPAC Waterproof Pouch Commercial',
    category: 'Brand Promotion',
    duration: '41s',
    aspectRatio: '16:9',
    driveFileId: '1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz',
    previewUrl: 'https://drive.google.com/file/d/1PmzLDHmFe4SKDPV8qCWUXdPvvz113dkz/preview',
    thumbnailUrl: '/assets/thumbnails/brand-promotion/promotion-2-thumbnail.webp',
  },

  // Row 2 Projects
  {
    assetId: 'explanation-2-video',
    title: 'Diaphragm Muscle Spasm & Hiccup Reflex',
    category: 'Explanation Videos',
    duration: '44s',
    aspectRatio: '9:16',
    driveFileId: '169qpr9g1XsmL7S93Oc6zTRAluW54_nzu',
    previewUrl: 'https://drive.google.com/file/d/169qpr9g1XsmL7S93Oc6zTRAluW54_nzu/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-2-ref.jpg',
  },
  {
    assetId: 'kids-animation-1-video',
    title: 'Counting Numbers 1 to 20 Song',
    category: 'Kids Animation',
    duration: '2m 03s',
    aspectRatio: '16:9',
    driveFileId: '11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI',
    previewUrl: 'https://drive.google.com/file/d/11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-1-ref.jpg',
  },
  {
    assetId: 'explanation-3-video',
    title: 'Lacrimal Gland Tear Production & Lubrication',
    category: 'Explanation Videos',
    duration: '43s',
    aspectRatio: '9:16',
    driveFileId: '1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ',
    previewUrl: 'https://drive.google.com/file/d/1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-3-ref.jpg',
  },
  {
    assetId: 'storytelling-2-video',
    title: 'Student Voices & Campus Election Street Poll',
    category: 'Storytelling',
    duration: '2m 13s',
    aspectRatio: '9:16',
    driveFileId: '1U6uaGajHeRsecmfIpogNg2nUlA86uQYp',
    previewUrl: 'https://drive.google.com/file/d/1U6uaGajHeRsecmfIpogNg2nUlA86uQYp/preview',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-2-ref.jpg',
  },
  {
    assetId: 'kids-animation-2-video',
    title: 'Alero Kids Nursery Rhymes Compilation',
    category: 'Kids Animation',
    duration: '3m 15s',
    aspectRatio: '16:9',
    driveFileId: '1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH',
    previewUrl: 'https://drive.google.com/file/d/1cM3tySSp-7dkxnIWExbK5NRbKJPNKkuH/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-2-ref.jpg',
  },
  {
    assetId: 'explanation-4-video',
    title: 'Human Spine Anatomy & Disc Alignment',
    category: 'Explanation Videos',
    duration: '41s',
    aspectRatio: '9:16',
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    previewUrl: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-4-ref.jpg',
  },
  {
    assetId: 'kids-animation-4-video',
    title: 'Forest Animals Exploration & Harmony',
    category: 'Kids Animation',
    duration: '2m 10s',
    aspectRatio: '16:9',
    driveFileId: '1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU',
    previewUrl: 'https://drive.google.com/file/d/1sk2B1c4KYPWZM5kEO4QJXNiVIyZrnWjU/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-4-ref.jpg',
  },

  // Row 3 Projects
  {
    assetId: 'storytelling-3-video',
    title: 'Begum Khaleda Zia Hall Voter Perspective',
    category: 'Storytelling',
    duration: '2m 45s',
    aspectRatio: '9:16',
    driveFileId: '1G82iCKZPVUXzAj35shDSy07CDcfMgo4C',
    previewUrl: 'https://drive.google.com/file/d/1G82iCKZPVUXzAj35shDSy07CDcfMgo4C/preview',
    thumbnailUrl: '/assets/thumbnails/storytelling/references/storytelling-3-ref.jpg',
  },
  {
    assetId: 'explanation-5-video',
    title: 'Microscopic Cellular Membrane Diffusion',
    category: 'Explanation Videos',
    duration: '38s',
    aspectRatio: '9:16',
    driveFileId: '169qpr9g1XsmL7S93Oc6zTRAluW54_nzu',
    previewUrl: 'https://drive.google.com/file/d/169qpr9g1XsmL7S93Oc6zTRAluW54_nzu/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-5-ref.jpg',
  },
  {
    assetId: 'kids-animation-5-video',
    title: 'Farm Playtime Musical Story',
    category: 'Kids Animation',
    duration: '1m 55s',
    aspectRatio: '16:9',
    driveFileId: '11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI',
    previewUrl: 'https://drive.google.com/file/d/11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI/preview',
    thumbnailUrl: '/assets/thumbnails/kids-animation/references/kids-animation-5-ref.jpg',
  },
  {
    assetId: 'explanation-6-video',
    title: 'Cardiovascular Blood Flow & Valve Motion',
    category: 'Explanation Videos',
    duration: '42s',
    aspectRatio: '9:16',
    driveFileId: '1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ',
    previewUrl: 'https://drive.google.com/file/d/1jX5ROoIDA4QpLRMbURB2gH85ujTKZiNQ/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-6-ref.jpg',
  },
  {
    assetId: 'explanation-7-video',
    title: 'Cochlear Acoustic Frequency Resonance',
    category: 'Explanation Videos',
    duration: '40s',
    aspectRatio: '9:16',
    driveFileId: '10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8',
    previewUrl: 'https://drive.google.com/file/d/10I3PBz1vSjVl9PTew38JU8kpFgTO5MO8/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-7-ref.jpg',
  },
  {
    assetId: 'explanation-8-video',
    title: 'Renal Nephron Filtration Mechanics',
    category: 'Explanation Videos',
    duration: '45s',
    aspectRatio: '9:16',
    driveFileId: '169qpr9g1XsmL7S93Oc6zTRAluW54_nzu',
    previewUrl: 'https://drive.google.com/file/d/169qpr9g1XsmL7S93Oc6zTRAluW54_nzu/preview',
    thumbnailUrl: '/assets/thumbnails/explanation-videos/references/explanation-8-ref.jpg',
  },
];

const ROW_1 = APPROVED_PROJECTS.slice(0, 7);
const ROW_2 = APPROVED_PROJECTS.slice(7, 14);
const ROW_3 = APPROVED_PROJECTS.slice(14, 20);

/**
 * TiltedGridHero Component
 * Reference: https://21st.dev/@ruixen.ui/components/tilted-grid-hero
 *
 * Implements a curved, continuously streaming 3D tilted image grid of approved
 * NeoCut Digital productions. Fully accessible (WCAG 2.1) and hardware accelerated.
 */
export default function TiltedGridHero({ onSelectProject }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  const renderCard = (project, uniqueKey) => {
    const isHovered = hoveredKey === uniqueKey;

    const handleActivate = () => {
      if (onSelectProject) {
        onSelectProject(project);
      }
    };

    return (
      <div
        key={uniqueKey}
        role="button"
        tabIndex={0}
        aria-label={`Watch ${project.title} (${project.category}, ${project.duration})`}
        onClick={handleActivate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleActivate();
          }
        }}
        onMouseEnter={() => setHoveredKey(uniqueKey)}
        onMouseLeave={() => setHoveredKey(null)}
        onFocus={() => setHoveredKey(uniqueKey)}
        onBlur={() => setHoveredKey(null)}
        className="relative flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] aspect-video rounded-2xl overflow-hidden bg-[#0A0E18] border border-white/10 hover:border-[#82C8E5]/70 focus:border-[#82C8E5] focus:outline-none focus:ring-2 focus:ring-[#82C8E5]/50 transition-all duration-300 cursor-pointer shadow-xl shadow-black/80 group transform-gpu"
        style={{
          transform: isHovered ? 'scale(1.06) translateZ(30px)' : 'scale(1) translateZ(0px)',
          zIndex: isHovered ? 25 : 1,
        }}
      >
        {/* Project Thumbnail Image */}
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Ambient Dark Overlay with Glowing Play Pill on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Center Hover Action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#0047AB]/90 border border-[#82C8E5] text-white flex items-center justify-center shadow-xl shadow-[#0047AB]/60 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-current text-[#82C8E5]" />
          </div>
        </div>

        {/* Subtle Category & Duration Corner Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 truncate max-w-[70%]">
            {project.category}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[#82C8E5]">
            {project.duration}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-20 lg:py-32 bg-transparent overflow-hidden border-t border-white/5">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#000080]/15 rounded-full blur-[160px]" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#82C8E5]/30 bg-[#0C1017]/80 backdrop-blur-md text-[#82C8E5] text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[ CURATED CONTINUOUS EXHIBITION ]</span>
            </div>

            <StretchSnapText
              as="h2"
              level="display"
              className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Selected <span className="text-[#82C8E5] italic font-normal">Portfolio</span>
            </StretchSnapText>

            <StretchSnapText
              as="p"
              level="subtle"
              split="words"
              className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed"
            >
              A continuously streaming 3D exhibition of master commercial films, 3D character narratives, and medical animations.
            </StretchSnapText>
          </div>

          <TransitionLink
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0047AB] hover:bg-[#82C8E5] text-white hover:text-[#06080C] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#0047AB]/30 w-fit group"
          >
            <span>View Full Portfolio Archive</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </TransitionLink>
        </div>
      </div>

      {/* 3D Tilted Perspective Stage Container */}
      <div
        className="relative w-full overflow-hidden select-none py-6"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Left, Right, Top & Bottom Curved Vignette Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050914] via-[#050914]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050914] via-[#050914]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050914] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050914] to-transparent z-20" />

        {/* Curved 3D Tilted Grid Matrix */}
        <div
          className="space-y-6 sm:space-y-8 transform-gpu will-change-transform"
          style={{
            transform: 'rotateX(13deg) rotateZ(-3.5deg) skewX(2deg) scale(1.04)',
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Row 1: Leftward Streaming Track */}
          <div className="flex gap-5 sm:gap-6 w-max tilted-stream-left hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {ROW_1.map((project, idx) => renderCard(project, `row1-orig-${idx}`))}
            {ROW_1.map((project, idx) => renderCard(project, `row1-dup-${idx}`))}
          </div>

          {/* Row 2: Rightward Streaming Track */}
          <div className="flex gap-5 sm:gap-6 w-max tilted-stream-right hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {ROW_2.map((project, idx) => renderCard(project, `row2-orig-${idx}`))}
            {ROW_2.map((project, idx) => renderCard(project, `row2-dup-${idx}`))}
          </div>

          {/* Row 3: Leftward Slower Streaming Track */}
          <div className="flex gap-5 sm:gap-6 w-max tilted-stream-left-slow hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {ROW_3.map((project, idx) => renderCard(project, `row3-orig-${idx}`))}
            {ROW_3.map((project, idx) => renderCard(project, `row3-dup-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
