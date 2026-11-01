const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Initiate Production Brief & Direct Channels',
  description: 'Start your video production with NeoCut Digital. Submit a project brief for a 24h SLA estimate or reach Director Saif directly via WhatsApp and email.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Initiate Production Collaboration | NeoCut Digital',
    description: 'Submit your project brief for immediate creative review, or connect directly via WhatsApp (+880 1931 245914) or official studio email.',
    url: `${siteUrl}/contact`,
    type: 'website',
    images: [
      {
        url: '/assets/logo/neocut-logo.png.jpg',
        width: 1200,
        height: 630,
        alt: 'Initiate Production Collaboration with NeoCut Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Initiate Production Collaboration | NeoCut Digital',
    description: 'Submit your project brief for immediate creative review, or connect directly via WhatsApp (+880 1931 245914) or official studio email.',
    images: ['/assets/logo/neocut-logo.png.jpg'],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contact NeoCut Digital',
      url: `${siteUrl}/contact`,
      description: 'Initiate a commercial video production brief or reach creative leadership.',
      mainEntity: {
        '@type': 'ContactPoint',
        telephone: '+880-1931-245914',
        email: 'pixelcraftbysaif@gmail.com',
        contactType: 'sales',
        areaServed: 'Global',
        availableLanguage: ['English', 'Bengali'],
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
          name: 'Contact',
          item: `${siteUrl}/contact`,
        },
      ],
    },
  ],
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
