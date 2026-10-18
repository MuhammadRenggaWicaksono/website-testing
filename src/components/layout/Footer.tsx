export default function Footer() {
  return (
    <footer id="kontak" className="bg-gradient-to-br from-brandOrange-vibrant via-brandOrange to-amber-500 text-white pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Udah Siap Ngoding Bareng Kita?
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Daripada pusing debugging sendirian di kamar, mending gabung DSC. Kita belajar bareng, bikin projek seru, dan pastinya nambah koneksi!
        </p>

        <div className="pt-4 space-y-4">
          <span className="block font-bold text-lg text-white">Hubungi Kami</span>
          <div className="flex items-center justify-center gap-6">
            <a href="mailto:dsc@university.ac.id" className="w-14 h-14 rounded-full bg-white text-brandOrange flex items-center justify-center shadow-lg hover:scale-110 transition-all" title="Kirim Email">
              <svg className="w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-lg hover:scale-110 transition-all" title="WhatsApp">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="bg-white text-gray-500 text-xs sm:text-sm text-center py-4 border-t border-gray-100">
        &copy; 2026 UKM Developer Student Club. All rights reserved.
      </div>
    </footer>
  );
}