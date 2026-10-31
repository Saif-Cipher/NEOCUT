import './globals.css';

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
      <body className="min-h-screen bg-[#090B0E] text-[#EDEDED] antialiased">
        {children}
      </body>
    </html>
  );
}
