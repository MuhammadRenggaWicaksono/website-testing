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

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        if (json.status && json.data) {
          setEvents(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data event:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <section id="event" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-brandRed-deep font-extrabold text-lg block">Kegiatan & Workshop</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Yang Terjadi & Akan Datang</h2>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Memuat kegiatan...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">Belum ada kegiatan mendatang.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <article key={ev.id} className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500">
                      {new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="bg-amber-100 text-brandRed-deep text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">{ev.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{ev.title}</h3>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-3">{ev.description}</p>
                </div>
                <span className="text-xs font-semibold text-brandOrange">📍 {ev.location}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}