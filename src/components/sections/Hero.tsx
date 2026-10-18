import Link from 'next/link';

export default function Hero() {
  return (
    <section id="beranda" className="relative hero-bg-gradient pt-8 pb-20 md:py-24 overflow-hidden">
      {/* Pola Bintik Oranye Kiri Bawah */}
      <div className="absolute bottom-6 left-4 w-28 h-28 bg-dots opacity-30 pointer-events-none hidden sm:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Teks & Statistik Hero */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-block bg-amber-100 text-brandRed-deep text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-amber-200">
              UKM Developer Student Club · Universitas Mulia
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brandRed-deep leading-tight tracking-tight">
              Satu Komunitas, <br/>
              <span className="text-brandOrange-vibrant">Sejuta Baris Kode.</span>
            </h1>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Komunitas mahasiswa yang menulis kode bukan cuma buat nilai — tapi buat produk, eksperimen, merancang arsitektur sistem yang handal, dan portofolio yang bisa dibanggakan.
            </p>

            {/* Tombol CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="#event" className="inline-block bg-brandRed-deep hover:bg-brandRed-dark text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 text-base">
                Lihat Event
              </Link>
              <Link href="#kontak" className="inline-block bg-white hover:bg-amber-50 text-brandRed-deep border-2 border-brandRed-deep font-bold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-base">
                Gabung Sekarang
              </Link>
            </div>

            {/* Counter Statistik */}
            <div className="pt-8 grid grid-cols-4 gap-4 border-t border-gray-200/80 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brandRed-deep">48 +</div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">Anggota Aktif</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brandRed-deep">12 +</div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">Proyek Selesai</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brandRed-deep">18 +</div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">Event & Workshop</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brandRed-deep">9 +</div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">Partner Industri</div>
              </div>
            </div>
          </div>

          {/* Bingkai Foto Hero Merah Miring */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="absolute w-80 h-64 sm:w-96 sm:h-72 bg-brandRed-deep rounded-3xl transform rotate-6 scale-95 shadow-lg translate-y-4"></div>
            
            <div className="relative w-80 sm:w-96 bg-white p-3 sm:p-4 rounded-2xl shadow-floating transform -rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-100">
              <div className="overflow-hidden rounded-xl bg-gray-100 aspect-video relative group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="UKM DSC Team Gathering" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold">UKM DSC Main Team & Members</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}