import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-300 py-24 px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Повернутися на головну
                </Link>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-800">
                        <img src="/logo.webp" alt="School Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] object-contain" />
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Політика конфіденційності</h1>
                            <p className="text-cyan-400 font-medium tracking-widest uppercase text-xs mt-1">SCHOOL</p>
                        </div>
                    </div>

                    <div className="space-y-8 text-slate-400 leading-relaxed">
                        <p className="text-lg text-slate-300">
                            Використовуючи наш веб-сайт, ви надаєте <span className="text-white font-semibold">SCHOOL</span> згоду на обробку всіх наданих вами даних з метою надання якісного сервісу.
                        </p>
                        <p>
                            Приймаючи цю політику, ви також підтверджуєте, що ознайомилися з переліком своїх прав як суб'єкта даних.
                        </p>

                        <div className="space-y-6 pt-6">
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">1</span>
                                    Збір особистої інформації
                               </h2>
                                <div className="space-y-4 pl-4 border-l-2 border-slate-800">
                                    <p><strong className="text-slate-300 font-semibold">1.1.</strong> Під час заповнення контактних форм, запису на захід чи консультацію ми просимо вас повідомити необхідну особисту інформацію в обсязі, який є необхідним для надання послуг.</p>
                                    <p><strong className="text-slate-300 font-semibold">1.2.</strong> Файли cookie - коли ви заходите на наш сайт, ми надсилаємо один або кілька файлів cookie на вашому комп'ютері або іншому пристрої. Файли cookie використовуються для того, щоб підвищувати якість послуг: зберігати налаштування користувача.</p>
                                    <p><strong className="text-slate-300 font-semibold">1.3.</strong> Інформація про відвідування - при доступі на сайт наші сервери автоматично можуть записувати певну інформацію. Ці журнали серверів можуть містити таку інформацію, як веб-запит, IP-адресу, тип та версію браузера, дату та час запиту.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">2</span>
                                    Захист інформації
                                </h2>
                                <div className="space-y-4 pl-4 border-l-2 border-slate-800">
                                    <p><strong className="text-slate-300 font-semibold">2.1.</strong> Ми вживаємо всіх необхідних заходів для захисту даних від неавторизованого доступу, зміни, розкриття чи знищення. До цих заходів, зокрема, внутрішня перевірка процесів збору, зберігання та обробки даних та заходи безпеки, включаючи відповідне шифрування для захисту електронних даних, а також запобігання неавторизованому доступу.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 text-sm">3</span>
                                    Зміна дійсної політики конфіденційності
                                </h2>
                                <div className="space-y-4 pl-4 border-l-2 border-slate-800">
                                    <p><strong className="text-slate-300 font-semibold">3.1.</strong> Дійсна політика конфіденційності може змінюватися. Зміни, що вносяться до політики конфіденційності, публікуються в цьому документі.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
