import React, { useState } from 'react';

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
                </nav>

                {/* CTA кнопка */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#register"
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
                    <a href="#register" onClick={() => setMenuOpen(false)} className="mt-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm">
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

        <div className="relative max-w-4xl">

            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-4 py-2 rounded-full border border-cyan-800/40 mb-8 shadow-lg shadow-cyan-900/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Суми · Набір відкрито · Вік 6–15 років
            </div>

            {/* Головний заголовок */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
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

            {/* Підзаголовок */}
            <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
                Школа програмування для дітей у Сумах. Ваша дитина не просто вчить теорію — вона{' '}
                <span className="text-slate-200 font-medium">пише код і випускає власні проекти</span>{' '}
                вже з першого місяця.
            </p>

            {/* Статистика */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 mb-10 text-center">
                {[
                    { value: '200+', label: 'учнів у Сумах' },
                    { value: '3', label: 'напрямки навчання' },
                    { value: '1-е', label: 'заняття — безкоштовно' },
                ].map((stat) => (
                    <div key={stat.value} className="flex flex-col items-center">
                        <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-none">
                            {stat.value}
                        </span>
                        <span className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                    href="#register"
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
const BENEFITS = [
    {
        emoji: '🚀',
        title: 'Потужний апгрейд навичок',
        text: 'Замість безцільного скролінгу гаджетів на канікулах — розвиток логіки, креативності та фундаментальних цифрових навичок.',
        accent: 'from-cyan-500/10 to-blue-600/10',
        border: 'border-cyan-800/30 group-hover:border-cyan-500/50',
        glow: 'bg-cyan-950/60',
    },
    {
        emoji: '👥',
        title: 'Нові друзі та оточення',
        text: 'Командна робота, живе спілкування з однолітками, які поділяють інтерес до технологій, та море позитивних емоцій.',
        accent: 'from-violet-500/10 to-blue-600/10',
        border: 'border-violet-800/30 group-hover:border-violet-500/50',
        glow: 'bg-violet-950/60',
    },
    {
        emoji: '🎓',
        title: 'Підтримка та інтерактив',
        text: 'Заняття проходять у формі гри, де немає нудної теорії, а кожну дитину супроводжує та підтримує досвідчений асистент.',
        accent: 'from-emerald-500/10 to-cyan-600/10',
        border: 'border-emerald-800/30 group-hover:border-emerald-500/50',
        glow: 'bg-emerald-950/60',
    },
];

const PainPoints = () => (
    <section id="about" className="w-full bg-slate-900 text-white py-20 px-6 border-b border-slate-950">
        <div className="max-w-5xl mx-auto">

            {/* Заголовок */}
            <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-800/40 mb-4">
                    Літній IT-інтенсив
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                    Що отримає ваша дитина
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        на літньому IT-інтенсиві?
                    </span>
                </h2>
            </div>

            {/* Картки */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BENEFITS.map((b) => (
                    <div
                        key={b.title}
                        className={`group relative bg-slate-950 p-7 rounded-2xl border ${b.border} transition-all duration-300 overflow-hidden`}
                    >
                        {/* Градієнт-підсвічування */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${b.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                        <div className="relative">
                            {/* Іконка-бейдж */}
                            <div className={`w-14 h-14 ${b.glow} rounded-2xl flex items-center justify-center text-2xl mb-5 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {b.emoji}
                            </div>

                            <h3 className="text-lg font-bold text-white leading-snug mb-3">
                                {b.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {b.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// 4. КОМПОНЕНТ: НАПРЯМКИ НАВЧАННЯ (Courses)
const COURSES = [
    {
        emoji: '🎮',
        tag: 'Gamedev',
        title: 'Створення власних ігор',
        desc: 'Проектування ігрових рівнів, розробка логіки персонажів та механік. Дитина зрозуміє, як влаштовані її улюблені ігри зсередині.',
        ages: '7–15 років',
        tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40',
        btnBorder: 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40',
        cardBorder: 'hover:border-cyan-500/40',
        emojiGlow: 'from-cyan-500/20 to-blue-600/20',
    },
    {
        emoji: '🧊',
        tag: '3D & Animation',
        title: '3D-моделювання та анімація',
        desc: 'Робота з тривимірним простором, створення об’єктних моделей, персонажів та їх оживлення за допомогою анімації.',
        ages: '9–15 років',
        tagColor: 'text-violet-400 bg-violet-950/60 border-violet-800/40',
        btnBorder: 'border-violet-500/30 hover:border-violet-400 hover:bg-violet-950/40',
        cardBorder: 'hover:border-violet-500/40',
        emojiGlow: 'from-violet-500/20 to-blue-600/20',
    },
    {
        emoji: '💻',
        tag: 'IT & Code',
        title: 'Сучасні IT-напрямки',
        desc: 'Практичні проекти: від перших кроків у коді до створення реальних інтерфейсів. Фундамент для майбутньої IT-професії.',
        ages: '10–15 років',
        tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
        btnBorder: 'border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40',
        cardBorder: 'hover:border-emerald-500/40',
        emojiGlow: 'from-emerald-500/20 to-cyan-600/20',
    },
];

const Courses = () => (
    <section id="courses" className="w-full bg-slate-950 text-white py-20 px-6 border-b border-slate-900">
        <div className="max-w-5xl mx-auto">

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

            {/* Картки курсів */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COURSES.map((course) => (
                    <div
                        key={course.title}
                        className={`group bg-slate-900 rounded-2xl border border-slate-800 ${course.cardBorder} transition-all duration-300 flex flex-col overflow-hidden`}
                    >
                        {/* Верхня частина — іконка + тег */}
                        <div className={`relative h-44 bg-gradient-to-br ${course.emojiGlow} bg-slate-950 flex items-center justify-center border-b border-slate-800 group-hover:border-slate-700 transition-colors`}>
                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                                {course.emoji}
                            </span>
                            <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${course.tagColor}`}>
                                {course.tag}
                            </span>
                        </div>

                        {/* Контент */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <h3 className="text-xl font-black text-slate-100 leading-tight">{course.title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed flex-1">{course.desc}</p>

                            {/* Вік + кнопка */}
                            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                                <span className="text-xs text-slate-500 font-medium">
                                    👤 {course.ages}
                                </span>
                                <a
                                    href="#register"
                                    className={`inline-flex items-center gap-1.5 text-sm font-bold text-white py-2 px-4 rounded-xl border ${course.btnBorder} transition-all duration-200`}
                                >
                                    Забронювати
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// 5. КОМПОНЕНТ: ФОРМА ЗАХВАТУ ЛІДІВ (Форма -> Наша CRM)
const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Тут буде наш знайомий інжект у Supabase: supabase.from('leads').insert()
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000);
    };

    return (
        <section id="register" className="w-full bg-slate-900 text-white py-20 px-6 border-b border-slate-950">
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
                <p className="text-slate-400 text-sm text-center mt-3 leading-relaxed">
                    Скоріше обирайте напрямок та бронюйте місце для дитини.
                    <span className="text-slate-300 font-medium"> Кількість місць у групах обмежена!</span>
                </p>

                {success ? (
                    <div className="mt-6 p-4 bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 rounded-xl text-center text-sm font-medium">
                        🎉 Заявку отримано! Ми зателефонуємо вам найближчим часом.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Ім&apos;я батька/матері</label>
                            <input type="text" required placeholder="Наприклад, Сергій" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Номер телефону</label>
                            <input type="tel" required placeholder="+380 (__) ___-__-__" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition">
                            {loading ? 'Відправляємо...' : 'Записати на пробне заняття →'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// 6. КОМПОНЕНТ: БЛОК FAQ (Заділ під AI Visibility)
const FAQ = () => (
    <section id="faq" className="w-full bg-slate-950 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center tracking-tight">[Популярні питання батьків]</h2>
            <div className="mt-12 space-y-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-slate-900 p-5 rounded-xl border border-slate-800/60">
                        <h3 className="font-bold text-slate-200">[Питання від батьків #{item}?]</h3>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            [Розгорнута відповідь-абзац. ШІ-роботи ChatGPT та Claude зчитають цей блок за мілісекунду і будуть використовувати ці відповіді для GEO-рекомендацій бренду]
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ГОЛОВНА СТОРІНКА ЛЕНДИНГУ
export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-950 antialiased font-sans select-none selection:bg-cyan-500/30">
            <Header />
            <Hero />
            <PainPoints />
            <Courses />
            <RegisterForm />
            <FAQ />
        </div>
    );
}
