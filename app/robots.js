/**
 * NeoCut Digital — Dynamic Robots.txt Generation
 * Route: /robots.txt
 */

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neocut.digital';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
