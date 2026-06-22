import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

// 1. КОМПОНЕНТ: ШАПКА (Header)
const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <header className="w-full fixed top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Логотип */}
                <Link to="/" className="flex items-center gap-2 group min-w-0">
                    <img src="/logo.webp" alt="K1BER Logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 object-contain" />
                    <span className="text-white font-black text-base sm:text-xl tracking-tight truncate">
                        K1BER<span className="text-cyan-400">.</span>SCHOOL
                    </span>
                </Link>

                {/* Навігація — десктоп */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <a href="/#about" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Про нас
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="/#courses" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Навчання
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="/#faq" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        FAQ
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                    <a href="/#contacts" className="text-slate-400 hover:text-white transition-colors duration-200 relative group">
                        Контакти
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                    </a>
                </nav>

                {/* CTA кнопка — тільки десктоп */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#register"
                        className="relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-px"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Записатись на заняття
                    </a>
                </div>

                {/* Мобільні елементи — тільки бургер (кнопка є в меню) */}
                <div className="flex md:hidden items-center gap-2 flex-shrink-0">
                    {/* Кнопка прихована на найменших екранах, показується від 400px */}
                    <a
                        href="#register"
                        className="hidden xs:inline-flex bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-1.5 px-3 rounded-lg text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all whitespace-nowrap"
                    >
                        Записатись
                    </a>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        aria-label="Меню"
                    >
                        <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Мобільне меню */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80 border-t border-slate-800/60' : 'max-h-0'}`}>
                <nav className="px-6 py-4 flex flex-col space-y-3 bg-slate-950/95">
                    <a href="/#about" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">Про нас</a>
                    <a href="/#courses" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">Навчання</a>
                    <a href="/#faq" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">FAQ</a>
                    <a href="/#contacts" onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors py-1">📍 Контакти</a>

                    <a href="#register" onClick={() => setMenuOpen(false)} className="mt-2 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm">
                        Записатись на заняття
                    </a>
                </nav>
            </div>
        </header>
    );
};

// 8. ПЛАВАЮЧИЙ ВІДЖЕТ ЧАТУ (Floating Chat)
const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                    }`}
            >
                {[
                    {
                        name: 'Instagram',
                        url: '#',
                        bg: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]',
                        border: '',
                        icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        )
                    },
                    {
                        name: 'Threads',
                        url: '#',
                        bg: 'bg-black',
                        border: 'border border-slate-700',
                        icon: (
                            <img src="/threads.png" alt="Threads" className="w-[20px] h-[20px] object-cover rounded-full" />
                        )
                    },
                    {
                        name: 'Facebook',
                        url: '#',
                        bg: 'bg-[#1877F2]',
                        border: '',
                        icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        )
                    },
                    {
                        name: 'TikTok',
                        url: '#',
                        bg: 'bg-slate-900',
                        border: 'border border-slate-700',
                        icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.561 4.755 4.755 0 0 1-1.358-3.608h-3.268v15.671a3.62 3.62 0 1 1-3.62-3.62c.382 0 .749.06 1.096.17v-3.32a6.85 6.85 0 1 0 5.808 6.77V8.583a7.994 7.994 0 0 0 5.312 2.016V6.686z" />
                            </svg>
                        )
                    }
                ].map((link) => (
                    <div key={link.name} className="flex items-center gap-3">
                        <span className="text-white text-[13px] font-medium px-3 py-1.5 rounded-lg bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-800">
                            {link.name}
                        </span>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${link.bg} text-white hover:scale-110 transition-transform shadow-lg ${link.border}`}
                        >
                            {link.icon}
                        </a>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl hover:scale-105 transition-all duration-300 z-50 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                aria-label="Задати питання"
            >
                <div className={`transition-all duration-300 absolute ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div className={`transition-all duration-300 absolute ${isOpen ? 'opacity-100 scale-100 -rotate-90' : 'opacity-0 scale-50 rotate-90'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </button>
        </div>
    );
};

// 9. КОМПОНЕНТ: COOKIE БАНЕР
const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('kiber_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('kiber_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[9999] p-4 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                    <span className="text-3xl hidden md:block">🍪</span>
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">Ми використовуємо файли cookie</h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                            Це допомагає нам аналізувати трафік та робити сайт кращим для вас. Залишаючись на сайті, ви погоджуєтесь з нашою <Link to="/privacy" className="text-cyan-400 hover:underline">Політикою конфіденційності</Link>.
                        </p>
                    </div>
                </div>
                <button 
                    onClick={acceptCookies}
                    className="w-full md:w-auto whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all"
                >
                    Зрозуміло, дякую
                </button>
            </div>
        </div>
    );
};

export default function Layout() {
    return (
        <div className="w-full min-h-screen bg-slate-950 antialiased font-sans select-none selection:bg-cyan-500/30">
            <Header />
            
            <main className="pt-[72px]">
                <Outlet />
            </main>

            <footer className="w-full bg-slate-950 py-10 border-t border-slate-900">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
                        <Link to="/privacy" className="text-slate-500 hover:text-cyan-400 transition-colors">Політика конфіденційності</Link>
                        <Link to="/offer" className="text-slate-500 hover:text-cyan-400 transition-colors">Публічна оферта</Link>
                    </div>
                    
                    <div className="text-center space-y-1">
                        <p className="text-slate-600 text-xs font-mono">
                            ФОП Прізвище Ім'я По батькові (приклад)
                        </p>
                        <p className="text-slate-600 text-xs font-mono">
                            ІПН: 1234567890 | м. Суми, вул. Назва, 1
                        </p>
                    </div>

                    <p className="text-slate-700 text-xs">
                        © {new Date().getFullYear()} K1BER.SCHOOL · Всі права захищено
                    </p>
                </div>
            </footer>

            <FloatingChat />
            <CookieBanner />
        </div>
    );
}
