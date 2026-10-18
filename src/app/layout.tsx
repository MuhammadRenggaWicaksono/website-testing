import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/utils/SmoothScroll';

export const metadata: Metadata = {
  title: 'UKM Developer Student Club',
  description: 'Satu Komunitas, Sejuta Baris Kode. Ekosistem inovasi digital mahasiswa Universitas Mulia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-white text-gray-800 font-sans">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}