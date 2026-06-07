import { Cpu, Rocket, Gamepad2, Users, Layers } from 'lucide-react';

const features = [
  {
    title: "Фундамент інженерного мислення",
    desc: "Ми не вчимо просто «клікати мишкою». Дитина починає розуміти логіку алгоритмів, базову архітектуру проєктів та принципи кібербезпеки. Це не абстрактна шкільна інформатика, а реальний технічний скілсет для життя та майбутньої кар'єри.",
    icon: <Cpu className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 hover:border-cyan-500/50",
    glow: "bg-cyan-500/10"
  },
  {
    title: "Еволюція від Споживача до Творця",
    desc: "Замість безцільного скролінгу відео та ігор, дитина вчиться створювати власні IT-продукти. Ми направляємо ігрову залежність у продуктивне русло.",
    icon: <Rocket className="w-7 h-7 text-orange-400" />,
    className: "md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-orange-500/20 hover:border-orange-500/50",
    glow: "bg-orange-500/10"
  },
  {
    title: "Гейміфіковані модулі без сухої теорії",
    desc: "Навчання побудоване у форматі IT-спринтів на базі улюблених платформ дитини (Minecraft, Roblox, Python). Написав рядок коду — миттєво побачив результат.",
    icon: <Gamepad2 className="w-7 h-7 text-purple-400" />,
    className: "md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-purple-500/20 hover:border-purple-500/50",
    glow: "bg-purple-500/10"
  },
  {
    title: "Ментори-практики, а не шкільні вчителі",
    desc: "З резидентами Академії працюють молоді фахівці, які розмовляють з ними однією мовою. Вони проводять Code Review — допомагають знаходити та фіксити баги.",
    icon: <Users className="w-7 h-7 text-blue-400" />,
    className: "md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-blue-500/20 hover:border-blue-500/50",
    glow: "bg-blue-500/10"
  },
  {
    title: "Архітектура Soft & Hard Skills",
    desc: "Ми прокачуємо критичне мислення, навичку працювати в команді та вміння самостійно доводити проєкти до релізу. Це монолітний фундамент для старту.",
    icon: <Layers className="w-7 h-7 text-emerald-400" />,
    className: "md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-500/20 hover:border-emerald-500/50",
    glow: "bg-emerald-500/10"
  }
];

export function BentoGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Що отримає дитина?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Ми перетворюємо захоплення іграми на реальні навички для майбутнього
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-fr">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className={`group relative overflow-hidden rounded-[2rem] border backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${feature.className}`}
          >
            {/* Глоу ефект */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${feature.glow}`} />
            
            <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl inline-block border border-slate-800/80 shadow-inner">
              {feature.icon}
            </div>
            
            <h3 className={`font-bold text-white mb-4 leading-snug ${i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {feature.title}
            </h3>
            
            <p className={`text-slate-400 leading-relaxed ${i === 0 ? 'text-base md:text-lg' : 'text-sm'}`}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
