'use client';

import { forwardRef, useState } from 'react';
import { Film } from 'lucide-react';

const OrbitCard = forwardRef(function OrbitCard(
  {
    item,
    isLeadingCard = false,
  },
  ref
) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-44 md:w-52 lg:w-60 aspect-video cursor-pointer orbit-card-3d rounded-xl sm:rounded-2xl overflow-hidden pointer-events-auto transition-[transform,box-shadow,border-color] duration-300 ease-out select-none ${
        hovered ? 'scale-110 !z-[9999]' : ''
      }`}
      style={{
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        // Prevent opening Drive preview, video player, or navigating
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Floating Thumbnail Frame Surface */}
      <div
        className={`relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 ${
          hovered
            ? 'border-[#65C6B5] shadow-[0_20px_50px_rgba(25,80,82,0.65)] brightness-110'
            : 'border-[#315B58]/50 bg-[#103638]/90 shadow-xl shadow-black/80 brightness-100'
        } backdrop-blur-sm`}
      >
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.title || item.name?.replace('-video.mp4', '').replace(/-/g, ' ') || 'NeoCut Portfolio Preview'}
            className="w-full h-full object-cover transition-transform duration-500"
            loading={isLeadingCard ? 'eager' : 'lazy'}
            fetchPriority={isLeadingCard ? 'high' : 'auto'}
            decoding="async"
            width={480}
            height={270}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-black/80">
            <Film className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
});

export default OrbitCard;
