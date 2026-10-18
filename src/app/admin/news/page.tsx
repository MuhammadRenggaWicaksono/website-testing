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

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    author: 'Admin DSC',
  });

  const loadNews = async () => {
    try {
      const res = await fetch('/api/news');
      const json = await res.json();
      if (json.status && json.data) {
        setNewsList(json.data);
      }
    } catch (err) {
      console.error('Gagal memuat berita:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-\$)+/g, '');
    setForm({ ...form, title: val, slug: generatedSlug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.status) {
        setToast('Berita berhasil diterbitkan!');
        setForm({ title: '', slug: '', content: '', author: 'Admin DSC' });
        loadNews();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err) {
      console.error('Gagal membuat berita:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/news/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (json.status) {
        setToast('Berita berhasil dihapus!');
        loadNews();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err) {
      console.error('Gagal menghapus berita:', err);
    }
  };

  return (
    <div className="space-y-8">
      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg text-xs font-bold fixed top-6 right-6 z-50">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Berita & Pengumuman</h1>
        <p className="text-xs text-gray-500">Rilis artikel atau kabar terbaru seputar kegiatan DSC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Berita */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Tulis Berita Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Judul Berita *</label>
              <input
                type="text"
                required
                placeholder="Judul artikel"
                value={form.title}
                onChange={handleTitleChange}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug URL (Otomatis)</label>
              <input
                type="text"
                readOnly
                value={form.slug}
                className="w-full p-3 rounded-xl border border-gray-100 bg-slate-50 text-xs text-gray-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Penulis</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Isi Berita *</label>
              <textarea
                rows={5}
                required
                placeholder="Tuliskan isi artikel..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              {submitting ? 'Menerbitkan...' : 'Terbitkan Berita'}
            </button>
          </form>
        </div>

        {/* List Berita */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Daftar Berita Diterbitkan</h3>
          {loading ? (
            <p className="text-xs text-gray-400">Memuat berita...</p>
          ) : newsList.length === 0 ? (
            <p className="text-xs text-gray-400">Belum ada berita yang diterbitkan.</p>
          ) : (
            <div className="space-y-3">
              {newsList.map((n) => (
                <div key={n.id || n.slug} className="p-4 bg-slate-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 mb-1">{n.title}</h4>
                    <p className="text-[10px] text-gray-500">Penulis: {n.author || 'Admin'} | Slug: /{n.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(n.slug)}
                    className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}