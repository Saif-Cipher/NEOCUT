const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Creative Capabilities & Production Services',
  description: "Explore NeoCut Digital's 5 core video production capabilities: commercial brand films, preschool 3D animation, cinematic documentaries, and viral explainers.",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Video Production Services & Capabilities | NeoCut Digital',
    description: 'Full-spectrum video production: commercial brand films, 3D kids animation, 4K aerial cinematography, and anatomical 3D explainers.',
    url: `${siteUrl}/services`,
    type: 'website',
    images: [
      {
        url: '/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp',
        width: 1200,
        height: 630,
        alt: 'NeoCut Digital Production Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Production Services & Capabilities | NeoCut Digital',
    description: 'Full-spectrum video production: commercial brand films, 3D kids animation, 4K aerial cinematography, and anatomical 3D explainers.',
    images: ['/assets/thumbnails/brand-promotion/promotion-1-thumbnail.webp'],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'NeoCut Digital Production Services',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            name: 'Brand Promotion & Commercial Films',
            serviceType: 'Commercial Video Production',
            provider: { '@id': `${siteUrl}/#organization` },
            description: 'High-converting video ads engineered for social feeds and direct response, blending 3D product simulation and hyper-stylized narratives.',
            areaServed: 'Global',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            name: 'Kids 3D Animation & Musical Series',
            serviceType: '3D Character Animation',
            provider: { '@id': `${siteUrl}/#organization` },
            description: 'Vibrant 3D character animation tailored to retain young global attention, featuring preschool counting songs and animated series.',
            areaServed: 'Global',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Service',
            name: 'Cinematic Storytelling & Documentaries',
            serviceType: 'Documentary Film Production',
            provider: { '@id': `${siteUrl}/#organization` },
            description: 'Intimate documentary profiles, founder journeys, institutional election profiles, and brand origin stories.',
            areaServed: 'Global',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Service',
            name: '4K Cinematography & Aerial Showcase',
            serviceType: 'Aerial Cinematography',
            provider: { '@id': `${siteUrl}/#organization` },
            description: '4K aerial drone cinematography combined with Hollywood-calibrated ACEScc color science for tourism, real estate, and automotive brands.',
            areaServed: 'Global',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'Service',
            name: '3D Scientific & Anatomical Explainers',
            serviceType: 'Medical & Scientific Animation',
            provider: { '@id': `${siteUrl}/#organization` },
            description: 'Complex physiological and mechanical mechanisms visualised with microscopic precision and viral clarity.',
            areaServed: 'Global',
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
          name: 'Services',
          item: `${siteUrl}/services`,
        },
      ],
    },
  ],
};

export default function ServicesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {children}
    </>
  );
}
