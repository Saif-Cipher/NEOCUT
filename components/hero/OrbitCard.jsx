'use client';

import { useState } from 'react';
import { ArrowUpRight, Play, Film } from 'lucide-react';

export default function OrbitCard({
  item,
  x,
  y,
  z,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);

  // Compute 3D transform with dynamic Z elevation on hover
  const currentZ = hovered ? z + 70 : z;
  const currentScale = hovered ? 1.08 : 1.0;
  const transformStyle = `translate3d(${x}px, ${y}px, ${currentZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${currentScale})`;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 aspect-[3/4] cursor-pointer orbit-card-3d rounded-2xl overflow-hidden pointer-events-auto"
      style={{
        transform: transformStyle,
        zIndex: Math.round(z + 500),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(item)}
    >
      {/* Glassmorphic Container Surface */}
      <div
        className={`relative w-full h-full rounded-2xl p-2.5 flex flex-col justify-between transition-all duration-300 border ${
          hovered
            ? 'bg-[#0E131E]/95 border-[#82C8E5]/70 shadow-2xl shadow-[#0047AB]/40'
            : 'bg-[#0A0D14]/85 border-white/10 shadow-xl shadow-black/80'
        } backdrop-blur-md`}
      >
        {/* Media Thumbnail Container */}
        <div className="relative w-full h-3/5 rounded-xl overflow-hidden bg-black/80 flex items-center justify-center">
          {item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={item.name?.replace('-video.mp4', '').replace(/-/g, ' ') || 'NeoCut Portfolio Preview'}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                hovered ? 'scale-110' : 'scale-100'
              }`}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-600">
              <Film className="w-8 h-8 mb-1" />
              <span className="text-[9px] font-mono tracking-widest uppercase">NeoCut Film</span>
            </div>
          )}

          {/* Video Preview on Hover if Available */}
          {hovered && item.previewUrl && (
            <div className="absolute inset-0 z-10 bg-black animate-in fade-in duration-300 pointer-events-none">
              <iframe
                src={`${item.previewUrl}?autoplay=1&mute=1`}
                className="w-full h-full border-0 pointer-events-none scale-125"
                title={item.name}
              />
            </div>
          )}

          {/* Play Badge Icon */}
          <div
            className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-[#0047AB]/90 border border-[#82C8E5]/40 text-white flex items-center justify-center shadow-lg">
              <Play className="w-4 h-4 ml-0.5 fill-current text-[#82C8E5]" />
            </div>
          </div>
        </div>

        {/* Card Metadata */}
        <div className="mt-2 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold tracking-wider uppercase text-[#82C8E5] block truncate">
              {item.category?.replace('-', ' ')}
            </span>
            <h4 className="font-semibold text-xs text-white line-clamp-2 mt-0.5 group-hover:text-[#82C8E5] transition-colors leading-tight">
              {item.name?.replace('-video.mp4', '').replace(/-/g, ' ')}
            </h4>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-slate-400">
            <span className="font-mono">{item.aspectRatio || '16:9'}</span>
            <span className="inline-flex items-center gap-1 text-[#82C8E5] font-semibold">
              Preview <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
