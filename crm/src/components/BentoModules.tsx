import { useState } from 'react';
import { Gamepad2, Code2, Monitor, MapPin, Target } from 'lucide-react';

const ageGroups = [
  {
    id: 'junior',
    age: '6–8 років',
    title: 'Молодша група',
    description: 'Основи алгоритмів, логічне мислення, візуальне програмування через ігрові механіки.',
    icon: <Gamepad2 className="w-5 h-5" />,
    color: 'from-cyan-500 to-blue-600',
    tabColor: 'text-cyan-400 bg-cyan-950/30 border-cyan-500/30 hover:bg-cyan-900/50 hover:border-cyan-400/50',
    activeTab: 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    modules: [
      { name: 'Модуль 1: Кібер-Логіка', tech: 'Scratch Jr', desc: 'Розвиваємо алгоритмічне мислення без коду. Створюємо перші інтерактивні анімації.', result: 'Перші інтерактивні анімації та ігри.' },
      { name: 'Модуль 2: Конструювання світів', tech: 'Kodu Game Lab', desc: 'Вивчаємо 3D-простір та логіку взаємодії об\'єктів.', result: 'Власні 3D бойові арени.' },
      { name: 'Модуль 3: Візуальне програмування', tech: 'Google Blockly', desc: 'Перехід від блоків до синтаксису справжніх мов.', result: 'Розуміння принципів написання коду.' },
      { name: 'Модуль 4: Проєктування інтерфейсів', tech: 'Figma', desc: 'Створюємо дизайн-макет свого першого мобільного додатка.', result: 'Готовий дизайн додатка.' }
    ]
  },
  {
    id: 'middle',
    age: '9–12 років',
    title: 'Середня група',
    description: 'Занурення у розробку, створення перших ігор (Roblox / Minecraft) та мобільних додатків.',
    icon: <Monitor className="w-5 h-5" />,
    color: 'from-orange-500 to-red-600',
    tabColor: 'text-orange-400 bg-orange-950/30 border-orange-500/30 hover:bg-orange-900/50 hover:border-orange-400/50',
    activeTab: 'bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    modules: [
      { name: 'Модуль 1: Архітектура світів', tech: 'Minecraft', desc: 'Проєктування складних систем за допомогою Redstone-логіки.', result: 'Автоматизовані ферми та міста.' },
      { name: 'Модуль 2: Скриптинг та логіка', tech: 'Roblox Lua', desc: 'Вивчення бази мови Lua та створення механік.', result: 'Власна мультиплеєрна гра.' },
      { name: 'Модуль 3: Проєктування додатків', tech: 'Thunkable', desc: 'Створення софту під iOS та Android без складного бекенду.', result: 'Робочий мобільний додаток.' },
      { name: 'Модуль 4: Старт алгоритмів', tech: 'CodeMonkey', desc: 'Ігрова прокачка навичок написання текстового коду.', result: 'Вміння писати прості скрипти.' },
      { name: 'Модуль 5: 2D-Анімація & Монтаж', tech: 'Video/Motion', desc: 'Створення динамічного контенту та звукових ефектів.', result: 'Готовий відеоролик для YouTube.' }
    ]
  },
  {
    id: 'senior',
    age: '13–15 років',
    title: 'Старша група',
    description: 'Твердий Backend, веб-розробка, кібербезпека та прогресивний напрямок Блокчейн.',
    icon: <Code2 className="w-5 h-5" />,
    color: 'from-purple-500 to-indigo-600',
    tabColor: 'text-purple-400 bg-purple-950/30 border-purple-500/30 hover:bg-purple-900/50 hover:border-purple-400/50',
    activeTab: 'bg-purple-500 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    modules: [
      { name: 'Модуль 1: Синтаксис & Логіка', tech: 'Python', desc: 'Перехід на одну з найбільш затребуваних мов світу.', result: 'Розуміння змінних, циклів та функцій.' },
      { name: 'Модуль 2: Автономні боти', tech: 'Telegram API', desc: 'Робота з API та зовнішніми даними.', result: 'Повноцінний Telegram-бот.' },
      { name: 'Модуль 3: Базовий Fullstack', tech: 'Web UI', desc: 'Як пов\'язати логіку Python з візуальним інтерфейсом.', result: 'Власний робочий веб-додаток.' },
      { name: 'Модуль 4: Digital Hygiene', tech: 'Cybersecurity', desc: 'Розуміння мережевих загроз та фішингу.', result: 'Вміння захищати дані та протистояти хакерам.' },
      { name: 'Модуль 5: Основи Блокчейн', tech: 'Web3 / Crypto', desc: 'Розуміння роботи децентралізованих систем та смарт-контрактів.', result: 'Розуміння блокчейн-технологій.' }
    ]
  }
];

export function BentoModules() {
  const [activeGroup, setActiveGroup] = useState<string>('junior');
  const activeData = ageGroups.find(g => g.id === activeGroup) || ageGroups[0];

  return (
    <section id="courses" className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
      
      {/* Builder Background */}
      <div className="absolute top-[30%] md:top-[40%] right-[-5%] md:-right-10 lg:-right-20 w-64 md:w-[400px] lg:w-[500px] opacity-30 md:opacity-50 z-0 pointer-events-none transform rotate-[15deg] md:rotate-[20deg] mix-blend-luminosity">
        <img src="/builder.webp" alt="Roblox Builder" className="w-full h-auto drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] object-contain" />
      </div>

      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Вікові треки</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            Програма{' '}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            навчання
          </span>
        </h2>
        
        {/* Якір: Наскрізний інфоблок */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-800/90 border border-slate-700/50 shadow-xl backdrop-blur-md">
          <Target className="w-6 h-6 text-emerald-400 shrink-0" />
          <span className="text-slate-300 font-medium md:text-lg text-center sm:text-left">
            <strong className="text-white">7 років системного навчання</strong> до повного випуску та першої професії
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Кнопки вибору віку */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {ageGroups.map((group) => {
            const isActive = activeGroup === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${isActive ? group.activeTab : group.tabColor}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {group.icon}
                  <span className="font-bold text-lg">{group.age}</span>
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                  {group.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Контент обраної групи */}
        <div 
          className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Легкий декоративний градієнт фону обраної групи */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeData.color} rounded-full blur-[80px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2`} />
          
          <div className="mb-8 relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeData.title} <span className="text-slate-400 font-medium">({activeData.age})</span></h3>
            <p className="text-slate-300 md:text-lg">{activeData.description}</p>
          </div>

          <div className="space-y-4 relative z-10">
            {activeData.modules.map((mod, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors">
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-white font-bold text-lg">
                      {mod.name}
                    </span>
                    <span 
                      className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-blue-500/20"
                      style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}
                    >
                      {mod.tech}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm md:text-[15px] leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="md:w-1/3 shrink-0 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 flex flex-col justify-center">
                  <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Результат
                  </span>
                  <span className="text-sm font-medium text-slate-300">
                    {mod.result}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
