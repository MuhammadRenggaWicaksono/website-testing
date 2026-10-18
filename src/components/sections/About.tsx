export default function About() {
  return (
    <section id="tentang" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-2 sm:p-4 bg-brandRed-dark shadow-2xl">
          <div className="rounded-2xl p-2 sm:p-3 bg-brandOrange-vibrant">
            <div className="bg-gradient-to-br from-amber-500 via-brandOrange to-amber-600 rounded-xl p-6 sm:p-10 md:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-brandRed-dark font-extrabold text-base sm:text-lg block tracking-wide uppercase">
                    Tentang Kami
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    Bukan sekadar<br />klub coding.
                  </h2>
                </div>

                <div className="lg:col-span-8 text-white/95 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                  <p>
                    DSC dimulai dari sekelompok kecil mahasiswa yang muak dengan tugas kuliah tanpa konteks dunia nyata. Kami mulai ngobrol tentang teknologi, lalu bikin project bareng, dan tanpa sadar sudah berkembang menjadi ekosistem inovasi digital kampus.
                  </p>
                  <p>
                    Sekarang, DSC jadi tempat di mana kamu bisa belajar stack baru lewat workshop, adu ide di hackathon, merancang antarmuka UI/UX yang intuitif, hingga mengoptimalkan performa database. Tidak ada hierarki kaku — yang ada cuma orang-orang yang sama-sama mau berkembang.
                  </p>
                  <p className="font-bold text-amber-100 text-base">
                    "Kamu tidak perlu jago dulu untuk gabung. Kamu perlu gabung supaya bisa jago."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}