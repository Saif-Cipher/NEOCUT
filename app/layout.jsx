import './globals.css';
import GlobalAmbientBackground from '@/components/effects/GlobalAmbientBackground';
import TransitionProvider from '@/components/motion/TransitionProvider';
import InvertedCursor from '@/components/ui/inverted-cursor';

export const metadata = {
  title: 'NeoCut Digital — High-Impact Video Production Studio',
  description: 'NeoCut Digital delivers premium brand promotions, kids animation, cinematic storytelling, and viral 3D explanation videos.',
  icons: {
    icon: '/assets/logo/neocut-logo.png.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050914] text-[#EDEDED] antialiased relative">
        <GlobalAmbientBackground />
        <InvertedCursor />
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
