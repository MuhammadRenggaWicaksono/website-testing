'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Uji coba otentikasi dengan memanggil salah satu API yang terproteksi (misal POST /api/events tanpa data)
      // atau memverifikasi ketersediaan token.
      const testRes = await fetch('/api/feedback', {
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
        },
      });

      // Jika status bukan 401 (Unauthorized), berarti API_SECRET_KEY cocok!
      if (testRes.status !== 401) {
        // Simpan token rahasia ke localStorage
        localStorage.setItem('adminToken', apiKey.trim());
        
        // Redirect ke Dashboard Admin
        router.push('/admin');
      } else {
        setErrorMsg('Kunci Rahasia Admin (API Secret Key) salah!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Terjadi kesalahan sistem. Periksa koneksi backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      {/* Container Utama */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brandRed-deep to-brandOrange p-1 shadow-md mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-2">
              <svg className="w-full h-full text-brandRed-deep" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Portal Admin DSC
          </h2>
          <p className="text-xs text-gray-500">
            Masukan Kunci Rahasia Admin untuk mengelola sistem
          </p>
        </div>

        {/* Pesan Error */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              API Secret Key / Passcode Admin *
            </label>
            <input
              type="password"
              required
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Masukkan Kunci Rahasia..."
              className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:border-brandOrange focus:ring-2 focus:ring-amber-100 outline-none transition-all font-mono"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Nilai yang terdaftar di <code className="bg-gray-100 px-1 py-0.5 rounded">API_SECRET_KEY</code> pada file .env
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-extrabold py-3.5 rounded-xl shadow transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Memverifikasi...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Link Kembali */}
        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-brandRed-deep font-semibold transition-colors">
            ← Kembali ke Beranda Utama
          </Link>
        </div>

      </div>
    </div>
  );
}