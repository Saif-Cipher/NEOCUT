/**
 * NeoCut Digital — Web App Manifest
 * Route: /manifest.webmanifest
 */

export default function manifest() {
  return {
    name: 'NeoCut Digital — High-Impact Video Production Studio',
    short_name: 'NeoCut',
    description: 'NeoCut Digital delivers premium brand promotions, kids animation, cinematic storytelling, and viral 3D explanation videos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050914',
    theme_color: '#050914',
    icons: [
      {
        src: '/assets/logo/neocut-logo.png.jpg',
        sizes: '192x192 512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
