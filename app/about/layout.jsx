const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Studio Philosophy, Directorial Pillars & DNA',
  description: 'Learn about NeoCut Digital, founded by Saif in Dhaka. Discover our four directorial pillars, technical 3D arsenal, and neural video engineering framework.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About NeoCut Digital — Philosophy & Directorial DNA',
    description: 'Where neural innovation meets cinematic intuition. Discover our four pillars, production arsenal, and founding vision.',
    url: `${siteUrl}/about`,
    type: 'profile',
    images: [
      {
        url: '/assets/logo/neocut-logo.png.jpg',
        width: 1200,
        height: 630,
        alt: 'About NeoCut Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NeoCut Digital — Philosophy & Directorial DNA',
    description: 'Where neural innovation meets cinematic intuition. Discover our four pillars, production arsenal, and founding vision.',
    images: ['/assets/logo/neocut-logo.png.jpg'],
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      name: 'About NeoCut Digital',
      url: `${siteUrl}/about`,
      description: 'The philosophy, directorial pillars, and creative engineering DNA behind NeoCut Digital.',
      mainEntity: {
        '@type': 'Person',
        name: 'Saif Hossain',
        jobTitle: 'Founder & Creative Director',
        image: `${siteUrl}/assets/profile/saif-founder.png`,
        worksFor: {
          '@id': `${siteUrl}/#organization`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dhaka',
          addressCountry: 'BD',
        },
      },
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
          name: 'About',
          item: `${siteUrl}/about`,
        },
      ],
    },
  ],
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  );
}
