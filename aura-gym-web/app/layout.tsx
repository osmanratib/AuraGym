import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Aura Gym — Athletic Performance & Recovery Sanctuary',
  description: 'A premium fitness sanctuary fusing biomechanical strength training, metabolic conditioning, and active cellular recovery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-aura-canvas text-aura-ink antialiased">
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
