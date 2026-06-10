import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ageGroups } from './BentoModules';

// Header extracted to Layout.tsx



// 4. КОМПОНЕНТ: НАПРЯМКИ НАВЧАННЯ (Courses)
export const COURSES = [
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
        slug: 'construct-stitch',
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
        slug: 'python-farm',
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
        slug: 'app-inventor',
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

export const Courses = ({ slotsData = {}, coursePrices, courseDetails, onOpenProgram, onCourseView }: { slotsData?: Record<string, number>, coursePrices?: Record<string, number>, courseDetails?: Record<string, any>, onOpenProgram?: (slug: string) => void, onCourseView?: (title: string) => void }) => {
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
        const event = new CustomEvent('selectCourse', { detail: { course: `Інтенсив: ${courseTitle}` } });
        window.dispatchEvent(event);
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
                    {COURSES.map((defCourse) => {
                        const details = courseDetails?.[defCourse.slug] || {};
                        const course = {
                            title: details.title || defCourse.title,
                            desc: details.desc || defCourse.desc,
                            image: details.image || defCourse.image,
                            ages: details.ages || defCourse.ages,
                            tag: details.tag || defCourse.tag,
                            tagColor: details.tagColor || defCourse.tagColor,
                            btnBorder: details.btnBorder || defCourse.btnBorder,
                            cardBorder: details.cardBorder || defCourse.cardBorder,
                            slug: defCourse.slug,
                            price: defCourse.price,
                        };
                        return (
                        <div
                            key={course.slug}
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
                                <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-5">{course.desc}</p>

                                {/* Ціна */}
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-white">{coursePrices?.[course.slug] ?? course.price} ₴</span>
                                    <span className="text-sm font-medium text-slate-500">/ інтенсив</span>
                                </div>

                                {/* Кнопка */}
                                <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                    <a
                                        href="#register"
                                        onClick={(e) => handleSelectCourse(e, course.title)}
                                        className="w-full inline-flex items-center justify-center gap-2 text-base font-bold text-white py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group"
                                    >
                                        Забронювати місце
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                    <button
                                        onClick={(e) => { e.preventDefault(); onCourseView && onCourseView(course.title); onOpenProgram && onOpenProgram(course.slug); }}
                                        className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-white py-2 px-4 underline-offset-4 hover:underline transition-all duration-200"
                                    >
                                        Подивитись програму навчань
                                    </button>
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

// 5. КОМПОНЕНТ: ФОРМА ЗАХВАТУ ЛІДІВ (Форма -> Наша CRM)
export const RegisterForm = ({ sourceName = 'Інтенсив', onAuthSuccess, slotsData, courseModules, fetchSlots, behaviorLogRef }: { sourceName?: string; onAuthSuccess?: (name: string, course: string, phone: string, chosenTime?: string) => void; slotsData?: Record<string, number>; courseModules?: Record<string, any[]>; fetchSlots?: () => void; behaviorLogRef?: React.MutableRefObject<any>; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tab, setTab] = useState<'new' | 'existing'>('new');
    const [formData, setFormData] = useState({ name: '', phone: '+380', course: '', city: '', child_age: '', child_name: '' });

    const [loginPhone, setLoginPhone] = useState('+380');
    const [loginError, setLoginError] = useState('');

    const isPhoneValid = (phone: string) => {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 12 && digits.startsWith('380');
    };

    const isFormInvalid = tab === 'new'
        ? (!formData.name.trim() || !formData.course || !isPhoneValid(formData.phone) || !formData.city.trim() || !formData.child_age.trim() || !formData.child_name.trim())
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
            window.location.hash = '#register';
        }

        const handleCourseSelect = (e: CustomEvent) => {
            setFormData(prev => ({ ...prev, course: e.detail.course }));
            setTab('new');
            window.location.hash = '#register';
        };
        window.addEventListener('selectCourse', handleCourseSelect as EventListener);

        const handleHashChange = () => {
            setIsOpen(window.location.hash === '#register');
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('selectCourse', handleCourseSelect as EventListener);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const closeForm = () => {
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
        setIsOpen(false);
    };

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
            let programType = '';
            if (formData.course.startsWith('Академія')) programType = 'Академія';
            if (formData.course.startsWith('Інтенсив')) programType = 'Інтенсив';

            const payload = {
                name: formData.name,
                phone: formData.phone,
                course: formData.course,
                city: formData.city,
                child_age: formData.child_age,
                child_name: formData.child_name,
                source: sourceName,
                program_type: programType,
                behavior_log: behaviorLogRef ? behaviorLogRef.current : {}
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

            // Відправка сповіщення через захищений бекенд (fire-and-forget, щоб не блокувати UI)
            fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lead: payload })
            }).catch(e => console.error("Помилка відправки в Telegram:", e));

            // Крок 3: Списання місця
            const selectedCourseSlug = COURSES.find(c => formData.course.includes(c.title))?.slug;
            if (selectedCourseSlug && slotsData && fetchSlots) {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={closeForm}></div>
            <div className="relative w-full max-w-md bg-slate-950 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <button onClick={closeForm} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors bg-slate-900 rounded-full hover:bg-slate-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
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
                        Безкоштовний урок
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

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Місто</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="Суми / Онлайн"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Вік дитини</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.child_age}
                                            onChange={e => setFormData({ ...formData, child_age: e.target.value })}
                                            placeholder="Напр. 10 років"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Вибір напрямку</label>
                                    <select
                                        required
                                        value={formData.course}
                                        onChange={e => {
                                            setFormData({ ...formData, course: e.target.value });
                                            if (behaviorLogRef && behaviorLogRef.current && behaviorLogRef.current.interactions) {
                                                behaviorLogRef.current.interactions.course_selection_history.push(e.target.value);
                                            }
                                        }}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white appearance-none"
                                    >
                                        <option value="" disabled>Оберіть напрямок...</option>
                                        <optgroup label="Літні інтенсиви">
                                            {COURSES.map(c => (
                                                <option key={c.title} value={`Інтенсив: ${c.title}`}>{c.title}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Академія (Групи та модулі)">
                                            {ageGroups.map(group => (
                                                <React.Fragment key={group.id}>
                                                    {group.modules.map((m: any, i: number) => (
                                                        <option key={`${group.id}-${i}`} value={`Академія: ${group.title} — ${m.name}`}>{m.name} ({group.title})</option>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </optgroup>
                                        {courseModules && Object.entries(courseModules).some(([_, mods]) => mods.length > 0) && (
                                            <optgroup label="Інтенсиви (Модулі)">
                                                {Object.entries(courseModules).map(([slug, mods]) => (
                                                    mods.length > 0 && mods.map((m: any, i: number) => (
                                                        <option key={`${slug}-${i}`} value={`Інтенсив (Модуль): ${COURSES.find(c => c.slug === slug)?.title} — ${m.title}`}>{m.title} ({COURSES.find(c => c.slug === slug)?.title})</option>
                                                    ))
                                                ))}
                                            </optgroup>
                                        )}
                                        {formData.course && !formData.course.startsWith('Інтенсив:') && !formData.course.startsWith('Академія:') && (
                                            <option value={formData.course}>{formData.course}</option>
                                        )}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3 my-4 flex items-center justify-center gap-2">
                            <span className="text-xl">🎁</span>
                            <span className="text-emerald-400 font-bold text-sm text-center">
                                Приведи друга — отримай знижку -15% на абонемент!
                            </span>
                        </div>

                        <button type="submit" disabled={loading || isFormInvalid} className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl text-sm transition">
                            {loading ? 'Відправляємо...' : tab === 'new' ? 'Забронювати місце на урок →' : 'Увійти в кабінет →'}
                        </button>
                        
                        <p className="mt-5 text-[11px] text-slate-500 text-center leading-relaxed px-2">
                            Підтвердіть свою згоду на обробку персональних даних. Ми зобов'язуємося використовувати отриману інформацію тільки всередині нашої компанії, і не передавати третім особам. <a href="#!" className="text-cyan-500 hover:underline">Детальніше</a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

// 6. КОМПОНЕНТ: БЛОК FAQ (Заділ під AI Visibility)
export const FAQ = ({ onFaqToggle }: { onFaqToggle?: (question: string) => void }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number, question: string) => {
        setOpenIndex(openIndex === index ? null : index);
        if (openIndex !== index && onFaqToggle) {
            onFaqToggle(question);
        }
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
        <section id="faq" className="relative w-full bg-slate-950 text-white py-16 px-6 border-b border-slate-900 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Ліва частина: Сова (Filin) */}
                <div className="lg:col-span-5 flex justify-center relative group cursor-pointer">
                    {/* Глоу ефект за совою */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 md:w-48 h-40 md:h-48 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none transition-all duration-700 group-hover:bg-cyan-500/20 group-hover:w-64 group-hover:h-64" />
                    
                    {/* Неонові Кібер-Крила */}
                    <svg 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] lg:w-[500px] h-[350px] md:h-[450px] lg:h-[500px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-50 group-hover:scale-100" 
                        viewBox="0 0 800 600"
                    >
                        <defs>
                            <linearGradient id="neonWing" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
                                <stop offset="50%" stopColor="#3b82f6" /> {/* blue-500 */}
                                <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
                            </linearGradient>
                            <filter id="glowWing">
                                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        
                        {/* Ліве крило */}
                        <g filter="url(#glowWing)" fill="none" stroke="url(#neonWing)" strokeLinecap="round" className="origin-[400px_300px] transition-transform duration-700 ease-out -rotate-12 group-hover:-rotate-[25deg]">
                            <path d="M 380 300 Q 250 250 100 100 Q 200 180 360 250" strokeWidth="6" />
                            <path d="M 380 320 Q 280 280 150 180 Q 230 230 360 280" strokeWidth="5" />
                            <path d="M 380 340 Q 300 320 200 250 Q 280 290 370 310" strokeWidth="4" />
                        </g>

                        {/* Праве крило */}
                        <g filter="url(#glowWing)" fill="none" stroke="url(#neonWing)" strokeLinecap="round" className="origin-[400px_300px] transition-transform duration-700 ease-out rotate-12 group-hover:rotate-[25deg]">
                            <path d="M 420 300 Q 550 250 700 100 Q 600 180 440 250" strokeWidth="6" />
                            <path d="M 420 320 Q 520 280 650 180 Q 570 230 440 280" strokeWidth="5" />
                            <path d="M 420 340 Q 500 320 600 250 Q 520 290 430 310" strokeWidth="4" />
                        </g>
                    </svg>

                    <img 
                        src="/filin.webp" 
                        alt="Мудра сова K1BER" 
                        className="w-40 sm:w-48 md:w-56 lg:w-[320px] object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.25)] relative z-10 transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4"
                    />
                </div>

                {/* Права частина: Акордеон FAQ */}
                <div className="lg:col-span-7">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-center lg:text-left">
                        Популярні питання <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">батьків</span>
                    </h2>
                    
                    <div className="space-y-4">
                        {faqs.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={i}
                                    onClick={() => toggleFaq(i, item.q)}
                                    className={`cursor-pointer bg-white/5 backdrop-blur-md border rounded-2xl transition-all duration-300 p-5 md:p-6 ${isOpen ? 'border-cyan-500/50 bg-white/10' : 'border-white/10 hover:border-cyan-500/30'}`}
                                >
                                    <div className="flex justify-between items-center gap-4">
                                        <h3 className="text-white font-bold text-lg">{item.q}</h3>
                                        <div className={`flex-shrink-0 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'rotate-0'}`}>
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

// 7. КОМПОНЕНТ: КОНТАКТИ ТА КАРТА (GEO / AI Visibility)
export const ContactsAndMap = () => (
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
                                href="#register"
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
                    src="https://maps.google.com/maps?q=ТРЦ%20Київ,%20вулиця%20Нижньовоскресенська%201,%20Суми&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
export const MiniCabinet = ({ clientName, registeredCourse, phone, initialTime }: { clientName: string, registeredCourse: string, phone: string, initialTime?: string }) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedTime, setSelectedTime] = useState(initialTime || '');
    const [isConfirmed, setIsConfirmed] = useState(!!initialTime);

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

                {/* Опціональний Upsell / Акція */}
                <div className={`pt-6 border-t border-slate-800 ${!isConfirmed ? 'mt-2' : ''}`}>
                    <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-xl p-5 mb-4 relative overflow-hidden text-center">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest relative z-10">
                            🎁 Спеціальна пропозиція
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 relative z-10">
                            Оплати абонемент (4 заняття) <br className="hidden md:block" />в день пробного уроку
                        </h3>
                        <p className="text-slate-300 text-sm mb-4 relative z-10">
                            — та отримай тиждень навчання <span className="text-emerald-400 font-bold uppercase tracking-wide">безкоштовно!</span>
                        </p>
                        
                        <div className="w-full bg-white/5 border border-white/10 text-slate-300 font-medium py-3 px-4 rounded-xl text-sm flex justify-center items-center gap-2 relative z-10">
                            👉 Деталі розкаже адміністратор на уроці
                        </div>
                    </div>
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

// FloatingChat extracted to Layout.tsx

export const ProgramModal = ({ course, modules, onClose }: { course: any, modules: any[], onClose: () => void }) => {
    const handleSelectModule = (moduleTitle: string) => {
        const event = new CustomEvent('selectCourse', { detail: { course: `Інтенсив (Модуль): ${course?.title} — ${moduleTitle}` } });
        window.dispatchEvent(event);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
                <div className="p-6 border-b border-slate-800/60 bg-slate-900/80 flex justify-between items-center z-10 relative">
                    <div>
                        <h3 className="text-[11px] text-cyan-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                            Програма інтенсиву
                        </h3>
                        <h2 className="text-2xl font-black text-white">{course?.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-950/30 z-10 relative custom-scrollbar">
                    {modules && modules.length > 0 ? (
                        modules.map((m: any, i: number) => (
                            <div key={i} className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl shadow-sm hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-cyan-500 transition-colors"></div>
                                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="bg-cyan-950 text-cyan-400 w-6 h-6 rounded-md flex items-center justify-center border border-cyan-800/50">{i + 1}</span>
                                    Модуль
                                </h4>
                                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                                <button onClick={() => handleSelectModule(m.title)} className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-white py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">Забронювати місце</button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <span className="text-5xl mb-4 opacity-50">🚧</span>
                            <p className="text-slate-400 font-medium">Програма курсу ще формується.<br/>Деталі з'являться незабаром!</p>
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-slate-800/60 bg-slate-900/80 flex justify-end z-10 relative">
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all">Зрозуміло</button>
                </div>
            </div>
        </div>
    );
};


