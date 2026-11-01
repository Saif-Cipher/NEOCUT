const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Film Archive & Commercial Repertoire',
  description: "Stream NeoCut Digital's complete archive of commercial video spots, 3D preschool animations, and viral anatomical explainers with adaptive 4K resolution.",
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Film Archive & Repertoire | NeoCut Digital',
    description: 'Stream our complete catalog of commercial spots, 3D character animations, and viral anatomical explainers.',
    url: `${siteUrl}/portfolio`,
    type: 'website',
    images: [
      {
        url: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
        width: 1200,
        height: 630,
        alt: 'NeoCut Digital Film Archive Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Film Archive & Repertoire | NeoCut Digital',
    description: 'Stream our complete catalog of commercial spots, 3D character animations, and viral anatomical explainers.',
    images: ['/assets/thumbnails/hero/references/hero-1-ref.jpg'],
  },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'NeoCut Digital Production Repertoire',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'VideoObject',
            name: 'NeoCut Studio Flagship Showreel',
            description: 'A master editorial montage showcasing AI-driven particle simulations, hyper-realistic character renders, and commercial product direction.',
            thumbnailUrl: `${siteUrl}/assets/thumbnails/hero/references/hero-1-ref.jpg`,
            uploadDate: '2024-11-01',
            duration: 'PT30S',
            embedUrl: 'https://drive.google.com/file/d/1jH_kscPlWnQkeS0oXLAjQN1RELOeEs_1/preview',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'VideoObject',
            name: 'AI Messenger Bot E-Commerce Commercial',
            description: '3D character-led narrative depicting customer inquiry overload, presenting automated AI conversational sales solutions.',
            thumbnailUrl: `${siteUrl}/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp`,
            uploadDate: '2024-11-01',
            duration: 'PT39S',
            embedUrl: 'https://drive.google.com/file/d/1Q9E_e5gQ6CE-rMuJh8MntNHrEnXBd0Pr/preview',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'VideoObject',
            name: 'Counting Numbers 1 to 20 Song',
            description: 'Engaging, colorful 3D educational musical animation guiding toddlers and preschool audiences through numerical sequences.',
            thumbnailUrl: `${siteUrl}/assets/thumbnails/kids-animation/references/kids-animation-1-ref.jpg`,
            uploadDate: '2024-11-01',
            duration: 'PT2M3S',
            embedUrl: 'https://drive.google.com/file/d/11e3fH19QV9aaWhGzy3oxeeTbQ5m1JCeI/preview',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Portfolio',
          item: `${siteUrl}/portfolio`,
        },
      ],
    },
  ],
};

export default function PortfolioLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      {children}
    </>
  );
}
