'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    // Menggunakan IntersectionObserver yang lebih akurat & kompatibel dengan Lenis
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px', // area pemicu di tengah viewport
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navItems = ['beranda', 'tentang', 'divisi', 'proyek', 'feedback'];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="#beranda" className="flex items-center gap-3 group">
          <Image
            src="/logo-dsc.png"
            alt="Logo DSC Universitas Mulia"
            width={50}
            height={50}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-gray-800 tracking-tight leading-tight">
              Developer Student Club
            </span>
            <span className="text-[10px] text-gray-500 font-semibold uppercase">
              Universitas Mulia
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-gray-700">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`hover:text-brandRed-deep py-1 transition-colors ${
                activeSection === item ? 'text-brandRed-deep border-b-2 border-brandRed-deep' : ''
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a
            href="#kontak"
            className="bg-brandRed-deep hover:bg-brandRed-dark text-white px-4 py-2 rounded-full shadow-sm transition-colors"
          >
            Bergabung
          </a>
        </nav>
      </div>
    </header>
  );
}