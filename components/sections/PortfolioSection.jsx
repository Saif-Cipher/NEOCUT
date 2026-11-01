'use client';

import TiltedGridHero from '@/components/ui/tilted-grid-hero';

/**
 * PortfolioSection Component
 * Replaces the previous scroll-driven grab / stretch stack with the 21st.dev Tilted Grid Hero.
 * 
 * Renders an autonomous, continuous 3D tilted curved image exhibition
 * displaying NeoCut's approved production catalog.
 */
export default function PortfolioSection({ onSelectVideo }) {
  return (
    <div id="portfolio" className="relative w-full">
      <TiltedGridHero onSelectProject={onSelectVideo} />
    </div>
  );
}
