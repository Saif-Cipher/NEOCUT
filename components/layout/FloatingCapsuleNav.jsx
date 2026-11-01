'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import StretchSnapText from '../motion/StretchSnapText';
import { TransitionLink } from '../motion/TransitionProvider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export default function FloatingCapsuleNav() {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Floating Capsule Bar */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-2 sm:gap-6 px-4 py-2.5 rounded-full glass-capsule transition-all duration-500 scale-100 shadow-2xl shadow-black/80"
          aria-label="Main Navigation"
        >
          {/* Logo & Brand Wordmark */}
          <TransitionLink
            href="/"
            className="flex items-center gap-2.5 group pr-2 border-r border-white/10"
            aria-label="NeoCut Digital Home"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-black/60 flex items-center justify-center p-0.5 group-hover:border-cyan-400/50 transition-colors">
              <img
                src="/assets/logo/neocut-logo.png.jpg"
                alt="NeoCut"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-bold text-xs tracking-tight text-white leading-none">NEOCUT</span>
              <span className="text-[9px] font-semibold tracking-widest text-[#82C8E5] leading-none mt-0.5">DIGITAL</span>
            </div>
          </TransitionLink>

          {/* Desktop Navigation Links with Real URL Routing & Circular Iris Transition */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold shadow-inner shadow-white/5'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.05 + idx * 0.03}>
                      {link.label}
                    </StretchSnapText>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#82C8E5]" />
                    )}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          {/* Start a Project Primary CTA Button */}
          <div className="flex items-center gap-2">
            <TransitionLink
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#000080] to-[#0047AB] hover:from-[#0047AB] hover:to-[#0055CC] text-white text-xs font-semibold tracking-wide border border-[#82C8E5]/30 hover:border-[#82C8E5]/70 shadow-lg shadow-[#0047AB]/25 transition-all duration-300 active:scale-95"
            >
              <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.25}>
                Start a Project
              </StretchSnapText>
              <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center group-hover:rotate-45 group-hover:bg-white/30 transition-transform duration-300">
                <ArrowUpRight className="w-3 h-3 text-[#82C8E5]" />
              </span>
            </TransitionLink>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col justify-center px-8">
          <ul className="space-y-6 text-center list-none p-0 m-0">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-editorial text-3xl font-medium transition-colors ${
                      isActive ? 'text-[#82C8E5] font-bold' : 'text-slate-200 hover:text-[#82C8E5]'
                    }`}
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 text-center">
            <TransitionLink
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#000080] to-[#0047AB] text-white font-semibold text-sm border border-[#82C8E5]/40"
            >
              Start a Project <ArrowUpRight className="w-4 h-4 text-[#82C8E5]" />
            </TransitionLink>
          </div>
        </div>
      )}
    </>
  );
}
