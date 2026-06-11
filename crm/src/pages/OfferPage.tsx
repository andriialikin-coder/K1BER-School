import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function OfferPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-300 py-24 px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Повернутися на головну
                </Link>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-800">
                        <img src="/logo.webp" alt="K1BER Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] object-contain" />
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Публічна оферта</h1>
                            <p className="text-cyan-400 font-medium tracking-widest uppercase text-xs mt-1">K1BER.SCHOOL</p>
                        </div>
                    </div>

                    <div className="space-y-8 text-slate-400 leading-relaxed">
                        <p className="text-lg text-slate-300">
                            Цей договір є офіційною пропозицією (публічною офертою) <span className="text-white font-semibold">K1BER.SCHOOL</span> щодо надання освітніх послуг.
                        </p>
                        
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-sm">
                            Тут буде розміщено повний юридичний текст договору публічної оферти (Terms of Service).
                            Будь ласка, замініть цей текст на офіційний документ від вашого юриста, який включає правила оплати, повернення коштів та правила відвідування школи.
                        </div>

                        <div className="space-y-6 pt-6 opacity-50 blur-[2px] select-none pointer-events-none">
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4">1. Загальні положення</h2>
                                <p>1.1. Цей договір є публічним відповідно до ст. 633, 641 Цивільного кодексу України...</p>
                                <p>1.2. Оплата послуг або реєстрація на сайті означає повне прийняття умов...</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 mt-8">2. Предмет договору</h2>
                                <p>2.1. Виконавець зобов'язується надати Замовнику освітні послуги...</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
