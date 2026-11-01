import './globals.css';
import GlassFold from '@/components/ui/glass-fold';
import TransitionProvider from '@/components/motion/TransitionProvider';
import InvertedCursor from '@/components/ui/inverted-cursor';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NeoCut Digital — High-Impact Video Production Studio',
    template: '%s | NeoCut Digital',
  },
  description: 'NeoCut Digital is an avant-garde video production studio delivering commercial brand films, preschool 3D character series, documentaries, and viral 3D explainers.',
  applicationName: 'NeoCut Digital',
  authors: [{ name: 'Saif', url: `${siteUrl}/about` }],
  creator: 'Saif',
  publisher: 'NeoCut Digital',
  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NeoCut Digital — High-Impact Video Production Studio',
    description: 'Cinematic video production, 3D character animation, and viral anatomical explainers engineered for maximum brand resonance.',
    url: siteUrl,
    siteName: 'NeoCut Digital',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/thumbnails/hero/references/hero-1-ref.jpg',
        width: 1200,
        height: 630,
        alt: 'NeoCut Digital Flagship Studio Showreel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeoCut Digital — High-Impact Video Production Studio',
    description: 'Cinematic video production, 3D character animation, and viral anatomical explainers engineered for maximum brand resonance.',
    images: ['/assets/thumbnails/hero/references/hero-1-ref.jpg'],
    creator: '@neocutdigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/logo/neocut-logo.png.jpg', sizes: 'any' },
      { url: '/assets/logo/neocut-logo.png.jpg', type: 'image/jpeg', sizes: '192x192' },
    ],
    apple: [
      { url: '/assets/logo/neocut-logo.png.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'VideoProductionCompany'],
      '@id': `${siteUrl}/#organization`,
      name: 'NeoCut Digital',
      legalName: 'NeoCut Digital',
      url: siteUrl,
      logo: `${siteUrl}/assets/logo/neocut-logo.png.jpg`,
      image: `${siteUrl}/assets/thumbnails/hero/references/hero-1-ref.jpg`,
      description: 'Avant-garde creative studio operating at the frontier of commercial advertising, 3D character animation, and viral anatomical visualization.',
      founder: {
        '@type': 'Person',
        name: 'Saif',
        jobTitle: 'Founder & Creative Director',
        sameAs: `${siteUrl}/about`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+880-1931-245914',
          contactType: 'sales',
          email: 'pixelcraftbysaif@gmail.com',
          availableLanguage: ['English', 'Bengali'],
        },
      ],
      areaServed: 'Global',
      knowsAbout: [
        'Commercial Video Production',
        '3D Character Rigging & Animation',
        'Kinetic Motion Typography',
        'Anatomical 3D Simulation',
        'ACEScc Color Grading',
        'Aerial Cinematography',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'NeoCut Digital',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#050B1F] text-[#FFFFFF] antialiased relative selection:bg-[#2563EB] selection:text-[#FFFFFF]">
        {/* Skip to Main Content Bypass Link for Keyboard Accessibility (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-3 focus:bg-[#2563EB] focus:text-[#FFFFFF] focus:font-bold focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#5CB2FF] transition-all duration-200"
        >
          Skip to main content
        </a>
        <GlassFold />
        <InvertedCursor />
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
