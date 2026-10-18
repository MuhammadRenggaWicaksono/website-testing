'use client';

import { useState, useEffect } from 'react';
import { uploadImage } from '@/utils/uploadImage'; // Import utilitas upload sesuai PRD v1.3

interface Member {
  id: string;
  name: string;
  role: string;
  photo_url?: string;
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({
    name: '',
    role: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const loadMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const json = await res.json();
      if (json.status && json.data) {
        setMembers(json.data);
      }
    } catch (err) {
      console.error('Gagal memuat member:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let photoUrl = '';

      // 1. Jika pengguna memilih file gambar, unggah ke Supabase Storage via uploadImage()
      if (selectedFile) {
        photoUrl = await uploadImage(selectedFile);
      }

      // 2. Kirim payload data member beserta nama file/URL publik gambar dari Storage
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          photo_url: photoUrl,
        }),
      });

      const json = await res.json();
      if (json.status) {
        setToast('Member dan Foto berhasil ditambahkan!');
        setForm({ name: '', role: '' });
        setSelectedFile(null);
        loadMembers();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Gagal menambah member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus member ini?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (json.status) {
        setToast('Member berhasil dihapus!');
        loadMembers();
        setTimeout(() => setToast(''), 3000);
      }
    } catch (err) {
      console.error('Gagal menghapus member:', err);
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
        <h1 className="text-2xl font-extrabold text-gray-900">Kelola Anggota & Pengurus</h1>
        <p className="text-xs text-gray-500">Tambah, edit, atau hapus data tim UKM DSC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Member */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Tambah Member Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Muhammad Rengga"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Jabatan / Divisi *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Core Team / Web Dev"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-brandOrange"
              />
            </div>

            {/* Input Upload Gambar Asli */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Upload Foto Profil (Maks 2MB)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full p-2 border border-gray-200 rounded-xl text-xs bg-slate-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brandOrange file:text-white hover:file:bg-brandOrange-dark"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              {submitting ? 'Mengunggah & Menyimpan...' : 'Tambah Member'}
            </button>
          </form>
        </div>

        {/* List Members */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 mb-4">Daftar Member</h3>
          {loading ? (
            <p className="text-xs text-gray-400">Memuat data...</p>
          ) : members.length === 0 ? (
            <p className="text-xs text-gray-400">Belum ada member terdaftar.</p>
          ) : (
            <div className="space-y-3">
              {members.map((m) => (
                <div key={m.id} className="p-3.5 bg-slate-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.photo_url || 'https://placehold.co/100'}
                      alt={m.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{m.name}</h4>
                      <p className="text-[10px] text-gray-500">{m.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(m.id)}
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