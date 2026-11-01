import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  reactStrictMode: true,
  poweredByHeader: false, // Security: hide X-Powered-By header
  productionBrowserSourceMaps: false, // Security: strictly prevent source map exposure (VULN-10)
  compress: true, // Performance: enable gzip / brotli compression
  outputFileTracingRoot: path.resolve(__dirname), // Direct Next.js build tracer to this directory

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },

  async headers() {
    return [
      {
        // 1-year immutable caching for static assets
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'", // Hardened: removed 'unsafe-eval' (VULN-04)
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://drive.google.com https://*.googleusercontent.com",
              "font-src 'self' data:",
              "frame-src 'self' https://drive.google.com https://*.googleusercontent.com",
              "connect-src 'self' https://drive.google.com https://*.googleusercontent.com https://www.googleapis.com",
              "media-src 'self' blob: https://drive.google.com https://*.googleusercontent.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'", // Clickjacking protection (VULN-02)
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
