'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Cek apakah admin sudah login (punya adminToken di localStorage)
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500 font-bold text-sm">Memeriksa Hak Akses Admin...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Ringkasan', href: '/admin', icon: '📊' },
    { label: 'Kelola Members', href: '/admin/members', icon: '👥' },
    { label: 'Kelola Events', href: '/admin/events', icon: '📅' },
    { label: 'Kelola News', href: '/admin/news', icon: '📰' },
    { label: 'Leaderboard', href: '/admin/leaderboard', icon: '🏆' },
    { label: 'Feedback Publik', href: '/admin/feedback', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigasi Admin */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Header Sidebar */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brandOrange flex items-center justify-center font-black text-white text-sm">
              DSC
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-wide">Panel Admin</h2>
              <span className="text-[10px] text-gray-400">UKM Developer Student Club</span>
            </div>
          </div>

          {/* Menus */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brandRed-deep text-white shadow-md'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar (Logout & Back to Web) */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <span>Lihat Web Publik</span>
            <span>↗</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left"
          >
            <span>🚪</span>
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}