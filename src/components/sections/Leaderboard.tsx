'use client';

import { useState, useEffect } from 'react';

interface LeaderItem {
  id: string;
  member_id: string;
  score: number;
  members?: {
    name: string;
    role: string;
    image_url?: string;
  };
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const json = await res.json();
        if (json.status && json.data) {
          setLeaders(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, []);

  return (
    <section id="leaderboard" className="py-16 md:py-24 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-1 text-center">
          <span className="text-brandRed-deep font-extrabold text-lg block">Papan Peringkat</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Top Contributor Community</h2>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Memuat leaderboard...</div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">Belum ada skor tercatat.</div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-3">
            {leaders.map((item, index) => (
              <div key={item.id || index} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${index === 0 ? 'bg-amber-400 text-white' : index === 1 ? 'bg-slate-300 text-slate-800' : index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    #{index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{item.members?.name || item.member_id}</h4>
                    <p className="text-xs text-gray-500">{item.members?.role || 'Anggota DSC'}</p>
                  </div>
                </div>
                <span className="font-black text-brandRed-deep text-sm">{item.score} Poin</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}