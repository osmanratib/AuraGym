import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Aura Gym — Elite Athletic Performance & Recovery Sanctuary',
  description: 'A premium, motion-led fitness sanctuary fusing biomechanical strength training, metabolic conditioning, and cold contrast recovery.',
  keywords: ['gym', 'luxury fitness', 'strength training', 'recovery', 'athletic performance', 'HIIT', 'olympic lifting'],
  openGraph: {
    title: 'Aura Gym — Elite Athletic Performance & Recovery Sanctuary',
    description: 'Transform your physical ceiling with calibrated biomechanics, elite master coaches, and contrast recovery.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-aura-black text-aura-bone antialiased selection:bg-aura-ember/30 selection:text-white">
        <AuthProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
