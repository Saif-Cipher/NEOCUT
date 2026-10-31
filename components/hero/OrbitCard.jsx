'use client';

import { useState } from 'react';
import { Film } from 'lucide-react';

export default function OrbitCard({
  item,
  x,
  y,
  z,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}) {
  const [hovered, setHovered] = useState(false);

  // Smooth scale animation (1.12x) with subtle forward Z elevation
  const currentZ = hovered ? z + 50 : z;
  const currentScale = hovered ? 1.12 : 1.0;
  const transformStyle = `translate3d(${x}px, ${y}px, ${currentZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${currentScale})`;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 md:w-52 lg:w-60 aspect-video cursor-pointer orbit-card-3d rounded-xl sm:rounded-2xl overflow-hidden pointer-events-auto transition-transform duration-300 ease-out select-none"
      style={{
        transform: transformStyle,
        zIndex: Math.round(z + 500) + (hovered ? 300 : 0),
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
            ? 'border-[#82C8E5] shadow-[0_20px_50px_rgba(0,71,171,0.55)] brightness-110'
            : 'border-white/15 bg-[#0A0D14]/90 shadow-xl shadow-black/80 brightness-100'
        } backdrop-blur-sm`}
      >
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.name?.replace('-video.mp4', '').replace(/-/g, ' ') || 'NeoCut Portfolio Preview'}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
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
}
