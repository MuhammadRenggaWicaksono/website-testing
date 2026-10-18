'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    news: 0,
    feedback: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [resM, resE, resN, resF] = await Promise.all([
          fetch('/api/members'),
          fetch('/api/events'),
          fetch('/api/news'),
          fetch('/api/feedback'),
        ]);

        const [dataM, dataE, dataN, dataF] = await Promise.all([
          resM.json(),
          resE.json(),
          resN.json(),
          resF.json(),
        ]);

        setStats({
          members: dataM.data?.length || 0,
          events: dataE.data?.length || 0,
          news: dataN.data?.length || 0,
          feedback: dataF.data?.length || 0,
        });
      } catch (err) {
        console.error('Gagal memuat statistik:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    { title: 'Total Members', count: stats.members, icon: '👥', color: 'bg-blue-500', href: '/admin/members' },
    { title: 'Total Events', count: stats.events, icon: '📅', color: 'bg-amber-500', href: '/admin/events' },
    { title: 'Total News / Artikel', count: stats.news, icon: '📰', color: 'bg-emerald-500', href: '/admin/news' },
    { title: 'Feedback Masuk', count: stats.feedback, icon: '💬', color: 'bg-purple-500', href: '/admin/feedback' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Selamat Datang, Admin! 👋</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Kelola seluruh informasi dan konten website profil UKM Developer Student Club di sini.
        </p>
      </div>

      {/* Grid Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <Link key={i} href={c.href} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 hover:shadow-md transition-all flex items-center justify-between group">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{c.title}</span>
              <span className="text-3xl font-black text-gray-900">
                {loading ? '...' : c.count}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${c.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
              {c.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Panduan Bantuan Admin */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Petunjuk Pengelolaan (CRUD)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 space-y-1">
            <h4 className="font-bold text-gray-800">1. Otorisasi Otomatis</h4>
            <p>Setiap operasi Tambah, Edit, dan Hapus (POST/PUT/DELETE) akan otomatis melampirkan Bearer Token dari login kamu.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-100 space-y-1">
            <h4 className="font-bold text-gray-800">2. Supabase Storage</h4>
            <p>Saat menambah foto member atau cover berita, file akan diunggah ke Supabase Bucket secara otomatis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}