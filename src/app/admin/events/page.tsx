'use client';

import { useState, useEffect } from 'react';

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  status: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    status: 'Akan Datang',
  });

  const loadEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const json = await res.json();
      if (json.status && json.data) {
        setEvents(json.data);
      }
    } catch (err) {
      console.error('Gagal memuat event:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (json.status) {
        setToast('Event berhasil diterbitkan!');
        setForm({ title: '', description: '', event_date: '', location: '', status: 'Akan Datang' });
        loadEvents();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err) {
      console.error('Gagal membuat event:', err);
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Event & Workshop</h1>
        <p className="text-xs text-gray-500">Rilis jadwal kegiatan dan workshop UKM DSC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Event */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Buat Event Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Judul Event *</label>
              <input
                type="text"
                required
                placeholder="Contoh: DSC Annual Summit 2026"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tanggal Event *</label>
              <input
                type="date"
                required
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Lokasi *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Convention Hall Kampus"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status Event</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange bg-white"
              >
                <option>Akan Datang</option>
                <option>Berlangsung</option>
                <option>Selesai</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Ringkas</label>
              <textarea
                rows={3}
                placeholder="Tuliskan detail singkat acara..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              {submitting ? 'Menerbitkan...' : 'Terbitkan Event'}
            </button>
          </form>
        </div>

        {/* List Events */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Daftar Event Terdaftar</h3>
          {loading ? (
            <p className="text-xs text-gray-400">Memuat event...</p>
          ) : events.length === 0 ? (
            <p className="text-xs text-gray-400">Belum ada event yang dibuat.</p>
          ) : (
            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.id} className="p-4 bg-slate-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-gray-900">{ev.title}</span>
                      <span className="text-[10px] bg-amber-100 text-brandRed-deep font-bold px-2 py-0.5 rounded-full">{ev.status}</span>
                    </div>
                    <p className="text-[10px] text-gray-500">📍 {ev.location} | 📅 {new Date(ev.event_date).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}