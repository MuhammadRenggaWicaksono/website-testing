'use client';

import { useState } from 'react';

export default function Registration() {
  const [toastMsg, setToastMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastMsg('Pendaftaran Anda berhasil dikirimkan!');
    e.currentTarget.reset();
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <section id="kontak" className="py-16 md:py-24 bg-slate-50/60 relative">
      {toastMsg && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <div>
            <h4 className="font-bold text-sm">Terima Kasih!</h4>
            <p className="text-xs text-emerald-100">{toastMsg}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-brandRed-deep font-extrabold text-lg block">Pendaftaran & Kontak</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Bergabung Bersama Kami</h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">Mulai perjalanan teknologi dan pengembangan portofolio kamu di DSC Universitas Mulia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Cara Bergabung</h3>
              <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside leading-relaxed">
                <li>Isi formulir pendaftaran singkat di samping ini.</li>
                <li>Pilih divisi minat utama kamu (bisa eksplorasi divisi lain nanti).</li>
                <li>Tim kami akan mengirimkan link WhatsApp & Discord resmi komunitas.</li>
                <li>Ikuti sesi onboarding pertama & langsung ngoding bareng!</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-900 text-base">Informasi Kontak Direct</h4>
              <div className="space-y-2 text-xs text-gray-600 font-medium">
                <p>📧 Email: <a href="mailto:dsc@university.ac.id" className="text-brandRed-deep font-bold hover:underline">dsc@university.ac.id</a></p>
                <p>📱 WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-brandRed-deep font-bold hover:underline">+62 812-3456-7890</a></p>
                <p>📸 Instagram: <a href="https://instagram.com/dsc.university" target="_blank" rel="noreferrer" className="text-brandRed-deep font-bold hover:underline">@dsc.university</a></p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Formulir Pendaftaran</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap *</label>
                <input type="text" required placeholder="Nama lengkap kamu" className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-brandOrange outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email / NIM *</label>
                <input type="text" required placeholder="email@student.ac.id" className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-brandOrange outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pilihan Divisi Minat *</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-brandOrange outline-none bg-white">
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>UI/UX Design</option>
                  <option>Data Science & AI</option>
                  <option>Cloud & IoT</option>
                  <option>Game Development</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pesan / Alasan Bergabung *</label>
                <textarea rows={3} required placeholder="Tuliskan harapan atau minat kamu..." className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-brandOrange outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold py-3.5 rounded-xl shadow transition-all text-sm">
                Kirim Pendaftaran
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}