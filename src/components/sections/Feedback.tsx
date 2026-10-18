'use client';

import { useState, useEffect } from 'react';

interface FeedbackItem {
  id?: string;
  name: string;
  message: string;
  created_at?: string;
}

export default function Feedback() {
  const [selectedEmoji, setSelectedEmoji] = useState('😄');
  const [feedbackText, setFeedbackText] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [chatStream, setChatStream] = useState<FeedbackItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // 1. Ambil data feedback terkini dari API
  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const res = await fetch('/api/feedback');
        const json = await res.json();
        if (json.status && json.data) {
          setChatStream(json.data);
        }
      } catch (err) {
        console.error('Gagal memuat feedback:', err);
      }
    }
    loadFeedbacks();
  }, []);

  // 2. Kirim feedback baru (POST /api/feedback)
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        sender_name: nameInput || 'Anonim',
        message: `${selectedEmoji} ${feedbackText}`,
      };

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.status) {
        setChatStream([json.data || { name: payload.sender_name, message: payload.message }, ...chatStream]);
        setFeedbackText('');
        setNameInput('');
        setToastMsg('Feedback berhasil dikirimkan!');
        setTimeout(() => setToastMsg(''), 3500);
      }
    } catch (err) {
      console.error('Gagal mengirim feedback:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* TOAST NOTIFICATION */}
      <div className={`fixed top-20 right-5 z-50 transition-all duration-300 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 ${toastMsg ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        <div>
          <h4 className="font-bold text-sm">Terima Kasih!</h4>
          <p className="text-xs text-emerald-100">{toastMsg}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Form Feedback */}
          <div className="lg:col-span-6 bg-slate-50 p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brandRed-deep mb-2">Beri Feedback</h3>
            <p className="text-gray-600 text-sm mb-6">Anggota maupun bukan, semua masukan sangat berharga untuk kami.</p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nama kamu (Opsional)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-xs focus:border-brandOrange outline-none"
                />
              </div>

              <div className="flex items-center justify-between max-w-sm gap-2">
                {['😟', '😐', '🙂', '😄', '😍'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`p-3 rounded-2xl border text-2xl hover:scale-110 transition-all ${selectedEmoji === emoji ? 'border-brandOrange bg-amber-50' : 'border-gray-200'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={4}
                required
                placeholder="Tulis kesan dan saran disini..."
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-brandOrange text-sm resize-none outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brandOrange hover:bg-brandOrange-dark text-white font-extrabold py-4 rounded-2xl shadow-md transition-all text-base"
              >
                {submitting ? 'Mengirim...' : 'Kirim Feedback'}
              </button>
            </form>
          </div>

          {/* Stream Obrolan Mobile */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-white overflow-hidden p-4 border-[12px] border-gray-800 rounded-[40px] shadow-2xl">
              <div className="w-32 h-4 bg-gray-800 rounded-b-xl mx-auto mb-6"></div>
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {chatStream.length === 0 ? (
                  <p className="text-center text-xs text-gray-400 py-8">Belum ada feedback. Jadilah yang pertama!</p>
                ) : (
                  chatStream.map((item, idx) => (
                    <div key={item.id || idx} className="bg-brandOrange p-4 rounded-2xl text-white shadow-sm space-y-1">
                      <h5 className="font-bold text-sm text-amber-950">{item.name || 'Anonim'}</h5>
                      <p className="text-xs font-medium leading-relaxed">{item.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}