'use client';

import { ArrowUpRight, Database, ExternalLink } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent border-t border-white/5 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Tier: Logo, Navigation, Direct Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border border-white/10 bg-black/60 p-1">
                <img
                  src="/assets/logo/neocut-logo.png.jpg"
                  alt="NeoCut Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-white block">NEOCUT</span>
                <span className="text-[10px] uppercase tracking-widest text-[#82C8E5] font-semibold block -mt-0.5">
                  DIGITAL STUDIO
                </span>
              </div>
            </div>
            <StretchSnapText as="p" level="subtle" split="words" className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Award-winning creative production studio synthesizing AI visual synthesis, 3D character design, and cinematic storytelling.
            </StretchSnapText>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-4">
              [ NAVIGATION ]
            </span>
            <ul className="grid grid-cols-2 gap-3 list-none p-0 m-0">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-[#82C8E5] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Channels */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-4">
              [ CHANNELS ]
            </span>
            <a
              href="https://wa.me/8801931245914"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white transition-colors block"
            >
              WhatsApp: <span className="text-slate-200">+880 1931 245914</span>
            </a>
            <a
              href="mailto:pixelcraftbysaif@gmail.com"
              className="text-xs text-slate-400 hover:text-white transition-colors block"
            >
              Email: <span className="text-slate-200">pixelcraftbysaif@gmail.com</span>
            </a>
            <a
              href="https://github.com/Saif-Cipher/NEOCUT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#82C8E5] hover:underline pt-2"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Giant Signature Anubi-Style Background Brand Wordmark */}
        <div className="py-12 select-none overflow-hidden text-center opacity-10 pointer-events-none">
          <span className="font-editorial text-7xl sm:text-9xl md:text-[13rem] font-bold text-white tracking-tighter whitespace-nowrap block leading-none">
            NEOCUT DIGITAL
          </span>
        </div>

        {/* Bottom Tier: Copyright & Google Drive Database Active Badge */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} NeoCut Digital. All rights reserved. Proprietary creative production.
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[11px] font-mono">
            <Database className="w-3 h-3" />
            <span>Google Drive Asset Database Active (48 Master Films)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
