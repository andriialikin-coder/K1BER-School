import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

declare const process: any;

const supabaseUrl = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_URL) || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || 'https://xyz.supabase.co';
const supabaseKey = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. КОМПОНЕНТ: ШАПКА (Header)
const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <header className="w-full fixed top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Логотип */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                        <span className="text-white font-black text-sm">K</span>
                    </div>
                    <span className="text-white font-black text-xl tracking-tight">
                        K1BER<span className="text-cyan-400">.</span>SCHOOL
                    </span>
                </a>

                {/* Навігація — десктоп */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="#about" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Про нас
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="#courses" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Курси
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="#faq" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        FAQ
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="#contacts" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Контакти
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                </nav>

                {/* CTA кнопка */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#booking-form"
                        className="relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-px"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Записатись на пробне
                    </a>
                </div>

                {/* Бургер — мобайл */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                    aria-label="Меню"
                >
                    <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Мобільне меню */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-60 border-t border-slate-800/60' : 'max-h-0'}`}>
                <nav className="px-6 py-4 flex flex-col space-y-3 bg-slate-950/95">
                    <a href="#about" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">Про нас</a>
                    <a href="#courses" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">Курси</a>
                    <a href="#faq" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">FAQ</a>
                    <a href="#contacts" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">📍 Контакти</a>
                    <a href="#booking-form" onClick={() => setMenuOpen(false)} className="mt-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm">
                        Записатись на пробне
                    </a>
                </nav>
            </div>
        </header>
    );
};

// 2. КОМПОНЕНТ: ГОЛОВНИЙ ЕКРАН (Hero Section)
const Hero = () => (
    <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">

        {/* Фоновий неон-ефект */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/[0.08] rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        {/* Сітка-фон (технологічна текстура) */}
        <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
                backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }}
        />

        {/* Decorative Background Glows */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[400px] bg-gradient-to-r from-cyan-600/30 to-blue-600/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl">

            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-4 py-2 rounded-full border border-cyan-800/40 mb-8 shadow-lg shadow-cyan-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Суми · Набір відкрито · Вік 6–15 років
            </div>

            {/* Головний заголовок */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] relative z-10">
                Твоя дитина{' '}
                <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        грає в ігри.
                    </span>
                </span>
                <br />
                Пора почати їх{' '}
                <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        створювати.
                    </span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60" />
                </span>
            </h1>

            {/* Неоновий акцент */}
            <div className="mt-6 inline-block bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl px-6 py-3 shadow-lg shadow-cyan-900/20 relative z-10">
                <p className="text-cyan-400 font-bold text-sm md:text-base drop-shadow-md">
                    🔥 Практика &gt;80% — мінімум теорії, максимум реальних проектів за комп&apos;ютером!
                </p>
            </div>

            {/* Підзаголовок */}
            <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                Школа програмування для дітей у місті Суми. Ваша дитина не просто вчить теорію — вона{' '}
                <span className="text-slate-200 font-medium">пише код і випускає власні проекти</span>{' '}
                вже з першого місяця.
            </p>

            {/* Статистика */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 mb-10 text-center relative z-10">
                {[
                    { value: '200+', label: 'учнів у Сумах' },
                    { value: '8', label: 'унікальних ІТ-інтенсивів' },
                    { value: '1-е', label: 'заняття — безкоштовно' },
                ].map((stat) => (
                    <div key={stat.value} className="flex flex-col items-center">
                        <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-none drop-shadow-sm">
                            {stat.value}
                        </span>
                        <span className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                    href="#booking-form"
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold py-4 px-8 rounded-2xl text-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                    Записати дитину на пробне
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
                <a
                    href="#courses"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold py-4 px-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300 text-sm"
                >
                    Переглянути курси
                </a>
            </div>

            {/* Соціальний доказ */}
            <p className="mt-6 text-slate-600 text-xs font-medium tracking-wide">
                🔒 Без спаму. Тільки дзвінок від менеджера для підбору часу занять.
            </p>
        </div>
    </section>
);

// 3. КОМПОНЕНТ: ПЕРЕВАГИ ІНТЕНСИВУ (Benefits)
const PainPoints = () => (
    <section id="about" className="w-full bg-slate-900 text-white py-24 px-6 border-b border-slate-950 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">

            {/* Заголовок */}
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-800/40 mb-4">
                    Літній IT-інтенсив
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Що отримає ваша дитина
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        на літньому IT-інтенсиві?
                    </span>
                </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: 2 columns (Text left, Icon right) */}
                <div className="md:col-span-2 group relative bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 hover:border-cyan-500/50 shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden flex flex-col justify-center">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                    
                    <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8">
                        <div className="space-y-4 max-w-md text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                                Потужний апгрейд навичок
                            </h3>
                            <p className="text-slate-300/95 text-base leading-relaxed">
                                Замість безцільного скролінгу гаджетів на канікулах — <strong className="text-white font-extrabold shadow-cyan-500/20 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">розвиток логіки</strong>, креативності та фундаментальних цифрових навичок.
                            </p>
                        </div>
                        <div className="relative w-fit flex-shrink-0">
                            <div className="absolute inset-0 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 bg-cyan-500" />
                            <span className="text-7xl md:text-8xl relative select-none block transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                🚀
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2: 1 column (Vertical stack, icon top right, text bottom) */}
                <div className="md:col-span-1 group relative bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 hover:border-violet-500/50 shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden min-h-[260px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                    
                    <div className="relative z-10 w-full flex justify-center md:justify-end mb-6">
                        <div className="relative w-fit">
                            <div className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 bg-violet-500" />
                            <span className="text-6xl md:text-7xl relative select-none block transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                🤝
                            </span>
                        </div>
                    </div>
                    <div className="relative z-10 space-y-3 text-center md:text-left">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors duration-300">
                            Нові друзі та оточення
                        </h3>
                        <p className="text-slate-300/95 text-sm leading-relaxed">
                            Командна робота, <strong className="text-white font-extrabold shadow-violet-500/20 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">живе спілкування</strong> з однолітками, які поділяють інтерес до технологій, та море позитивних емоцій.
                        </p>
                    </div>
                </div>

                {/* Card 3: 3 columns (Wide banner, Icon left, Text right) */}
                <div className="md:col-span-3 group relative bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 hover:border-emerald-500/50 shadow-lg shadow-black/20 transition-all duration-300 overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-start w-full gap-8 md:gap-12">
                        <div className="relative w-fit flex-shrink-0 mb-4 md:mb-0">
                            <div className="absolute inset-0 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 bg-emerald-500" />
                            <span className="text-7xl md:text-8xl relative select-none block transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300">
                                👨‍💻
                            </span>
                        </div>
                        <div className="space-y-4 max-w-3xl text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
                                Підтримка та інтерактив
                            </h3>
                            <p className="text-slate-300/95 text-base md:text-lg leading-relaxed">
                                Заняття проходять у формі гри, де <strong className="text-white font-extrabold shadow-emerald-500/20 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">немає нудної теорії</strong>, а кожну дитину супроводжує та підтримує досвідчений асистент.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

// 4. КОМПОНЕНТ: НАПРЯМКИ НАВЧАННЯ (Courses)
const COURSES = [
    {
        slug: 'minecraft',
        price: 4500,
        image: '/1.png',
        tag: 'Gamedev',
        title: 'Minecraft: Архітектори реальності',
        desc: 'Minecraft перетворюється на навчальне середовище, де діти проектують світи, створюють портали та механізми. Освоюють логіку, алгоритми та основи програмування. Діти вчаться шукати помилки та розробляти альтернативи – чудовий міст до усвідомленого ІТ-мислення.',
        ages: '8+',
        tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
        btnBorder: 'border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40',
        cardBorder: 'hover:border-emerald-500/40',
    },
    {
        slug: 'geometry-dash',
        price: 4800,
        image: '/2.png',
        tag: 'Gamedev',
        title: 'Geometry Dash: 2D-платформер',
        desc: 'Дитина створить 2D-платформер у стилі Geometry Dash із мультяшною графікою, музикою та перешкодами. Розбере алгоритми справжніх хітових ігор: рух, зіткнення, ритм. Навчиться не просто грати, а розуміти, як ігри влаштовані зсередини, та створювати свої.',
        ages: '11+',
        tagColor: 'text-blue-400 bg-blue-950/80 border-blue-500/50',
        btnBorder: 'border-blue-500/30 hover:border-blue-400 hover:bg-blue-950/40',
        cardBorder: 'hover:border-blue-500/40',
    },
    {
        slug: 'construct',
        price: 5200,
        image: '/3.png',
        tag: 'Gamedev',
        title: 'Construct: Лабораторія ігор зі Стічем',
        desc: 'Це не гра і не просто «розвага на канікулах». Це перша усвідомлена розробка цифрового продукту для дітей. Дитина створює гру: придумує персонажів, логіку, рівні, правила та ефекти. Що отримує: впевненість у своїх здібностях створювати перші проекти та розвиток інтересу до технологій без стресу.',
        ages: '8+',
        tagColor: 'text-violet-400 bg-violet-950/80 border-violet-500/50',
        btnBorder: 'border-violet-500/30 hover:border-violet-400 hover:bg-violet-950/40',
        cardBorder: 'hover:border-violet-500/40',
    },
    {
        slug: 'python',
        price: 6000,
        image: '/8.png',
        tag: 'Code',
        title: 'Python: Ферма-симулятор',
        desc: 'Дитина напише на Python власну ферму: садити, вирощувати, збирати врожай та добувати ресурси як у Stardew Valley, тільки вона не грає, а створює. Освоїть змінні, цикли, умови та функції на живому проекті. Кожен рядок коду дає видимий результат. До кінця тижня покаже вам свою ферму та пояснить, як вона працює.',
        ages: '11+',
        tagColor: 'text-yellow-400 bg-yellow-950/80 border-yellow-500/50',
        btnBorder: 'border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-950/40',
        cardBorder: 'hover:border-yellow-500/40',
    },
    {
        slug: 'mobile-ai',
        price: 5500,
        image: '/5.png',
        tag: 'Mobile & AI',
        title: 'ШІ та App Inventor: Мобільні додатки',
        desc: 'Збираємо перший цифровий проект, як справжні розробники. Діти створюють мобільний додаток з елементами штучного інтелекту: оформлення, логіка, функції. Розвивають підприємницьке мислення, творчість та навичку презентації продукту. Дитина проходить шлях: ідея -> продукт -> результат. Підсумок – гордість за створений цифровий проект.',
        ages: '8+',
        tagColor: 'text-pink-400 bg-pink-950/80 border-pink-500/50',
        btnBorder: 'border-pink-500/30 hover:border-pink-400 hover:bg-pink-950/40',
        cardBorder: 'hover:border-pink-500/40',
    },
    {
        slug: 'web-ai',
        price: 5800,
        image: '/6.png',
        tag: 'Web & AI',
        title: 'Ідеальний сайт з нуля + ШІ',
        desc: 'Дитина сама збере справжній сайт: структура, дизайн, код. Навчиться використовувати штучний інтелект для створення текстів та прискорення роботи. Тема на вибір: улюблена гра, блог про себе або сторінка для події. На виході виходить готовий проект у портфоліо та навички, які знадобляться у будь-якій професії.',
        ages: '11+',
        tagColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
        btnBorder: 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40',
        cardBorder: 'hover:border-cyan-500/40',
    },
    {
        slug: '3d-print',
        price: 6500,
        image: '/7.png',
        tag: '3D & Print',
        title: '3D-моделювання та 3D-друк',
        desc: 'Дитина перейде від звичайного споживання до створення реальних об\'єктів. Освоїть роботу з тривимірним простором, навчиться проектувати власні моделі, іграшки чи персонажів у спеціальних програмах та підготує їх до друку. Підсумок інтенсиву — власноруч створена тривимірна фігура, надрукована на справжньому 3D-принтері.',
        ages: '7+',
        tagColor: 'text-orange-400 bg-orange-950/80 border-orange-500/50',
        btnBorder: 'border-orange-500/30 hover:border-orange-400 hover:bg-orange-950/40',
        cardBorder: 'hover:border-orange-500/40',
    }
];

const Courses = ({ slotsData }: { slotsData: Record<string, number> }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 364 : 300; // ширина картки + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleSelectCourse = (e: React.MouseEvent, courseTitle: string) => {
        e.preventDefault();
        const event = new CustomEvent('selectCourse', { detail: { course: courseTitle } });
        window.dispatchEvent(event);
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="courses" className="w-full bg-slate-950 text-white py-20 border-b border-slate-900 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">

                {/* Заголовок */}
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-800/40 mb-4">
                        Програми навчання
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                        Літні IT-інтенсиви
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            для дітей 7–15 років
                        </span>
                    </h2>
                </div>
            </div>

            {/* Карусель курсів */}
            <div className="relative w-full pb-4">
                {/* Кнопки-стрілки */}
                <button
                    onClick={() => scroll('left')}
                    className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full items-center justify-center backdrop-blur-md border border-slate-700 shadow-2xl transition-all"
                >
                    <svg className="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-slate-900/90 hover:bg-slate-800 text-cyan-400 rounded-full items-center justify-center backdrop-blur-md border border-slate-700 shadow-2xl transition-all hover:scale-105"
                >
                    <svg className="w-6 h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>

                <div
                    ref={scrollRef}
                    className="flex flex-nowrap overflow-x-auto gap-6 pb-6 pt-2 px-6 md:px-16 lg:px-24 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {COURSES.map((course) => (
                        <div
                            key={course.title}
                            className={`group bg-slate-900 rounded-2xl border border-slate-800 ${course.cardBorder} transition-all duration-300 flex flex-col overflow-hidden w-[85vw] sm:w-[320px] shrink-0 snap-center`}
                        >
                            {/* Блок для картинки */}
                            <div className="h-48 w-full bg-slate-800 relative overflow-hidden border-b border-slate-800 group-hover:border-slate-700 transition-colors flex items-center justify-center">
                                {/* Иконка-плейсхолдер на фоне */}
                                <svg className="w-12 h-12 text-slate-700 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <img
                                    src={course.image}
                                    alt=""
                                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform relative z-10"
                                />
                                <span className={`absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md ${course.tagColor}`}>
                                    {course.tag}
                                </span>
                            </div>

                            {/* Контент */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-white/10 text-white text-xs font-black tracking-wider uppercase shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-white/10">
                                            👤 {course.ages}
                                        </span>
                                        <div className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 ${(slotsData[course.slug] ?? 10) < 6 ? 'bg-red-950/50 border border-red-500/30 text-red-400' : 'bg-orange-950/50 border border-orange-500/30 text-orange-400'}`}>
                                            🔥 Залишилось: {slotsData[course.slug] ?? 10} місць
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-100 leading-tight">{course.title}</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed flex-1">{course.desc}</p>

                                {/* Ціна */}
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-white">{course.price} ₴</span>
                                    <span className="text-sm font-medium text-slate-500">/ інтенсив</span>
                                </div>

                                {/* Кнопка */}
                                <div className="mt-4 pt-4 border-t border-slate-800/50">
                                    <a
                                        href="#booking-form"
                                        onClick={(e) => handleSelectCourse(e, course.title)}
                                        className={`w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-white py-3 px-4 rounded-xl border ${course.btnBorder} transition-all duration-200`}
                                    >
                                        Забронювати місце
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 5. КОМПОНЕНТ: ФОРМА ЗАХВАТУ ЛІДІВ (Форма -> Наша CRM)
const RegisterForm = ({ onAuthSuccess, slotsData, fetchSlots }: { onAuthSuccess?: (name: string, course: string, phone: string, chosenTime?: string) => void; slotsData: Record<string, number>; fetchSlots: () => void; }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tab, setTab] = useState<'new' | 'existing'>('new');
    const [formData, setFormData] = useState({ name: '', phone: '+380', course: '' });

    const [loginPhone, setLoginPhone] = useState('+380');
    const [loginError, setLoginError] = useState('');

    const isPhoneValid = (phone: string) => {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 12 && digits.startsWith('380');
    };

    const isFormInvalid = tab === 'new'
        ? (!formData.name.trim() || !formData.course || !isPhoneValid(formData.phone))
        : (!isPhoneValid(loginPhone));

    React.useEffect(() => {
        // Логіка автозаповнення для лідів з Telegram-бота
        const urlParams = new URLSearchParams(window.location.search);
        const phoneParam = urlParams.get('phone');
        const nameParam = urlParams.get('name');

        let initialName = formData.name;
        let initialPhone = formData.phone;

        if (phoneParam) {
            const digits = phoneParam.replace(/\D/g, '');
            const formattedPhone = '+' + (digits.startsWith('380') ? digits : `380${digits.replace(/^0/, '')}`);
            initialPhone = formattedPhone;
            localStorage.setItem('user_phone', formattedPhone);
        }
        if (nameParam) {
            initialName = decodeURIComponent(nameParam);
            localStorage.setItem('user_name', initialName);
        }

        if (phoneParam || nameParam) {
            setFormData(prev => ({ ...prev, name: initialName, phone: initialPhone }));
        }

        const handleCourseSelect = (e: CustomEvent) => {
            setFormData(prev => ({ ...prev, course: e.detail.course }));
            setTab('new');
        };
        window.addEventListener('selectCourse', handleCourseSelect as EventListener);
        return () => window.removeEventListener('selectCourse', handleCourseSelect as EventListener);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('name, course, chosen_time')
                .eq('phone', loginPhone)
                .single();

            if (!error && data) {
                localStorage.setItem('kiberUserPhone', loginPhone);
                if (onAuthSuccess) {
                    onAuthSuccess(data.name || '', data.course || '', loginPhone, data.chosen_time);
                }
            } else {
                setLoginError('Кабінет не знайдено. Перевірте номер або зареєструйтесь.');
            }
        } catch (err) {
            console.error(err);
            setLoginError('Помилка сервера. Спробуйте пізніше.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: formData.name,
                phone: formData.phone,
                course: formData.course,
                source: "website"
            };

            console.log("Submitting payload to Supabase:", payload);

            const { data, error } = await supabase
                .from('leads')
                .insert([payload]);

            if (error) {
                console.error("КРИТИЧНА ПОМИЛКА SUPABASE:", error.message, error.details, error.hint);
                setLoading(false);
                return;
            }

            console.log("Успішне збереження в БД:", data);

            // Крок 3: Списання місця
            const selectedCourseSlug = COURSES.find(c => c.title === formData.course)?.slug;
            if (selectedCourseSlug) {
                const currentAvailable = slotsData[selectedCourseSlug] ?? 10;
                await supabase
                    .from('course_slots')
                    .update({ available_slots: Math.max(0, currentAvailable - 1) })
                    .eq('course_slug', selectedCourseSlug);
                fetchSlots(); // Оновлюємо дані без перезавантаження сторінки
            }

            localStorage.setItem('kiberUserPhone', formData.phone);
            if (onAuthSuccess) {
                onAuthSuccess(formData.name, formData.course, formData.phone);
            }
            setSuccess(true);
        } catch (err) {
            console.error("КРИТИЧНА ПОМИЛКА CATCH (Supabase):", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="booking-form" className="w-full bg-slate-900 text-white py-20 px-6 border-b border-slate-950">
            <div className="max-w-md mx-auto bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl shadow-slate-950">
                {/* Urgent-бейдж */}
                <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-800/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Місця обмежені
                    </span>
                </div>
                <h2 className="text-2xl font-black text-center tracking-tight leading-snug">
                    Забронювати місце на
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        літній інтенсив
                    </span>
                </h2>
                <p className="text-slate-400 text-sm text-center mt-3 leading-relaxed mb-6">
                    Скоріше обирайте напрямок та бронюйте місце для дитини.
                    <span className="text-slate-300 font-medium"> Кількість місць у групах обмежена!</span>
                </p>

                <div className="flex bg-slate-900 rounded-xl p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => setTab('new')}
                        className={`flex-1 text-sm font-bold py-2.5 rounded-lg transition-colors ${tab === 'new' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Новий запис
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('existing')}
                        className={`flex-1 text-sm font-bold py-2.5 rounded-lg transition-colors ${tab === 'existing' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        Вже маю кабінет
                    </button>
                </div>

                {success ? (
                    <div className="mt-6 p-4 bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 rounded-xl text-center text-sm font-medium">
                        🎉 Заявку отримано! Ми зателефонуємо вам найближчим часом.
                    </div>
                ) : (
                    <form onSubmit={tab === 'new' ? handleSubmit : handleLogin} className="space-y-4">
                        {tab === 'existing' && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Номер телефону</label>
                                <input
                                    type="tel"
                                    required
                                    value={loginPhone}
                                    onChange={e => {
                                        let val = e.target.value;
                                        if (!val.startsWith('+380')) {
                                            val = val.startsWith('+38') ? '+380' : '+380' + val.replace(/\D/g, '');
                                        }
                                        setLoginPhone(val);
                                    }}
                                    placeholder="+380 (__) ___-__-__"
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                                />
                                {loginError && <p className="text-red-400 text-xs mt-2">{loginError}</p>}
                            </div>
                        )}

                        {tab === 'new' && (
                            <>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Ім&apos;я батька/матері</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Наприклад, Сергій"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Номер телефону</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={e => {
                                            let val = e.target.value;
                                            if (!val.startsWith('+380')) {
                                                val = val.startsWith('+38') ? '+380' : '+380' + val.replace(/\D/g, '');
                                            }
                                            setFormData({ ...formData, phone: val });
                                        }}
                                        placeholder="+380 (__) ___-__-__"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Вибір напрямку</label>
                                    <select
                                        required
                                        value={formData.course}
                                        onChange={e => setFormData({ ...formData, course: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white appearance-none"
                                    >
                                        <option value="" disabled>Оберіть напрямок...</option>
                                        {COURSES.map(c => (
                                            <option key={c.title} value={c.title}>{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <button type="submit" disabled={loading || isFormInvalid} className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl text-sm transition">
                            {loading ? 'Відправляємо...' : tab === 'new' ? 'Забронювати місце на інтенсив →' : 'Увійти в кабінет →'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// 6. КОМПОНЕНТ: БЛОК FAQ (Заділ під AI Visibility)
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "Чи потрібен дитині свій ноутбук?",
            a: "Ні, ми повністю забезпечуємо студентів потужними ПК та всім необхідним ліцензійним софтом у нашому хабі в ТРЦ «КИЇВ». Від вас потрібен лише гарний настрій дитини."
        },
        {
            q: "Дитина буде просто грати в комп'ютерні ігри?",
            a: "Жодних ігор заради ігор. Ми використовуємо Minecraft, Roblox та інші платформи виключно як професійні інструменти. Дитина переходить з ролі звичайного гравця в роль розробника: пише код, будує логіку та створює власні проекти."
        },
        {
            q: "Чи потрібна попередня підготовка або знання коду?",
            a: "Абсолютно ні. Наші програми розроблені з нуля. Навіть якщо дитина ніколи не бачила рядка коду, ментори адаптують матеріал і допоможуть зробити перші кроки без стресу та шкільних оцінок."
        },
        {
            q: "Хто викладає на літніх інтенсивах?",
            a: "Практикуючі ІТ-спеціалісти та досвідчені ментори, які вміють пояснювати складні технічні речі простою мовою. Жодних нудних лекцій та застарілих методичок — тільки жива практика та підтримка."
        },
        {
            q: "Що дитина отримає по завершенню?",
            a: "Реальний цифровий продукт: власну 2D/3D гру, мобільний додаток, працюючий сайт або власноруч надруковану 3D-модель (залежно від обраного напрямку). А головне — розуміння, що комп'ютер це інструмент для створення, а не лише для розваг."
        }
    ];

    return (
        <section id="faq" className="w-full bg-slate-950 text-white py-16 px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-center tracking-tight">Популярні питання батьків</h2>
                <div className="mt-12 space-y-4">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div 
                                key={i} 
                                onClick={() => toggleFaq(i)}
                                className={`cursor-pointer bg-white/5 backdrop-blur-md border rounded-2xl transition-all duration-300 p-5 md:p-6 ${isOpen ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'}`}
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <h3 className="text-white font-bold text-lg">{item.q}</h3>
                                    <div className={`flex-shrink-0 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'rotate-0'}`}>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// 7. КОМПОНЕНТ: КОНТАКТИ ТА КАРТА (GEO / AI Visibility)
const ContactsAndMap = () => (
    <section id="contacts" className="w-full bg-slate-900 text-white py-20 px-6 border-b border-slate-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Ліва частина: текст + контакти */}
            <div className="space-y-6">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-800/40">
                    📍 Чекаємо на вас
                </span>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    Сучасний хаб
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        у ТРЦ «КИЇВ»
                    </span>
                </h2>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Навчальний простір{' '}
                    <span className="text-white font-semibold">K1BER.SCHOOL</span>{' '}
                    розташований у ТРЦ «КИЇВ». Поки дитина
                    створює свої перші IT-проекти під наглядом менторів — батьки можуть
                    комфортно зайнятися шопінгом або відпочити в кафе.
                </p>

                {/* Деталі */}
                <div className="space-y-6 pt-2">
                    
                    {/* 1. Адреса */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-cyan-500/50 transition-colors duration-300">
                            📍
                        </div>
                        <div>
                            <h4 className="text-base md:text-lg font-bold text-slate-200 mb-0.5">Наша адреса</h4>
                            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                                м. Суми, вул. Нижньовоскресенська, 1
                                <br />
                                <span className="text-slate-400 text-sm">(ТРЦ «КИЇВ»)</span>
                            </p>
                        </div>
                    </div>

                    {/* 2. Телефон (Дизайнерський акцент) */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-emerald-500/50 transition-colors duration-300 shadow-lg shadow-emerald-900/20">
                            📞
                        </div>
                        <div className="pt-0.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400/80 mb-1">Зателефонувати нам</h4>
                            <a 
                                href="tel:+380502828029" 
                                className="inline-block text-xl md:text-2xl font-black text-white hover:text-emerald-400 tracking-tight transition-colors duration-300 drop-shadow-md"
                            >
                                +38 050 282 80 29
                            </a>
                        </div>
                    </div>

                    {/* 3. Графік роботи */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-blue-500/50 transition-colors duration-300">
                            🕒
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-200 mb-0.5">Графік роботи</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Субота та Неділя: 09:00 – 18:00
                                <br />
                                <span className="text-slate-500 text-xs">(згідно з розкладом груп)</span>
                            </p>
                        </div>
                    </div>

                    {/* 4. Онлайн запис */}
                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-800/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-violet-500/50 transition-colors duration-300">
                            🎯
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-200 mb-0.5">Онлайн-запис</h4>
                            <a
                                href="#booking-form"
                                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors duration-200 underline underline-offset-4 decoration-cyan-800 hover:decoration-cyan-400"
                            >
                                Заповніть форму вище →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Права частина: карта */}
            <div className="group relative w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-slate-950">
                {/* Декоративна рамка-glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                <iframe
                    title="K1BER.SCHOOL — м. Суми, ТРЦ КИЇВ, вул. Нижньовоскресенська, 1"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.970146039578!2d34.80164297693574!3d50.90575305452285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412903e1b7db5b6f%3A0xe23bf04f8b9cb68b!2z0KLQoNCmICLQmtC40ZfQkiI!5e0!3m2!1suk!2sua!4v1717592400000!5m2!1suk!2sua"
                    className="w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

        </div>
    </section>
);

// МІНІ-КАБІНЕТ (Після успішної авторизації)
const MiniCabinet = ({ clientName, registeredCourse, phone, initialTime }: { clientName: string, registeredCourse: string, phone: string, initialTime?: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedTime, setSelectedTime] = useState(initialTime || '');
    const [isConfirmed, setIsConfirmed] = useState(!!initialTime);
    const [receiptUrl] = useState('');

    const courseData = COURSES.find(c => c.title === registeredCourse);
    const fullPrice = courseData?.price || 5000;
    const discount = Math.round(fullPrice * 0.15);
    const discountedPrice = fullPrice - discount;

    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            const { error } = await supabase
                .from('leads')
                .update({ chosen_time: selectedTime, status: 'time_confirmed' })
                .eq('phone', phone);

            if (!error) {
                setIsConfirmed(true);
            } else {
                console.error("Помилка збереження часу:", error.message);
            }
        } catch (e) {
            console.error("Критична помилка при підтвердженні:", e);
        } finally {
            setIsConfirming(false);
        }
    };

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': 'sandbox_monobank_test_token_here'
                },
                body: JSON.stringify({
                    amount: discountedPrice * 100, // В копійках
                    ccy: 980,
                    redirectUrl: window.location.href,
                    destination: "Оплата за інтенсив: " + registeredCourse
                })
            });
            const data = await response.json();
            if (data.pageUrl) {
                window.location.href = data.pageUrl;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

                {isConfirmed ? (
                    <div className="mb-8">
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="text-2xl font-black text-emerald-400 tracking-tight">Місце успішно заброньовано!</h2>
                        </div>
                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-6 space-y-4 shadow-inner">
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Курс</span>
                                <span className="text-slate-200 font-medium text-sm">{registeredCourse || 'обраний курс'}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Дата та час</span>
                                <span className="text-cyan-400 font-bold text-lg">{selectedTime}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Адреса</span>
                                <span className="text-slate-300 text-sm leading-relaxed block">
                                    IT школа K1BER School, ТРЦ "КИЇВ",<br />
                                    Нижньовоскресенська 1 (м. Суми)
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-center mb-2">
                            {clientName ? `Вітаємо, ${clientName}!` : 'Вітаємо!'}
                        </h2>
                        <p className="text-center text-slate-300 text-sm mb-4">
                            Вашу дитину записано на <span className="text-cyan-400 font-bold">{registeredCourse || 'обраний курс'}</span>.
                        </p>
                        <p className="text-center text-slate-400 text-sm">Оберіть зручний час для першого заняття:</p>
                    </div>
                )}

                <div className="space-y-3 mb-8">
                    <button
                        onClick={() => !isConfirmed && setSelectedTime('Субота 11:00')}
                        disabled={isConfirmed}
                        className={`w-full text-left bg-slate-950 border ${selectedTime === 'Субота 11:00' ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-emerald-500/30'} ${!isConfirmed && selectedTime !== 'Субота 11:00' ? 'hover:border-emerald-500/60' : ''} p-4 rounded-xl flex items-center justify-between transition-all disabled:opacity-90 disabled:cursor-default`}
                    >
                        <span className="text-sm font-semibold">🟢 Субота 11:00</span>
                        <span className="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md">Є місця</span>
                    </button>
                    <button
                        onClick={() => !isConfirmed && setSelectedTime('Неділя 14:00')}
                        disabled={isConfirmed}
                        className={`w-full text-left bg-slate-950 border ${selectedTime === 'Неділя 14:00' ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-amber-500/30'} ${!isConfirmed && selectedTime !== 'Неділя 14:00' ? 'hover:border-amber-500/60' : ''} p-4 rounded-xl flex items-center justify-between transition-all disabled:opacity-90 disabled:cursor-default`}
                    >
                        <span className="text-sm font-semibold">🔥 Неділя 14:00</span>
                        <span className="text-xs text-amber-400 bg-amber-950/60 px-2 py-1 rounded-md">Залишилось 2 місця</span>
                    </button>
                </div>

                {!isConfirmed && (
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedTime || isConfirming}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-all mb-8"
                    >
                        {isConfirming ? 'Бронюємо...' : '👉 Підтвердити безкоштовне бронювання'}
                    </button>
                )}

                {/* Опціональний Upsell */}
                <div className={`pt-6 border-t border-slate-800 ${!isConfirmed ? 'mt-2' : ''}`}>
                    <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-xl p-5 mb-4 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        
                        <p className="text-center text-slate-300 text-sm mb-3 relative z-10 font-medium">
                            🎁 Бажаєте викупити повний курс заздалегідь та зафіксувати <span className="text-emerald-400 font-bold">знижку -15%</span>?
                        </p>
                        
                        <div className="flex flex-col items-center justify-center gap-1 mb-4 relative z-10">
                            <div className="flex items-center gap-2 text-slate-400">
                                <span className="line-through decoration-red-500/50">{fullPrice} ₴</span>
                                <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">-15%</span>
                            </div>
                            <div className="text-4xl font-black text-white tracking-tight">
                                {discountedPrice} <span className="text-xl text-slate-400 font-medium">₴</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full bg-[#000000] hover:bg-[#1a1a1a] border border-white/5 disabled:opacity-50 text-white font-bold h-[52px] px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group relative z-10"
                        >
                            {isLoading ? 'Генеруємо інвойс...' : (
                                <div className="flex items-center gap-2.5">
                                    <span className="text-slate-300 font-medium text-sm mr-1">Оплатити курс через</span>
                                    <div className="flex items-center gap-[6px] group-hover:scale-105 transition-transform duration-300">
                                        <span className="text-white font-bold text-[19px] tracking-tight leading-none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>mono</span>
                                        <div className="bg-white rounded-[5px] px-[6px] py-[3px] flex items-center justify-center">
                                            <span className="text-black font-bold text-[14px] leading-none tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Pay</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>

                    {receiptUrl && (
                        <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 rounded-xl text-sm transition-colors flex justify-center items-center gap-2">
                            📄 Завантажити фіскальний чек (ПРРО Checkbox)
                        </button>
                    )}
                </div>

                {isConfirmed && (
                    <button
                        onClick={() => {
                            localStorage.removeItem('kiberUserPhone');
                            window.location.href = window.location.pathname;
                        }}
                        className="w-full mt-5 text-center text-slate-400 hover:text-white transition-colors text-sm py-2 font-medium"
                    >
                        ← Повернутися на головну
                    </button>
                )}

            </div>
        </div>
    );
};

// ГОЛОВНА СТОРІНКА ЛЕНДИНГУ
export default function LandingPage() {
    const [authData, setAuthData] = useState<{ name: string, course: string, phone: string, chosenTime?: string } | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [slotsData, setSlotsData] = useState<Record<string, number>>({});

    const fetchSlots = async () => {
        const { data, error } = await supabase.from('course_slots').select('course_slug, available_slots');
        if (data && !error) {
            const slotsMap = data.reduce((acc: Record<string, number>, item) => {
                acc[item.course_slug] = item.available_slots;
                return acc;
            }, {});
            setSlotsData(slotsMap);
        }
    };

    React.useEffect(() => {
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
                        // Показуємо кабінет ТІЛЬКИ якщо користувач вже обрав курс
                        if (data.course) {
                            setAuthData({ name: data.name || '', course: data.course || '', phone, chosenTime: data.chosen_time });
                            localStorage.setItem('kiberUserPhone', phone);
                        } else {
                            // Якщо курсу немає (прийшов з бота), просто зберігаємо телефон для автозаповнення
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
    }, []);

    if (isLoadingAuth) {
        return <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">Завантаження...</div>;
    }

    if (authData) {
        return <MiniCabinet clientName={authData.name} registeredCourse={authData.course} phone={authData.phone} initialTime={authData.chosenTime} />;
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 antialiased font-sans select-none selection:bg-cyan-500/30">
            <Header />
            <Hero />
            <PainPoints />
            <Courses slotsData={slotsData} />
            <RegisterForm 
                onAuthSuccess={(name, course, phone, chosenTime) => setAuthData({ name, course, phone, chosenTime })} 
                slotsData={slotsData}
                fetchSlots={fetchSlots}
            />
            <FAQ />
            <ContactsAndMap />
        </div>
    );
}
