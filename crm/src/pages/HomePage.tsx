export default function HomePage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] bg-slate-950 overflow-hidden flex flex-col items-center justify-center py-20 px-6">
      
      {/* 1. Глобальный фон: Неоновые градиенты космоса */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-purple-600/[0.08] blur-[100px] sm:blur-[150px] pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-cyan-500/[0.08] blur-[100px] sm:blur-[160px] pointer-events-none animate-drift-fast" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[180px] pointer-events-none" />

      {/* Космическая сетка */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Центральный Сатурн с орбитами (на фоне) */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] flex items-center justify-center opacity-[0.45] pointer-events-none z-0 mix-blend-screen hidden md:flex">
        {/* Само тело планеты */}
        <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-br from-[#fb923c] via-[#ea580c] to-[#7c2d12] shadow-[inset_-25px_-25px_40px_rgba(0,0,0,0.8),0_0_80px_rgba(234,88,12,0.6)] z-10" />

        {/* Плоскость колец */}
        <div className="absolute w-[500px] h-[500px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(-15deg) rotateZ(10deg)' }}>
          {/* Вращающееся кольцо */}
          <div className="w-full h-full border-[1.5px] border-cyan-500/30 rounded-full animate-[spin_25s_linear_infinite] relative shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            
            {/* Дополнительные кольца для объема */}
            <div className="absolute inset-3 border-2 border-orange-500/20 rounded-full" />
            <div className="absolute inset-8 border border-cyan-500/10 rounded-full" />
            <div className="absolute -inset-4 border border-purple-500/20 rounded-full" />

            {/* Орбитальные символы */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-cyan-400 font-mono text-xl font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">{'</>'}</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-orange-400 font-mono text-xl font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">{'{ }'}</div>
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 text-purple-400 font-mono text-xl font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">{'#01'}</div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 text-cyan-400 font-mono text-xl font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">{'<>'}</div>
          </div>
        </div>
      </div>

      {/* 2. Декоративные элементы снаружи (Парящие в космосе) */}
      
      {/* Планета (справа вверху) */}
      <div className="absolute top-[12%] right-[5%] md:right-[15%] z-10 animate-float-slow pointer-events-none blur-[0.5px] opacity-80">
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
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

      {/* VR-Очки (слева внизу) */}
      <div className="absolute bottom-[10%] left-[3%] md:left-[12%] z-10 animate-float-medium pointer-events-none blur-[0.8px] opacity-75">
        <svg viewBox="0 0 100 60" className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-26 text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
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

      {/* Цифровые глифы */}
      {/* Атом слева вверху */}
      <div className="absolute top-[18%] left-[6%] md:left-[16%] z-0 animate-float-fast opacity-50 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          <circle cx="50" cy="50" r="5" fill="#22d3ee" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#22d3ee" strokeWidth="1.5" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#818cf8" strokeWidth="1.5" transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="11" fill="none" stroke="#c084fc" strokeWidth="1.5" transform="rotate(150 50 50)" />
        </svg>
      </div>

      {/* Тег Кода </> справа посередине */}
      <div className="absolute top-[52%] right-[5%] md:right-[10%] z-0 animate-float-medium opacity-45 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      </div>

      {/* Фигурные скобки {} слева посередине */}
      <div className="absolute top-[50%] left-[4%] md:left-[10%] z-0 animate-float-slow opacity-45 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
          <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
        </svg>
      </div>

      {/* Геймпад справа внизу */}
      <div className="absolute bottom-[20%] right-[3%] md:right-[12%] z-0 animate-float-fast opacity-40 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <rect x="2" y="6" width="20" height="12" rx="3" />
        </svg>
      </div>

      {/* 3. Центральный текстовый блок */}
      <div className="relative max-w-4xl z-20 flex flex-col items-center text-center">
        
        {/* Декоративный бейдж */}
        <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-5 py-2.5 rounded-full border border-cyan-800/40 mb-8 shadow-lg shadow-cyan-900/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Суми · Набір відкрито · Вік 6–15 років
        </div>

        {/* Заголовок: Белый, Крупный, Благородный Sans-serif */}
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-6 text-white"
          style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
        >
          IT-Академія <br />
          <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            K1BER School
          </span>
        </h1>

        {/* Описание: Светлый сланец на темном фоне */}
        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
          Інноваційний простір, де діти не просто проводять час за комп'ютером — вони{' '}
          <span className="text-slate-200 font-semibold border-b border-cyan-400/50 pb-0.5">
            пишуть код, створюють ігри
          </span>{' '}
          та випускають власні IT-проекти.
        </p>

        {/* Блок кнопок: Montserrat, оригинальный Glassmorphism с аккуратной неоновой обводкой */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {/* Кнопка 1: Записатись (акцентная неоновая) */}
          <a
            href="#!"
            className="w-full sm:w-auto text-center font-bold py-4.5 px-9 rounded-2xl text-base md:text-lg text-white transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 bg-cyan-950/30 backdrop-blur-md border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            Записатись на пробне заняття
          </a>

          {/* Кнопка 2: Переглянути модулі (второстепенная с индиго-обводкой) */}
          <a
            href="#!"
            className="w-full sm:w-auto text-center font-bold py-4.5 px-9 rounded-2xl text-base md:text-lg text-white transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 bg-slate-900/30 backdrop-blur-md border border-slate-700 hover:border-purple-500/80 hover:bg-purple-950/10 shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] cursor-pointer"
          >
            Переглянути модулі
          </a>
        </div>

      </div>

    </div>
  );
}
