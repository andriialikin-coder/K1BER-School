import { useState } from 'react';
import { Gamepad2, Code2, Paintbrush, ShieldCheck, ChevronDown, MapPin } from 'lucide-react';

const tracks = [
  {
    id: 'gamedev',
    title: 'Game Development & 3D Світи (Молодші)',
    description: 'Створення власних світів та ігор. Від ідеї до релізу.',
    icon: <Gamepad2 className="w-8 h-8 text-cyan-400" />,
    color: 'border-cyan-500/30',
    modules: [
      { name: 'Модуль 1: Кібер-Логіка', tech: 'Scratch Jr', desc: 'Розвиваємо алгоритмічне мислення без коду. Створюємо перші інтерактивні анімації.', result: 'Перші інтерактивні анімації та ігри.' },
      { name: 'Модуль 2: Конструювання світів', tech: 'Kodu Game Lab', desc: 'Вивчаємо 3D-простір та логіку взаємодії об\'єктів.', result: 'Власні 3D бойові арени.' },
      { name: 'Модуль 3: Візуальне програмування', tech: 'Google Blockly', desc: 'Перехід від блоків до синтаксису справжніх мов.', result: 'Розуміння принципів написання коду.' },
      { name: 'Модуль 4: Архітектура світів', tech: 'Minecraft', desc: 'Проєктування складних систем за допомогою Redstone-логіки.', result: 'Автоматизовані ферми та міста.' },
      { name: 'Модуль 5: Скриптинг та логіка', tech: 'Roblox Lua', desc: 'Вивчення бази мови Lua та створення механік.', result: 'Власна мультиплеєрна гра.' }
    ]
  },
  {
    id: 'software',
    title: 'Програмування & AI (Старші)',
    description: 'Написання коду, алгоритми та розробка додатків.',
    icon: <Code2 className="w-8 h-8 text-orange-400" />,
    color: 'border-orange-500/30',
    modules: [
      { name: 'Модуль 1: Старт алгоритмів', tech: 'CodeMonkey', desc: 'Ігрова прокачка навичок написання текстового коду.', result: 'Вміння писати прості скрипти.' },
      { name: 'Модуль 2: Синтаксис & Логіка', tech: 'Python', desc: 'Перехід на одну з найбільш затребуваних мов світу.', result: 'Розуміння змінних, циклів та функцій.' },
      { name: 'Модуль 3: Автономні боти', tech: 'Telegram API', desc: 'Робота з API та зовнішніми даними.', result: 'Повноцінний Telegram-бот для вирішення завдань.' },
      { name: 'Модуль 4: Штучний Інтелект', tech: 'ChatGPT', desc: 'Генерація коду, графіки та автоматизація рутини.', result: 'Навички роботи з нейромережами (Prompt Engineering).' },
      { name: 'Модуль 5: Базовий Fullstack', tech: 'Web UI', desc: 'Як пов\'язати логіку Python з візуальним інтерфейсом.', result: 'Власний робочий веб-додаток.' }
    ]
  },
  {
    id: 'design',
    title: 'Digital Design & Web-UI (Творчість)',
    description: 'Креатив, UI/UX та візуальне оформлення.',
    icon: <Paintbrush className="w-8 h-8 text-purple-400" />,
    color: 'border-purple-500/30',
    modules: [
      { name: 'Модуль 1: Проєктування інтерфейсів', tech: 'Figma', desc: 'Створюємо дизайн-макет свого першого мобільного додатка або сайту.', result: 'Готовий дизайн мобільного додатка або сайту.' },
      { name: 'Модуль 2: Графіка та колажі', tech: 'Photoshop', desc: 'Робота з шарами, масками, кольором.', result: 'Професійний візуал для вебу.' },
      { name: 'Модуль 3: Розробка сайтів', tech: 'UI/UX', desc: 'Як зробити інтерфейс зручним для користувача.', result: 'Грамотний прототип із сітками та шрифтами.' },
      { name: 'Модуль 4: 2D-Анімація & Монтаж', tech: 'Video/Motion', desc: 'Створення динамічного контенту та звукових ефектів.', result: 'Готовий відеоролик для YouTube і соцмереж.' }
    ]
  },
  {
    id: 'cyber',
    title: 'Mobile Apps & Кібербезпека (Інфраструктура)',
    description: 'Кібербезпека та етичний хакінг.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    color: 'border-emerald-500/30',
    modules: [
      { name: 'Модуль 1: Проєктування додатків', tech: 'Thunkable', desc: 'Створення софту під iOS та Android без складного бекенду.', result: 'Робочий мобільний додаток.' },
      { name: 'Модуль 2: Digital Hygiene', tech: 'Cybersecurity', desc: 'Розуміння мережевих загроз та фішингу.', result: 'Вміння захищати дані та протистояти хакерам.' },
      { name: 'Модуль 3: Вступ до Баз Даних', tech: 'SQL', desc: 'Як зберігаються дані у великих додатках.', result: 'Розуміння архітектури баз даних.' }
    ]
  }
];

export function BentoModules() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  const toggleTrack = (id: string) => {
    setActiveTrack(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Шлях до професії</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            Програма{' '}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            навчання
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
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
                className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col pt-2 border-t border-slate-800/60">
                    {track.modules.map((mod, idx) => (
                      <div key={idx} className="flex flex-col py-5 border-b border-white/5 last:border-0 hover:bg-slate-800/20 transition-colors px-3 -mx-3 rounded-xl">
                        
                        {/* Заголовок и Бейдж */}
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-white font-semibold text-base md:text-lg">
                            {mod.name}
                          </span>
                          <span 
                            className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-blue-500/20"
                            style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}
                          >
                            {mod.tech}
                          </span>
                        </div>

                        {/* Описание процесса */}
                        <span className="text-slate-400 text-sm md:text-[15px] leading-relaxed mb-4">
                          {mod.desc}
                        </span>

                        {/* Яркий акцент на Результат */}
                        <div className="bg-slate-900/50 p-3.5 rounded-lg border border-slate-800/50 inline-flex">
                          <span className="text-sm font-medium text-slate-300">
                            <span className="text-orange-500 font-bold mr-2 inline-flex items-center gap-1.5">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              Результат:
                            </span>
                            {mod.result}
                          </span>
                        </div>

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
