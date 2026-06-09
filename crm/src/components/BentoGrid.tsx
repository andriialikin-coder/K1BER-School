import { Clock, Apple, Users, Gamepad2, Sparkles } from 'lucide-react';

const features = [
  {
    title: "Зручний Формат",
    desc: (
      <>
        Заняття тривають 2 години, проходять по <strong className="text-white font-semibold">вихідних (Субота та Неділя)</strong>. Обов'язково включають інтерактивну перерву.
      </>
    ),
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />,
    className: "md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/20 hover:border-cyan-500/50",
    glow: "bg-cyan-500/10"
  },
  {
    title: "Турбота про дітей",
    desc: (
      <>
        <strong className="text-white font-semibold">Безкоштовні корисні перекуси</strong> для дітей під час перерви. Ваша дитина завжди буде сита та з гарним настроєм.
      </>
    ),
    icon: <Apple className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />,
    className: "md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border-orange-500/20 hover:border-orange-500/50",
    glow: "bg-orange-500/10"
  },
  {
    title: "Фокус на кожному",
    desc: (
      <>
        Максимальне наповнення групи — <strong className="text-white font-semibold">всього 13 дітей</strong>. Індивідуальний підхід до кожного майбутнього інженера.
      </>
    ),
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />,
    className: "md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border-purple-500/20 hover:border-purple-500/50",
    glow: "bg-purple-500/10"
  },
  {
    title: "Кібермаркет (Гейміфікація)",
    desc: (
      <>
        Унікальна екосистема. За успіхи в навчанні діти заробляють <strong className="text-white font-semibold">«кіберони»</strong>, які двічі на рік витрачають на реальному ярмарку крутих гаджетів та мерчу.
      </>
    ),
    icon: <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />,
    className: "md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border-emerald-500/20 hover:border-emerald-500/50",
    glow: "bg-emerald-500/10"
  }
];

export function BentoGrid() {
  return (
    <section id="about" className="relative w-full border-y border-slate-800/50 overflow-hidden">
      {/* Фоновий Image: summer.webp */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/summer.webp')] bg-cover bg-center opacity-30 sm:opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Унікальні переваги</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            Чому{' '}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            ми?
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Те, що робить навчання у K1BER School дійсно особливим та комфортним
        </p>
      </div>
      
      {/* Сітка 2x2 для 4 карток */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr max-w-5xl mx-auto">
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
            
            <h3 className="font-bold text-white mb-4 leading-snug text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {feature.title}
            </h3>
            
            <p className="text-slate-400 leading-relaxed text-base md:text-lg">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
