import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { RegisterForm, Courses, FAQ, ContactsAndMap, ProgramModal, COURSES, MiniCabinet } from '../components/AcademyBlocks';
import { BentoGrid } from '../components/BentoGrid';
import { BentoModules } from '../components/BentoModules';

export default function HomePage() {
  const [viewingProgramFor, setViewingProgramFor] = useState<string | null>(null);

  const [authData, setAuthData] = useState<{ name: string, course: string, phone: string, chosenTime?: string } | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [slotsData, setSlotsData] = useState<Record<string, number>>({});
  const [coursePrices, setCoursePrices] = useState<Record<string, number>>({});
  const [courseModules, setCourseModules] = useState<Record<string, any[]>>({});

  const behaviorLogRef = useRef<any>({
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      max_scroll_depth: 0,
      time_per_section: { hero: 0, about: 0, courses: 0, "booking-form": 0, faq: 0, contacts: 0 },
      interactions: { viewed_courses: [] as string[], opened_faq: [] as string[], course_selection_history: [] as string[], focus_duration_seconds: { name: 0, phone: 0 } }
  });
  const activeSectionRef = useRef<string | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  const fetchSlots = async () => {
      const { data, error } = await supabase.from('course_slots').select('course_slug, available_slots, price, modules, details');
      if (data && !error) {
          const slotsMap = data.reduce((acc: Record<string, number>, item) => { acc[item.course_slug] = item.available_slots; return acc; }, {});
          const pricesMap = data.reduce((acc: Record<string, number>, item) => { acc[item.course_slug] = item.price; return acc; }, {});
          const modulesMap = data.reduce((acc: Record<string, any[]>, item) => { acc[item.course_slug] = item.modules || []; return acc; }, {});
          setSlotsData(slotsMap);
          setCoursePrices(pricesMap);
          setCourseModules(modulesMap);
      }
  };

  useEffect(() => {
      fetchSlots();
      const fetchUserData = async () => {
          const params = new URLSearchParams(window.location.search);
          const urlPhone = params.get('phone');
          const savedPhone = localStorage.getItem('kiberUserPhone');
          const phone = urlPhone || savedPhone;

          if (phone) {
              try {
                  const { data, error } = await supabase
                      .from('leads')
                      .select('name, course, chosen_time')
                      .eq('phone', phone)
                      .single();

                  if (!error && data) {
                      if (data.course) {
                          setAuthData({ name: data.name || '', course: data.course || '', phone, chosenTime: data.chosen_time });
                          localStorage.setItem('kiberUserPhone', phone);
                      } else {
                          localStorage.setItem('kiberUserPhone', phone);
                      }
                  } else if (savedPhone && !urlPhone) {
                      localStorage.removeItem('kiberUserPhone');
                  }
              } catch (e) {
                  console.error("Error fetching lead:", e);
              }
          }
          setIsLoadingAuth(false);
      };
      fetchUserData();

      let idleTimer: ReturnType<typeof setTimeout>;
      let isIdle = false;

      const resetIdle = () => {
          isIdle = false;
          clearTimeout(idleTimer);
          lastTickRef.current = Date.now();
          idleTimer = setTimeout(() => { isIdle = true; }, 30000);
      };

      const events = ['mousemove', 'scroll', 'keydown', 'touchstart'];
      events.forEach(e => window.addEventListener(e, resetIdle, { passive: true }));
      resetIdle();

      const interval = setInterval(() => {
          const now = Date.now();
          const delta = now - lastTickRef.current;
          lastTickRef.current = now;

          if (!isIdle && !document.hidden && activeSectionRef.current) {
              const section = activeSectionRef.current;
              if (behaviorLogRef.current.time_per_section[section] !== undefined) {
                  behaviorLogRef.current.time_per_section[section] += delta / 1000;
              }
          }
      }, 1000);

      const observer = new IntersectionObserver((entries) => {
          let maxRatio = 0;
          let currentActive: string | null = null;
          entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                  maxRatio = entry.intersectionRatio;
                  currentActive = entry.target.id;
              }
          });
          if (currentActive) {
              activeSectionRef.current = currentActive;
          }
      }, { threshold: [0.1, 0.5, 0.8] });

      const handleScroll = () => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
              const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
              if (scrollPercent > behaviorLogRef.current.max_scroll_depth) {
                  behaviorLogRef.current.max_scroll_depth = scrollPercent;
              }
          }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      const sections = ['hero', 'about', 'courses', 'booking-form', 'faq', 'contacts'];
      setTimeout(() => {
          sections.forEach(id => {
              const el = document.getElementById(id);
              if (el) observer.observe(el);
          });
      }, 500);

      return () => {
          clearInterval(interval);
          observer.disconnect();
          events.forEach(e => window.removeEventListener(e, resetIdle));
          window.removeEventListener('scroll', handleScroll);
          clearTimeout(idleTimer);
      };
  }, []);

  if (isLoadingAuth) {
      return <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">Завантаження...</div>;
  }

  if (authData) {
      return <MiniCabinet clientName={authData.name} registeredCourse={authData.course} phone={authData.phone} initialTime={authData.chosenTime} />;
  }

  return (
    <main className="w-full bg-slate-950 overflow-x-hidden">
      <section className="relative w-full min-h-[calc(100vh-72px)] flex flex-col items-center justify-start pt-32 md:pt-40 lg:justify-center lg:pt-0 pb-20 px-6">
      
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
      <div className="absolute top-[25%] md:top-[30%] lg:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] flex items-center justify-center opacity-[0.25] md:opacity-[0.35] scale-[0.5] sm:scale-[0.75] md:scale-90 lg:scale-100 pointer-events-none z-0 mix-blend-screen">
        {/* Само тело планеты */}
        <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-br from-[#fb923c] via-[#ea580c] to-[#7c2d12] shadow-[inset_-40px_-40px_60px_rgba(0,0,0,0.8),0_0_120px_rgba(234,88,12,0.6)] z-10" />

        {/* Плоскость колец */}
        <div className="absolute w-[1000px] h-[1000px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(-15deg) rotateZ(10deg)' }}>
          {/* Вращающееся кольцо */}
          <div className="w-full h-full border-[2px] border-cyan-500/30 rounded-full animate-[spin_35s_linear_infinite] relative shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            
            {/* Дополнительные кольца для объема */}
            <div className="absolute inset-6 border-[3px] border-orange-500/20 rounded-full" />
            <div className="absolute inset-16 border-[1.5px] border-cyan-500/10 rounded-full" />
            <div className="absolute -inset-8 border-[1.5px] border-purple-500/20 rounded-full" />

            {/* Орбитальные символы */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-cyan-400 font-mono text-3xl font-bold drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">{'</>'}</div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-orange-400 font-mono text-3xl font-bold drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]">{'{ }'}</div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 text-purple-400 font-mono text-3xl font-bold drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]">{'#01'}</div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-cyan-400 font-mono text-3xl font-bold drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">{'<>'}</div>
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
        
        {/* Заголовок: Белый, Крупный, Благородный Sans-serif */}
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-2 text-white"
          style={{ fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}
        >
          <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            K1BER School
          </span>
        </h1>
        <div className="mb-8 mt-3 relative z-10 w-[95%] max-w-2xl mx-auto flex justify-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-3xl sm:rounded-full bg-slate-900/50 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md hover:border-cyan-500/40 transition-colors duration-300 cursor-default text-center">
            <span className="hidden sm:block w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0"></span>
            <h2 className="text-[10px] sm:text-sm md:text-base font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-slate-200 leading-relaxed">
              Школа програмування <span className="hidden sm:inline text-slate-600 font-black mx-1 sm:mx-2">/</span><br className="sm:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Цифрової творчості</span>
            </h2>
            <span className="hidden sm:block w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0"></span>
          </div>
        </div>

        {/* Описание: Светлый сланец на темном фоне */}
        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
          Сучасний освітній простір, де діти від 6 до 15 років проходять системний шлях від основ логіки до створення власних додатків, ігор та розуміння блокчейн-технологій. Ми перетворюємо захоплення гаджетами на{' '}
          <span className="text-slate-200 font-semibold border-b border-cyan-400/50 pb-0.5">
            тверді інженерні навички
          </span>.
        </p>

        {/* Блок кнопок: Montserrat, оригинальный Glassmorphism с аккуратной неоновой обводкой */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {/* Кнопка 1: Записатись (акцентная неоновая) */}
          <a
            href="#register"
            className="w-full sm:w-auto text-center font-bold py-4 px-9 rounded-2xl text-base md:text-lg text-white transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 bg-cyan-950/30 backdrop-blur-md border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            Записатись на пробне заняття
          </a>

          {/* Кнопка 2: Переглянути модулі (второстепенная с индиго-обводкой) */}
          <a
            href="#modules"
            className="w-full sm:w-auto text-center font-bold py-4 px-9 rounded-2xl text-base md:text-lg text-white transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 bg-slate-900/30 backdrop-blur-md border border-slate-700 hover:border-purple-500/80 hover:bg-purple-950/10 shadow-[0_0_20px_rgba(168,85,247,0.05)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] cursor-pointer"
          >
            Переглянути модулі
          </a>
        </div>

      </div>

      {/* Статистика / Факты */}
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-6 mt-8 md:mt-16 z-20 relative flex flex-row items-center justify-center gap-2 sm:gap-8 md:gap-16">
        <div className="flex flex-col items-center text-center w-1/3 md:w-auto">
          <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-1 md:mb-2 drop-shadow-md" style={{ fontFamily: "'Outfit', sans-serif" }}>7+</span>
          <span className="text-slate-400 font-medium text-[9px] sm:text-xs md:text-sm tracking-widest uppercase leading-snug">років на ринку<br className="hidden md:block" /> України</span>
        </div>
        
        {/* Разделитель */}
        <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent"></div>

        <div className="flex flex-col items-center text-center w-1/3 md:w-auto">
          <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-1 md:mb-2 drop-shadow-md" style={{ fontFamily: "'Outfit', sans-serif" }}>70+</span>
          <span className="text-slate-400 font-medium text-[9px] sm:text-xs md:text-sm tracking-widest uppercase leading-snug">навчальних<br className="hidden md:block" /> модулів</span>
        </div>

        {/* Разделитель */}
        <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent"></div>

        <div className="flex flex-col items-center text-center w-1/3 md:w-auto">
          <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-1 md:mb-2 drop-shadow-md" style={{ fontFamily: "'Outfit', sans-serif" }}>2000+</span>
          <span className="text-slate-400 font-medium text-[9px] sm:text-xs md:text-sm tracking-widest uppercase leading-snug">задоволених<br className="hidden md:block" /> студентів</span>
        </div>
      </div>
      </section>

      <BentoGrid />
      <div id="modules" className="w-full">
        <BentoModules />
      </div>
      
      <Courses 
        slotsData={slotsData} 
        coursePrices={coursePrices}
        onOpenProgram={setViewingProgramFor} 
      />
      
      <FAQ />
      <ContactsAndMap />

      <RegisterForm 
        sourceName="website" 
        onAuthSuccess={(name, course, phone, chosenTime) => setAuthData({ name, course, phone, chosenTime })}
        slotsData={slotsData}
        courseModules={courseModules}
        fetchSlots={fetchSlots}
        behaviorLogRef={behaviorLogRef}
      />

      {viewingProgramFor && (
        <ProgramModal 
            course={COURSES.find(c => c.slug === viewingProgramFor)} 
            modules={courseModules[viewingProgramFor] || []} 
            onClose={() => setViewingProgramFor(null)} 
        />
      )}
    </main>
  );
}
