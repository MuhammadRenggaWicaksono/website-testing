'use client';

import { useState, useEffect } from 'react';

interface LeaderItem {
  id: string;
  member_id: string;
  score: number;
  members?: {
    name: string;
    role: string;
  };
}

export default function AdminLeaderboardPage() {
  const [list, setList] = useState<LeaderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState('');
  const [scoreInput, setScoreInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const json = await res.json();
      if (json.status && json.data) {
        setList(json.data);
      }
    } catch (err) {
      console.error('Gagal memuat leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleUpdateScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || scoreInput === '') return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/leaderboard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          member_id: selectedMember,
          score: Number(scoreInput),
        }),
      });

      const json = await res.json();
      if (json.status) {
        setToast('Skor berhasil diperbarui!');
        setScoreInput('');
        setSelectedMember('');
        fetchLeaderboard();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err) {
      console.error('Gagal update skor:', err);
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
        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Leaderboard</h1>
        <p className="text-xs text-gray-500">Atur skor/poin kontribusi anggota UKM DSC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Update Skor */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Update / Tambah Skor</h3>
          <form onSubmit={handleUpdateScore} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ID Anggota / Member *</label>
              <input
                type="text"
                required
                placeholder="Masukkan UUID Member"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Jumlah Poin / Skor *</label>
              <input
                type="number"
                required
                placeholder="Contoh: 250"
                value={scoreInput}
                onChange={(e) => setScoreInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              {submitting ? 'Simpan...' : 'Update Poin'}
            </button>
          </form>
        </div>

        {/* List Ranking */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Papan Peringkat Saat Ini</h3>
          {loading ? (
            <p className="text-xs text-gray-400">Memuat data...</p>
          ) : list.length === 0 ? (
            <p className="text-xs text-gray-400">Belum ada data leaderboard.</p>
          ) : (
            <div className="space-y-3">
              {list.map((item, index) => (
                <div key={item.id || index} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-xs text-brandOrange w-5">#{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{item.members?.name || item.member_id}</h4>
                      <p className="text-[10px] text-gray-500">{item.members?.role || 'Anggota'}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-brandRed-deep text-xs">{item.score} Poin</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}