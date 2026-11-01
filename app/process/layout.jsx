const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: '6-Stage Video Production Framework & SLA',
  description: "Discover NeoCut Digital's systematic 6-stage video pipeline: from creative brief and 3D modeling to ACES color grading, sound design, and cloud delivery.",
  alternates: {
    canonical: '/process',
  },
  openGraph: {
    title: 'Systematic Production Process & SLA | NeoCut Digital',
    description: 'Our disciplined 6-stage framework: Discovery, Scriptwriting, 3D Look Dev, Kinetic Animation, Color & Sound, and Multi-Format 4K Cloud Delivery.',
    url: `${siteUrl}/process`,
    type: 'website',
    images: [
      {
        url: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
        width: 1200,
        height: 630,
        alt: 'NeoCut Digital 6-Stage Production Pipeline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systematic Production Process & SLA | NeoCut Digital',
    description: 'Our disciplined 6-stage framework: Discovery, Scriptwriting, 3D Look Dev, Kinetic Animation, Color & Sound, and Multi-Format 4K Cloud Delivery.',
    images: ['/assets/thumbnails/hero/references/hero-1-ref.jpg'],
  },
};

const processSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a typical video production cycle take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard commercial films and 3D explainers take between 10 to 18 business days from creative brief to final master delivery. Urgent 5-to-7 day express sprints are available upon request.',
          },
        },
        {
          '@type': 'Question',
          name: 'What assets do we need to provide before kicking off?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We require your brand guidelines (logos, fonts, colors), reference product photos or 3D CAD files if available, and any key messaging points you want prioritized.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you deliver the same project formatted for both YouTube and TikTok?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every project is storyboarded with universal framing guides so we can deliver native 16:9 widescreen masters and optimized 9:16 vertical cuts with re-framed typography and action points.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle voiceover recording and music licensing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We provide complete end-to-end audio production, including professional native voiceover talent in multiple accents and fully cleared global commercial music licensing.',
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
          name: 'Process',
          item: `${siteUrl}/process`,
        },
      ],
    },
  ],
};

export default function ProcessLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
      />
      {children}
    </>
  );
}
