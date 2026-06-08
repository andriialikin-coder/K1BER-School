import { useState } from 'react';
import { Gamepad2, Code2, Paintbrush, ShieldCheck, ChevronDown } from 'lucide-react';

const tracks = [
  {
    id: 'gamedev',
    title: 'GameDev',
    description: 'Створення власних світів та ігор. Від ідеї до релізу.',
    icon: <Gamepad2 className="w-8 h-8 text-cyan-400" />,
    color: 'border-cyan-500/30',
    modules: [
      { name: 'Minecraft', desc: 'Архітектура та логіка механізмів' },
      { name: 'Roblox', desc: 'Створення 3D-світів та Lua-скриптінг' }
    ]
  },
  {
    id: 'software',
    title: 'Software',
    description: 'Написання коду, алгоритми та розробка додатків.',
    icon: <Code2 className="w-8 h-8 text-orange-400" />,
    color: 'border-orange-500/30',
    modules: [
      { name: 'Python', desc: 'Основи програмування та створення ботів' }
    ]
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Креатив, UI/UX та візуальне оформлення.',
    icon: <Paintbrush className="w-8 h-8 text-purple-400" />,
    color: 'border-purple-500/30',
    modules: [
      { name: 'Figma', desc: 'Проєктування інтерфейсів та веб-дизайн' }
    ]
  },
  {
    id: 'cyber',
    title: 'Cyber',
    description: 'Кібербезпека та етичний хакінг.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    color: 'border-emerald-500/30',
    modules: [
      { name: 'Cybersecurity', desc: 'Основи безпеки в мережі та захист даних' }
    ]
  }
];

export function BentoModules() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  const toggleTrack = (id: string) => {
    setActiveTrack(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Програма навчання
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          4 головних треки для побудови успішної кар'єри в IT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {tracks.map((track) => {
          const isActive = activeTrack === track.id;
          
          return (
            <div 
              key={track.id}
              onClick={() => toggleTrack(track.id)}
              className="cursor-pointer transition-all duration-300 relative overflow-hidden group"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px'
              }}
            >
              {/* Легкий градиентный фон при наведении */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-white" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl bg-slate-900/80 border ${track.color} shadow-inner`}>
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {track.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base pr-4">
                      {track.description}
                    </p>
                  </div>
                </div>
                
                {/* Иконка стрелки для раскрытия */}
                <div className={`p-2 shrink-0 rounded-full bg-slate-800/50 border border-slate-700/50 transition-transform duration-500 ${isActive ? 'rotate-180 bg-slate-700/80' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-slate-300" />
                </div>
              </div>

              {/* Раскрывающийся контент (Плавная анимация через grid) */}
              <div 
                className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-800/60">
                    {track.modules.map((mod, idx) => (
                      <div key={idx} className="flex flex-col bg-slate-900/40 rounded-xl p-4 border border-slate-800/40 hover:bg-slate-800/60 transition-colors">
                        <span className="text-white font-semibold text-base md:text-lg mb-1">{mod.name}</span>
                        <span className="text-slate-400 text-sm">{mod.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
