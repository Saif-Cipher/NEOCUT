'use client';

import { useState, useEffect } from 'react';
import { Play, Sparkles, Film, ShieldCheck, Database, Layers, ExternalLink, X, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'brand-promotion', label: 'Brand Promotion' },
  { id: 'kids-animation', label: 'Kids Animation' },
  { id: 'storytelling', label: 'Storytelling' },
  { id: 'cinematography', label: 'Cinematography' },
  { id: 'explanation-videos', label: 'Explanation Videos' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    async function loadMedia() {
      setLoading(true);
      try {
        const url = activeCategory === 'all' 
          ? '/api/media' 
          : `/api/media?category=${encodeURIComponent(activeCategory)}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMediaList(json.data.filter(item => item.type === 'video'));
        }
      } catch (err) {
        console.error('Failed to load portfolio media', err);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-[#07090C] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Glow gradient backdrop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-orange-600/10 via-cyan-500/5 to-transparent blur-[120px] rounded-full" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#07090C]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-1">
              <img src="/assets/logo/neocut-logo.png.jpg" alt="NeoCut Digital" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-white">NEOCUT</span>
              <span className="text-xs uppercase tracking-widest text-orange-500 block -mt-1 font-semibold">DIGITAL</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Drive Database Active (48 Assets)
            </div>
            <a
              href="https://github.com/Saif-Cipher/NEOCUT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen Media Production
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08]">
          Crafting High-Impact <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
            Visual Storytelling
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          From viral 3D explanation models to cinematic storytelling and commercial brand promotions, NeoCut Digital powers digital-first brands with world-class production.
        </p>

        {/* Feature metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5">
          <div>
            <div className="text-3xl font-extrabold text-white">47</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Portfolio Films</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-orange-400">5.3 GB</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Cloud Asset Library</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">5</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Specialized Verticals</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">4K / 1080p</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mt-1">Adaptive Streaming</div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Selected Works</h2>
            <p className="text-sm text-slate-400 mt-1">Directly integrated with Google Drive secure streaming</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-video rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : mediaList.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
            <Film className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">No media found in this vertical</h3>
            <p className="text-xs text-slate-500 mt-1">Check back soon for freshly cataloged productions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map(item => (
              <div
                key={item.assetId}
                onClick={() => setActiveVideo(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#0E1117] hover:border-orange-500/50 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60 flex items-center justify-center">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <Film className="w-12 h-12 mb-2" />
                      <span className="text-xs font-mono">NEOCUT ARCHIVE</span>
                    </div>
                  )}

                  {/* Play badge overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500/90 group-hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Duration tag */}
                  {item.durationFormatted && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono font-medium text-white border border-white/10">
                      {item.durationFormatted}
                    </span>
                  )}
                </div>

                {/* Card Meta */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                      {item.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-semibold text-white text-sm mt-1 line-clamp-1 group-hover:text-orange-300 transition-colors">
                      {item.name.replace('-video.mp4', '').replace(/-/g, ' ')}
                    </h3>
                    {item.shortDescription && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {item.shortDescription}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{item.aspectRatio}</span>
                    <span className="text-emerald-400">● Cloud Synced</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0E1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                  {activeVideo.category}
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {activeVideo.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embed Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={activeVideo.previewUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full border-0"
                title={activeVideo.name}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Streamed via verified Google Drive preview player</span>
              </div>
              <div className="font-mono text-slate-500">
                Asset ID: {activeVideo.assetId}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 border-t border-white/5 bg-[#050608] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-wider">NEOCUT DIGITAL</span>
            <span>&copy; {new Date().getFullYear()} NeoCut Digital. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Database className="w-3.5 h-3.5" /> Google Drive Cloud Asset Database Active
            </span>
            <a
              href="https://github.com/Saif-Cipher/NEOCUT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Repository <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
