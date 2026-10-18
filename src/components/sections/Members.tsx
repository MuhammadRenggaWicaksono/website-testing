'use client';

import { useState, useEffect } from 'react';

interface Member {
  id: string;
  name: string;
  role: string;
  photo_url?: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch('/api/members');
        const json = await res.json();
        if (json.status && json.data) {
          setMembers(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data member:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  const tilts = ['tilt-left', 'tilt-right', 'tilt-left-sm', 'tilt-right-sm'];

  return (
    <section id="anggota" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-2">
          <span className="text-brandRed-deep font-extrabold text-lg sm:text-xl block">Anggota</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Meet the Core Team!</h2>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Memuat data pengurus...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">Belum ada data pengurus terdaftar.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {members.map((m, idx) => (
              <div key={m.id || idx} className={`polaroid-card ${tilts[idx % tilts.length]} bg-white p-4 pt-6 pb-6 rounded-lg shadow-polaroid border border-gray-100 relative`}>
                <div className="w-4 h-4 bg-amber-500 rounded-full mx-auto -mt-3 mb-3 shadow-inner border-2 border-white"></div>
                <div className="bg-gray-100 aspect-[4/5] rounded overflow-hidden mb-4">
                  <img src={m.photo_url || 'https://placehold.co/400x500?text=DSC+Member'} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left px-1">
                  <h4 className="font-extrabold text-gray-900 text-lg">{m.name}</h4>
                  <p className="text-xs font-semibold text-gray-500">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}