export default function TechStack() {
  const stacks = [
    { title: 'React & Next.js', category: 'Frontend Web' },
    { title: 'Flutter & Dart', category: 'Mobile Cross-Platform' },
    { title: 'Node.js & Python', category: 'Backend & AI' },
    { title: 'ESP32 & IoT', category: 'Hardware Automation' },
    { title: 'Figma & UI/UX', category: 'Design Systems' },
    { title: 'GCP & Docker', category: 'Cloud Infrastructure' },
  ];

  return (
    <section id="techstack" className="py-16 md:py-24 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-brandRed-deep font-extrabold text-lg block">Ekosistem Teknologi</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandOrange">Tech Stack Yang Kami Gunakan</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stacks.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center hover:border-brandOrange transition-all">
              <span className="font-bold text-gray-800 text-sm">{item.title}</span>
              <span className="text-[10px] text-gray-500">{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}