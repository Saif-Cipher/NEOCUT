'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TransitionLink } from '../motion/TransitionProvider';
import HalftoneWordmark from './HalftoneWordmark';

/**
 * Global Footer — Interactive Halftone Wordmark (Specification #17)
 * Neo Navy Palette Update
 * 
 * Minimal editorial 4-column layout, thin divider, accessible Back to Top utility,
 * and an oversized interactive halftone NEOCUT wordmark cropped at the bottom edge.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    const isReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: isReduced });
      } else {
        window.scrollTo({
          top: 0,
          behavior: isReduced ? 'auto' : 'smooth',
        });
      }
    }
  };

  const handleKeyDownToTop = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScrollToTop();
    }
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-20 w-full bg-[#030716] text-[#FFFFFF] border-t border-[#162A5C] pt-16 sm:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Information Columns (4-Column Editorial Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14">
          
          {/* Column 1 — Studio identity */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#5CB2FF] uppercase font-semibold block">
              01 // STUDIO
            </span>
            <div className="space-y-1.5">
              <p className="text-sm sm:text-base font-bold tracking-[0.16em] uppercase text-[#FFFFFF] m-0">
                NEOCUT DIGITAL
              </p>
              <p className="text-xs tracking-[0.14em] uppercase text-[#DCE6FF] leading-relaxed max-w-xs m-0">
                AI VIDEO PRODUCTION &amp; CINEMATIC STORYTELLING
              </p>
            </div>
            <address className="not-italic text-xs tracking-[0.12em] text-[#A9B8E0] pt-1 block space-y-0.5">
              <span>© {currentYear || 2026}</span>
              <span className="block text-[#A9B8E0] font-mono text-[11px]">Dhaka, Bangladesh</span>
            </address>
          </div>

          {/* Column 2 — Work */}
          <nav aria-label="Work navigation" className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#5CB2FF] uppercase font-semibold block">
              02 // WORK
            </span>
            <ul className="space-y-3 list-none p-0 m-0 text-xs tracking-[0.16em] uppercase">
              <li>
                <TransitionLink
                  href="/portfolio"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/services"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>Services</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/process"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>Production Pipeline</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
            </ul>
          </nav>

          {/* Column 3 — Studio */}
          <nav aria-label="Studio navigation" className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#5CB2FF] uppercase font-semibold block">
              03 // DIRECTORY
            </span>
            <ul className="space-y-3 list-none p-0 m-0 text-xs tracking-[0.16em] uppercase">
              <li>
                <TransitionLink
                  href="/about"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>About</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/process"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>Process</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/contact"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#5CB2FF]" />
                </TransitionLink>
              </li>
            </ul>
          </nav>

          {/* Column 4 — Contact */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#5CB2FF] uppercase font-semibold block">
              04 // CONTACT
            </span>
            <ul className="space-y-3 list-none p-0 m-0 text-xs tracking-[0.14em]">
              <li>
                <a
                  href="mailto:pixelcraftbysaif@gmail.com"
                  className="text-[#FFFFFF] hover:text-[#5CB2FF] transition-colors duration-200 block truncate"
                  title="pixelcraftbysaif@gmail.com"
                >
                  pixelcraftbysaif@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801931245914"
                  className="text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 font-mono block"
                >
                  +8801931245914
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801931245914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#DCE6FF] hover:text-[#5CB2FF] transition-colors duration-200 uppercase tracking-[0.16em] group"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-[#5CB2FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-[#162A5C]" />

        {/* Back to Top Row */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[11px] font-mono tracking-[0.22em] text-[#A9B8E0] uppercase">
            NEOCUT DIGITAL // PRODUCTION ARCHIVE
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            onKeyDown={handleKeyDownToTop}
            aria-label="Back to top of page"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.24em] text-[#FFFFFF] uppercase hover:text-[#5CB2FF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5CB2FF] py-1 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1 text-[#5CB2FF]"
            >
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* Giant Interactive Halftone Wordmark (Cropped at Viewport / Container Bottom) */}
      <div className="w-full relative mt-4 overflow-hidden">
        <HalftoneWordmark
          wordmark="NEOCUT"
          className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px]"
          minHeight="220px"
        />
      </div>
    </footer>
  );
}
