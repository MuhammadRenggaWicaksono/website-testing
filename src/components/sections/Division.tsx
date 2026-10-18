export default function Division() {
  const divisions = [
    { id: '01', title: 'Web Development', desc: 'Frontend & backend modern — React, Next.js, Node.js, Express, Tailwind CSS & API design.' },
    { id: '02', title: 'Mobile Development', desc: 'Android & cross-platform apps — Kotlin, Flutter, Dart, React Native & mobile UX.' },
    { id: '03', title: 'UI/UX Design', desc: 'User research, wireframing, high-fidelity prototyping, micro-interactions & Figma design systems.' },
    { id: '04', title: 'Data Science & AI', desc: 'Analisis data, Machine Learning models, Computer Vision, Python, OpenCV & TensorFlow.' },
    { id: '05', title: 'Cloud & IoT', desc: 'Infrastructure, GCP, Supabase, ESP32 microcontrollers, relays, sensor networks & DevOps.' },
    { id: '06', title: 'Game Development', desc: 'Unity 3D, Godot, C#, game mechanics, physics engines, and interactive digital media.' }
  ];

  return (
    <section id="divisi" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-2">
          <span className="text-brandRed-deep font-extrabold text-lg sm:text-xl block">
            6 Divisi Utama
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">
            Pilih Jalurmu & Berkolaborasi
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Pindah jalur kapan saja. Kolaborasi lintas divisi sangat didorong untuk menciptakan solusi komprehensif.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((divisi) => (
            <div key={divisi.id} className="p-6 rounded-2xl border border-gray-100 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 transition-all shadow-sm">
              <span className="text-brandRed-deep font-mono font-bold text-xs bg-amber-200/80 px-2.5 py-1 rounded-md">{divisi.id}</span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-3 mb-2">{divisi.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{divisi.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}