export default function VisiMisi() {
  return (
    <section id="visi-misi" className="py-16 md:py-24 bg-slate-50/60 relative overflow-hidden">
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-brandOrange/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-12 space-y-1">
          <span className="text-brandRed-deep font-extrabold text-lg sm:text-xl block">
            Visi & Misi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">
            Arah yang kami tuju bersama
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-brandRed-deep p-6 sm:p-8 rounded-3xl shadow-xl transform tilt-left hover:rotate-0 transition-transform duration-300">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-inner min-h-[260px] flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-brandOrange mb-4">Visi</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal">
                  Menciptakan ekosistem inovasi digital di kampus untuk melahirkan talenta teknologi yang kolaboratif, kompeten, dan siap memberikan dampak nyata bagi masyarakat.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {[
              { id: 1, title: 'Belajar Tanpa Batas', desc: 'Menyelenggarakan kelas, workshop, dan mentoring agar setiap anggota, dari pemula hingga mahir, bisa berkembang secara konsisten.' },
              { id: 2, title: 'Kolaborasi Aktif', desc: 'Membangun budaya kerja tim antardisiplin untuk merancang dan mengembangkan portofolio produk digital secara kolektif.' },
              { id: 3, title: 'Inkubasi Inovasi', desc: 'Menjadi ruang eksperimen bagi ide-ide mahasiswa agar dapat direalisasikan menjadi aplikasi atau sistem yang scalable.' },
            ].map((misi) => (
              <div key={misi.id} className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brandOrange text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  {misi.id}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{misi.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{misi.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}