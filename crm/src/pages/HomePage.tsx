export default function HomePage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-slate-950 overflow-hidden flex items-center justify-center py-6 sm:py-12 md:py-16 px-4">
      {/* 1. Глобальный фон: Неоновые градиенты космоса */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-600/10 blur-[80px] sm:blur-[120px] pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyan-500/10 blur-[90px] sm:blur-[140px] pointer-events-none animate-drift-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] rounded-full bg-blue-600/5 blur-[100px] sm:blur-[180px] pointer-events-none" />

      {/* Космическая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* 2. Декоративные геймифицированные элементы снаружи рамки (Плавают и создают 3D глубину) */}
      
      {/* Большая размытая планета (справа вверху) */}
      <div className="absolute top-[8%] right-[2%] md:right-[10%] lg:right-[12%] z-10 animate-float-slow pointer-events-none blur-[1px] md:blur-[1.5px] opacity-75 md:opacity-90">
        <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <defs>
            <radialGradient id="planetGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#22d3ee" strokeWidth="2" transform="rotate(-15 50 50)" strokeDasharray="120 40" opacity="0.8" />
          <circle cx="50" cy="50" r="28" fill="url(#planetGrad)" />
          <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#22d3ee" strokeWidth="2" transform="rotate(-15 50 50)" strokeDasharray="0 120 40 0" />
        </svg>
      </div>

      {/* Размытые VR-Очки (слева внизу) */}
      <div className="absolute bottom-[6%] left-[2%] md:left-[8%] lg:left-[10%] z-10 animate-float-medium pointer-events-none blur-[1.5px] md:blur-[2px] opacity-70 md:opacity-85">
        <svg viewBox="0 0 100 60" className="w-20 h-12 sm:w-28 sm:h-18 md:w-36 md:h-24 text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
          <defs>
            <linearGradient id="vrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d="M10 25 C10 10, 90 10, 90 25" fill="none" stroke="#475569" strokeWidth="3.5" />
          <rect x="15" y="18" width="70" height="30" rx="15" fill="url(#vrGrad)" stroke="#c084fc" strokeWidth="1.5" />
          <rect x="20" y="22" width="60" height="18" rx="9" fill="#020617" stroke="#22d3ee" strokeWidth="1.5" />
          <circle cx="32" cy="31" r="2.5" fill="#22d3ee" className="animate-pulse" />
          <circle cx="68" cy="31" r="2.5" fill="#22d3ee" className="animate-pulse" />
          <path d="M46 23 L54 23" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Неоновые цифровые глифы вокруг рамки */}
      {/* Атом слева вверху */}
      <div className="absolute top-[15%] left-[5%] md:left-[12%] z-0 animate-float-fast opacity-40 md:opacity-60 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          <circle cx="50" cy="50" r="5" fill="#22d3ee" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#22d3ee" strokeWidth="1.5" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#818cf8" strokeWidth="1.5" transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#c084fc" strokeWidth="1.5" transform="rotate(150 50 50)" />
        </svg>
      </div>

      {/* Тег Кода </> справа внизу */}
      <div className="absolute bottom-[18%] right-[4%] md:right-[10%] z-0 animate-float-medium opacity-35 md:opacity-55 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      </div>

      {/* Фигурные скобки {} слева посередине */}
      <div className="absolute top-[45%] left-[3%] md:left-[7%] z-0 animate-float-slow opacity-40 md:opacity-50 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
          <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
        </svg>
      </div>

      {/* Космический геймпад справа вверху */}
      <div className="absolute top-[25%] right-[5%] md:right-[14%] z-0 animate-float-fast opacity-30 md:opacity-50 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="3" />
        </svg>
      </div>

      {/* 3. Центральный блок: Контейнер с рамкой (main.webp) */}
      <div className="relative w-full max-w-4xl z-20 mx-auto">
        
        {/* Неоновый ореол за рамкой для эффекта парения */}
        <div className="absolute inset-4 sm:inset-6 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-[1.8rem] blur-2xl pointer-events-none animate-pulse" />

        {/* Рамка-контейнер */}
        <div 
          className="w-full aspect-[4/3.1] sm:aspect-[16/11] md:aspect-[16/10] bg-[url('/main.webp')] bg-no-repeat bg-center bg-cover md:bg-contain rounded-[1.8rem] border border-cyan-500/15 overflow-hidden shadow-2xl relative flex items-center justify-center"
        >
          {/* Контентная зона: белое центральное поле рамки */}
          {/* С помощью точных процентных отступов позиционируем контент строго по центру рамки */}
          <div className="w-[78%] h-[74%] sm:w-[74%] sm:h-[72%] md:w-[70%] md:h-[68%] flex flex-col justify-center items-center text-center p-3 sm:p-6 md:p-8 select-text">
            
            {/* Заголовок: Gilroy/Outfit Bold, неоновый синий градиент */}
            <h1 
              style={{ fontFamily: "'Outfit', 'Gilroy', 'Inter', sans-serif" }}
              className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-tight mb-2 sm:mb-4 md:mb-5 bg-gradient-to-r from-blue-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent drop-shadow-[0_1.5px_1.5px_rgba(2,6,23,0.12)]"
            >
              IT-Академія <br className="xs:hidden" /> K1BER School
            </h1>

            {/* Описание: темный сланец для превосходной читаемости на белом фоне */}
            <p className="text-[10px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg text-slate-700 font-semibold max-w-[240px] xs:max-w-xs sm:max-w-md md:max-w-xl mb-3 sm:mb-6 md:mb-8 leading-relaxed">
              Інноваційний простір, де діти створюють власні ігри, вивчають кодинг та підкорюють світ технологій майбутнього.
            </p>

            {/* Блок кнопок: Montserrat semi-bold, Glassmorphism */}
            <div 
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="flex flex-row sm:flex-row gap-2 sm:gap-4 md:gap-5 w-full justify-center items-center px-1 sm:px-0"
            >
              {/* Кнопка 1: Записатись (акцентная неоновая) */}
              <a
                href="/intensives#booking-form"
                className="group relative flex-1 sm:flex-none overflow-hidden rounded-xl py-2 sm:py-3.5 px-3 sm:px-6 md:px-8 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-white transition-all duration-300 transform hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 shadow-[0_4px_18px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.6)] border border-cyan-400/80 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-center"
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity mr-1">{"["}</span>
                Записатись на пробне заняття
                <span className="opacity-70 group-hover:opacity-100 transition-opacity ml-1">{"]"}</span>
              </a>

              {/* Кнопка 2: Переглянути модулі (Glassmorphism на белом фоне) */}
              <a
                href="/intensives#courses"
                className="group flex-1 sm:flex-none overflow-hidden rounded-xl py-2 sm:py-3.5 px-3 sm:px-6 md:px-8 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-cyan-950 transition-all duration-300 transform hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 bg-white/35 backdrop-blur-md hover:bg-white/60 border border-cyan-300/60 shadow-[0_4px_15px_rgba(6,182,212,0.1)] hover:shadow-[0_8px_20px_rgba(6,182,212,0.25)] text-center"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity mr-1">{"["}</span>
                Переглянути модулі
                <span className="opacity-60 group-hover:opacity-100 transition-opacity ml-1">{"]"}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
