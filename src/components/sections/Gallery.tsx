'use client';

import { useState } from 'react';

export default function Gallery() {
  const [modal, setModal] = useState<{ isOpen: boolean; src: string; caption: string }>({
    isOpen: false,
    src: '',
    caption: '',
  });

  const openModal = (src: string, caption: string) => setModal({ isOpen: true, src, caption });
  const closeModal = () => setModal({ isOpen: false, src: '', caption: '' });

  const galleryItems = [
    {
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      fullImg: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      date: '3 Oktober 2026',
      title: 'Workshop Fullstack Web Development',
      caption: 'Workshop Code & Coffee - 3 Oktober 2026',
    },
    {
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      fullImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      date: '28 September 2026',
      title: 'Internal Study & Debugging Session',
      caption: 'Hackathon Brainstorming Session',
    },
    {
      img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      fullImg: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      date: '15 September 2026',
      title: 'Tech Sharing & Project Awarding',
      caption: 'Tech Talk & Partner Showcase',
    },
  ];

  return (
    <section id="galeri" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-1">
          <span className="text-brandRed-deep font-extrabold text-lg sm:text-xl block">Galeri</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Dokumentasi Kegiatan Kami</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-md cursor-pointer aspect-[4/3]"
              onClick={() => openModal(item.fullImg, item.caption)}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <p className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm self-end px-2.5 py-1 rounded-md mb-auto">{item.date}</p>
                <h4 className="text-white font-bold text-base">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL PREVIEW */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black transition-colors focus:outline-none z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="bg-black flex items-center justify-center max-h-[75vh]">
              <img src={modal.src} alt={modal.caption} className="max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="p-5 bg-white text-center">
              <p className="text-gray-800 font-bold text-base">{modal.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}