'use client';

import TiltedGridHero from './tilted-grid-hero.jsx';

export interface PortfolioItem {
  assetId: string;
  title: string;
  category: string;
  duration: string;
  aspectRatio: string;
  driveFileId: string;
  previewUrl: string;
  thumbnailUrl: string;
}

export interface TiltedGridHeroProps {
  onSelectProject?: (project: PortfolioItem) => void;
}

export { TiltedGridHero };
export default TiltedGridHero;
