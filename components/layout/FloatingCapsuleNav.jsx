'use client';

import { useState, useEffect } from 'react';
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

  // Close mobile drawer on Escape key and lock body scroll when drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Floating Capsule Bar */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between sm:justify-start gap-1.5 sm:gap-6 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass-capsule transition-all duration-500 scale-100 shadow-2xl shadow-black/80 max-w-full"
          aria-label="Main Navigation"
        >
          {/* Logo & Brand Wordmark */}
          <TransitionLink
            href="/"
            className="flex items-center gap-2 group pr-1.5 sm:pr-2 border-r border-[#315B58]/50 shrink-0"
            aria-label="NeoCut Digital Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#315B58] bg-[#071F22] flex items-center justify-center p-0.5 group-hover:border-[#65C6B5]/60 transition-colors">
              <img
                src="/assets/logo/neocut-logo.png.jpg"
                alt="NeoCut Logo"
                className="w-full h-full object-contain"
                width={32}
                height={32}
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-bold text-xs tracking-tight text-[#F7FCFA] leading-none">NEOCUT</span>
              <span className="text-[9px] font-semibold tracking-widest text-[#65C6B5] leading-none mt-0.5">DIGITAL</span>
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
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C6B5] ${
                      isActive
                        ? 'text-[#F7FCFA] bg-[#195052]/70 font-semibold shadow-inner shadow-white/5 border border-[#315B58]/40'
                        : 'text-[#B5CEC7] hover:text-[#F7FCFA] hover:bg-[#103638]/60'
                    }`}
                  >
                    <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.05 + idx * 0.03}>
                      {link.label}
                    </StretchSnapText>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#65C6B5]" />
                    )}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          {/* CTA & Mobile Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <TransitionLink
              href="/contact"
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#65C6B5] hover:bg-[#65C6B5]/90 text-[#071F22] text-xs font-bold tracking-wide border border-[#65C6B5] shadow-lg shadow-[#195052]/30 transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C6B5]"
            >
              <StretchSnapText as="span" level="subtle" split="words" interactive trigger="mount" delay={0.25}>
                <span className="hidden min-[360px]:inline">Start a Project</span>
                <span className="min-[360px]:hidden">Start</span>
              </StretchSnapText>
              <span className="w-4 h-4 rounded-full bg-[#071F22]/20 flex items-center justify-center group-hover:rotate-45 group-hover:bg-[#071F22]/30 transition-transform duration-300">
                <ArrowUpRight className="w-3 h-3 text-[#071F22]" />
              </span>
            </TransitionLink>

            {/* Mobile Hamburger Button (Compliant with >= 44x44px touch target) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#103638]/70 border border-[#315B58] flex items-center justify-center text-[#D9F0EA] hover:text-[#F7FCFA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C6B5]"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#65C6B5]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-[#071F22]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 animate-in fade-in duration-200"
        >
          <ul className="space-y-6 text-center list-none p-0 m-0">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`font-serif text-3xl font-medium transition-colors block py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C6B5] rounded-xl ${
                      isActive ? 'text-[#65C6B5] font-bold' : 'text-[#D9F0EA] hover:text-[#65C6B5]'
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#65C6B5] text-[#071F22] font-bold text-sm border border-[#65C6B5] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65C6B5]"
            >
              Start a Project <ArrowUpRight className="w-4 h-4 text-[#071F22]" />
            </TransitionLink>
          </div>
        </div>
      )}
    </>
  );
}
