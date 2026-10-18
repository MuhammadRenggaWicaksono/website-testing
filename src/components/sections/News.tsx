'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  author?: string;
  created_at?: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch('/api/news');
        const json = await res.json();
        if (json.status && json.data) {
          setNews(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data berita:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-gray-400 text-sm">Memuat berita...</div>;
  }

  if (news.length === 0) {
    return <div className="py-16 text-center text-gray-400 text-sm">Belum ada berita diterbitkan.</div>;
  }

  const headline = news[0];
  const sideNews = news.slice(1, 4);

  return (
    <section id="berita" className="py-16 md:py-24 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-1">
          <span className="text-brandRed-deep font-extrabold text-lg block">Berita & Tulisan</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Dari Dalam Komunitas</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Berita Utama / Headline */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="bg-gray-200 h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" alt={headline.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-brandRed-deep text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Announcement</span>
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-extrabold text-gray-900">{headline.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{headline.content}</p>
              </div>
            </div>
            <div className="px-6 sm:px-8 pb-6 text-xs font-semibold text-gray-500 flex justify-between border-t border-gray-100 pt-4">
              <span>{headline.author || 'Admin DSC'}</span>
              <span>{headline.created_at ? new Date(headline.created_at).toLocaleDateString('id-ID') : 'Baru saja'}</span>
            </div>
          </div>

          {/* List Berita Samping */}
          <div className="lg:col-span-5 space-y-4">
            {sideNews.length === 0 ? (
              <div className="p-5 bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">Tidak ada artikel tambahan.</div>
            ) : (
              sideNews.map((item) => (
                <div key={item.id || item.slug} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2 hover:border-brandOrange transition-all">
                  <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded">News</span>
                  <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}