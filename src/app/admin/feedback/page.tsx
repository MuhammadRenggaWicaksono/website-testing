'use client';

import { useState, useEffect } from 'react';

interface FeedbackItem {
  id: string;
  name?: string;
  email?: string;
  message: string;
  created_at?: string;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('/api/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json.status && json.data) {
          setFeedbacks(json.data);
        }
      } catch (err) {
        console.error('Gagal memuat feedback:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Kritik & Saran Masuk</h1>
        <p className="text-xs text-gray-500">Kumpulan masukan dan aspirasi dari pengunjung web publik</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Kotak Masuk Feedback</h3>
        {loading ? (
          <p className="text-xs text-gray-400">Memuat masukan...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-xs text-gray-400 py-4">Belum ada feedback yang masuk.</p>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((fb, idx) => (
              <div key={fb.id || idx} className="p-4 bg-slate-50 rounded-xl border border-gray-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-brandOrange">{fb.name || 'Anonim'}</span>
                  {fb.created_at && (
                    <span className="text-[10px] text-gray-400">{new Date(fb.created_at).toLocaleDateString('id-ID')}</span>
                  )}
                </div>
                {fb.email && <p className="text-[10px] text-gray-500">📧 {fb.email}</p>}
                <p className="text-xs text-gray-700 leading-relaxed pt-1 font-medium">{fb.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}