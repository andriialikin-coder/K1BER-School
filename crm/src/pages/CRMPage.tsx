import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users, Phone, TrendingUp, Star, Search, RefreshCw,
  ChevronDown, Calendar, Database, Loader2, AlertCircle,
  X, PhoneCall, UserCheck, Archive, PhoneMissed, Clock,
  CheckCircle2, XCircle, LayoutDashboard, Component, Edit3, Save, Settings, Sparkles, LogOut
} from 'lucide-react';

// ═══════════════════════════════════════════════
//  SUPABASE CLIENT (Imported from lib)
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════
interface Lead {
  id: number;
  created_at: string;
  telegram_id: string;
  name: string;
  source: string;
  status: string;
  phone: string;
  course: string;
  city: string;
  child_age: string;
  chosen_time?: string;
  behavior_log?: any;
  program_type?: string;
  child_name?: string;
  consent?: boolean;
}

interface CourseSlot {
  course_slug: string;
  available_slots: number;
  price?: number;
  modules?: any[];
  details?: {
    image?: string;
    tag?: string;
    title?: string;
    desc?: string;
    ages?: string;
    tagColor?: string;
    btnBorder?: string;
    cardBorder?: string;
  };
}

// ═══════════════════════════════════════════════
//  STATUS CONFIGURATION
// ═══════════════════════════════════════════════
const STATUS_OPTIONS = [
  { value: 'Новий', label: 'Новий', icon: Star, badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20', dot: 'bg-blue-500' },
  { value: 'В роботі', label: 'В роботі', icon: Clock, badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-500/20', dot: 'bg-amber-400' },
  { value: 'Коллбєк', label: 'Коллбєк', icon: PhoneCall, badge: 'bg-violet-50 text-violet-700 ring-1 ring-violet-500/20', dot: 'bg-violet-500' },
  { value: 'Не відповідає', label: 'Не відповідає', icon: PhoneMissed, badge: 'bg-orange-50 text-orange-700 ring-1 ring-orange-500/20', dot: 'bg-orange-400' },
  { value: 'Запрошений', label: 'Запрошений', icon: UserCheck, badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20', dot: 'bg-emerald-500' },
  { value: 'Не цікаво', label: 'Не цікаво', icon: XCircle, badge: 'bg-rose-50 text-rose-700 ring-1 ring-rose-500/20', dot: 'bg-rose-400' },
  { value: 'Архів', label: 'Архів', icon: Archive, badge: 'bg-slate-100 text-slate-500 ring-1 ring-slate-400/20', dot: 'bg-slate-400' },
];

const LEGACY_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  new:            { label: 'Новий (сист.)',  badge: 'bg-blue-50 text-blue-600 ring-1 ring-blue-500/20',  dot: 'bg-blue-400' },
  in_progress:    { label: 'В діалозі',      badge: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-500/20', dot: 'bg-yellow-400' },
  phone_captured: { label: 'Новий',    badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',  dot: 'bg-blue-500' },
  time_confirmed: { label: 'Новий',    badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',  dot: 'bg-blue-500' },
};

const getStatusConfig = (status: string) => {
  return (
    STATUS_OPTIONS.find(s => s.value === status) ??
    (LEGACY_CONFIG[status]
      ? { ...LEGACY_CONFIG[status], value: status, icon: CheckCircle2 }
      : { value: status, label: status, badge: 'bg-gray-100 text-gray-500 ring-1 ring-gray-400/20', dot: 'bg-gray-400', icon: CheckCircle2 }
    )
  );
};

const DEFAULT_COURSES = [
    { slug: 'minecraft', price: 4500, image: '/1.png', tag: 'Gamedev', title: 'Minecraft: Архітектори реальності', desc: 'Minecraft перетворюється на навчальне середовище, де діти проектують світи, створюють портали та механізми. Освоюють логіку, алгоритми та основи програмування. Діти вчаться шукати помилки та розробляти альтернативи – чудовий міст до усвідомленого ІТ-мислення.', ages: '8+', tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50', btnBorder: 'border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40', cardBorder: 'hover:border-emerald-500/40' },
    { slug: 'geometry-dash', price: 4800, image: '/2.png', tag: 'Gamedev', title: 'Geometry Dash: 2D-платформер', desc: 'Дитина створить 2D-платформер у стилі Geometry Dash із мультяшною графікою, музикою та перешкодами. Розбере алгоритми справжніх хітових ігор: рух, зіткнення, ритм. Навчиться не просто грати, а розуміти, як ігри влаштовані зсередини, та створювати свої.', ages: '11+', tagColor: 'text-blue-400 bg-blue-950/80 border-blue-500/50', btnBorder: 'border-blue-500/30 hover:border-blue-400 hover:bg-blue-950/40', cardBorder: 'hover:border-blue-500/40' },
    { slug: 'construct-stitch', price: 5200, image: '/3.png', tag: 'Gamedev', title: 'Construct: Лабораторія ігор зі Стічем', desc: 'Це не гра і не просто «розвага на канікулах». Це перша усвідомлена розробка цифрового продукту для дітей. Дитина створює гру: придумує персонажів, логіку, рівні, правила та ефекти. Що отримує: впевненість у своїх здібностях створювати перші проекти та розвиток інтересу до технологій без стресу.', ages: '8+', tagColor: 'text-violet-400 bg-violet-950/80 border-violet-500/50', btnBorder: 'border-violet-500/30 hover:border-violet-400 hover:bg-violet-950/40', cardBorder: 'hover:border-violet-500/40' },
    { slug: 'python-farm', price: 6000, image: '/8.png', tag: 'Code', title: 'Python: Ферма-симулятор', desc: 'Дитина напише на Python власну ферму: садити, вирощувати, збирати врожай та добувати ресурси як у Stardew Valley, тільки вона не грає, а створює. Освоїть змінні, цикли, умови та функції на живому проекті. Кожен рядок коду дає видимий результат. До кінця тижня покаже вам свою ферму та пояснить, як вона працює.', ages: '11+', tagColor: 'text-yellow-400 bg-yellow-950/80 border-yellow-500/50', btnBorder: 'border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-950/40', cardBorder: 'hover:border-yellow-500/40' },
    { slug: 'app-inventor', price: 5500, image: '/5.png', tag: 'Mobile & AI', title: 'ШІ та App Inventor: Мобільні додатки', desc: 'Збираємо перший цифровий проект, як справжні розробники. Діти створюють мобільний додаток з елементами штучного інтелекту: оформлення, логіка, функції. Розвивають підприємницьке мислення, творчість та навичку презентації продукту. Дитина проходить шлях: ідея -> продукт -> результат. Підсумок – гордість за створений цифровий проект.', ages: '8+', tagColor: 'text-pink-400 bg-pink-950/80 border-pink-500/50', btnBorder: 'border-pink-500/30 hover:border-pink-400 hover:bg-pink-950/40', cardBorder: 'hover:border-pink-500/40' },
    { slug: 'web-ai', price: 5800, image: '/6.png', tag: 'Web & AI', title: 'Ідеальний сайт з нуля + ШІ', desc: 'Дитина сама збере справжній сайт: структура, дизайн, код. Навчиться використовувати штучний інтелект для створення текстів та прискорення роботи. Тема на вибір: улюблена гра, блог про себе або сторінка для події. На виході виходить готовий проект у портфоліо та навички, які знадобляться у будь-якій професії.', ages: '11+', tagColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50', btnBorder: 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40', cardBorder: 'hover:border-cyan-500/40' },
    { slug: '3d-print', price: 6500, image: '/7.png', tag: '3D & Print', title: '3D-моделювання та 3D-друк', desc: 'Дитина перейде від звичайного споживання до створення реальних об\'єктів. Освоїть роботу з тривимірним простором, навчиться проектувати власні моделі, іграшки чи персонажів у спеціальних програмах та підготує їх до друку. Підсумок інтенсиву — власноруч створена тривимірна фігура, надрукована на справжньому 3D-принтері.', ages: '7+', tagColor: 'text-orange-400 bg-orange-950/80 border-orange-500/50', btnBorder: 'border-orange-500/30 hover:border-orange-400 hover:bg-orange-950/40', cardBorder: 'hover:border-orange-500/40' }
];

// ═══════════════════════════════════════════════
//  SMALL COMPONENTS
// ═══════════════════════════════════════════════
function StatCard({ icon: Icon, label, value, colorClass }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; value: number; colorClass: string; }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3 min-w-[140px]">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider leading-none">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1 leading-none">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg = getStatusConfig(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusSelect({ lead, onUpdate, isUpdating }: { lead: Lead; onUpdate: (id: number, status: string) => void; isUpdating: boolean; }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(lead.id, e.target.value);
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={STATUS_OPTIONS.find(s => s.value === lead.status) ? lead.status : ''}
        onChange={handleChange}
        disabled={isUpdating}
        className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-slate-700 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all duration-150 disabled:opacity-50 disabled:cursor-wait"
      >
        {!STATUS_OPTIONS.find(s => s.value === lead.status) && (
          <option value="" disabled>{getStatusConfig(lead.status).label}</option>
        )}
        {STATUS_OPTIONS.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
        {isUpdating ? <Loader2 size={13} className="animate-spin text-blue-500" /> : <ChevronDown size={13} className="text-slate-400" />}
      </span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-50">
      {[120, 100, 120, 80, 100].map((w, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3.5 bg-slate-100 rounded-full" style={{ width: w }} />
          {i === 1 && <div className="h-3 bg-slate-50 rounded-full mt-2 w-16" />}
        </td>
      ))}
    </tr>
  );
}

function ModulesModal({ slug, slot, onClose, onSave }: any) {
  const [modules, setModules] = useState<{title: string, desc: string}[]>(slot.modules || []);

  const addModule = () => setModules([...modules, { title: 'Новий модуль', desc: '' }]);
  const updateModule = (index: number, field: string, value: string) => {
    const newMods = [...modules];
    newMods[index] = { ...newMods[index], [field]: value } as any;
    setModules(newMods);
  };
  const removeModule = (index: number) => {
    const newMods = [...modules];
    newMods.splice(index, 1);
    setModules(newMods);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <h3 className="font-bold text-slate-800">Модулі курсу: {slug}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><X size={18}/></button>
        </div>
        
        <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          {modules.length === 0 && (
            <p className="text-center text-slate-400 py-8 text-sm">Модулів ще немає. Додайте перший!</p>
          )}
          {modules.map((m, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Модуль {i + 1}</h4>
                <button onClick={() => removeModule(i)} className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">Видалити</button>
              </div>
              <input 
                value={m.title}
                onChange={e => updateModule(i, 'title', e.target.value)}
                className="w-full text-sm font-bold text-slate-800 border border-slate-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                placeholder="Назва модуля (наприклад: Вступ до Python)"
              />
              <textarea
                value={m.desc}
                onChange={e => updateModule(i, 'desc', e.target.value)}
                className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 min-h-[80px]"
                placeholder="Опис модуля..."
              />
            </div>
          ))}
          <button onClick={addModule} className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
            + Додати модуль
          </button>
        </div>

        <div className="p-5 border-t border-slate-100 bg-white rounded-b-2xl flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Скасувати</button>
          <button onClick={() => onSave(modules)} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-500/30">Зберегти модулі</button>
        </div>
      </div>
    </div>
  );
}

function CourseEditorModal({ slot, onClose, onSave }: any) {
  const defaultData = DEFAULT_COURSES.find(c => c.slug === slot.course_slug) || DEFAULT_COURSES[0];
  const [formData, setFormData] = useState({
    title: slot.details?.title || defaultData.title,
    desc: slot.details?.desc || defaultData.desc,
    image: slot.details?.image || defaultData.image,
    ages: slot.details?.ages || defaultData.ages,
    price: slot.price ?? defaultData.price,
    available_slots: slot.available_slots ?? 0,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, val: string | number) => setFormData(p => ({ ...p, [field]: val }));

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Edit3 size={18} className="text-blue-500"/> Редагування курсу: {slot.course_slug}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><X size={18}/></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-white">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Назва курсу</label>
            <input value={formData.title} onChange={e => handleChange('title', e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Опис (текст на картці)</label>
            <textarea value={formData.desc} onChange={e => handleChange('desc', e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Картинка (Шлях або URL)</label>
              <input value={formData.image} onChange={e => handleChange('image', e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="/1.png або https://..."/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Вік дітей</label>
              <input value={formData.ages} onChange={e => handleChange('ages', e.target.value)} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Наприклад: 8+"/>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Ціна (₴)</label>
              <input type="number" value={formData.price} onChange={e => handleChange('price', parseInt(e.target.value)||0)} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Доступні місця</label>
              <input type="number" value={formData.available_slots} onChange={e => handleChange('available_slots', parseInt(e.target.value)||0)} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"/>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} disabled={isSaving} className="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors">Скасувати</button>
          <button onClick={async () => {
             setIsSaving(true);
             await onSave(formData);
             setIsSaving(false);
          }} disabled={isSaving} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
            {isSaving ? <Loader2 size={16} className="animate-spin"/> : <Save size={16}/>} 
            Зберегти зміни
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  CRM DASHBOARD
// ═══════════════════════════════════════════════
export default function CRMPage() {
  const [session, setSession] = useState<any>(null);
  const [isInitializingAuth, setIsInitializingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!session;
  
  const [activeTab, setActiveTab] = useState<'analytics' | 'builder' | 'settings'>('analytics');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [courseSlots, setCourseSlots] = useState<CourseSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const builderScrollRef = useRef<HTMLDivElement>(null);

  const scrollBuilder = (direction: 'left' | 'right') => {
    if (builderScrollRef.current) {
        const scrollAmount = window.innerWidth > 768 ? 364 : 300;
        builderScrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const [editingModulesFor, setEditingModulesFor] = useState<string | null>(null);
  const [editingCourseFor, setEditingCourseFor] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showEmptyLeads, setShowEmptyLeads] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());
  const [dbConnected, setDbConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [aiPortraits, setAiPortraits] = useState<Record<number, string>>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleFetchAI = async (lead: Lead) => {
      if (!lead.behavior_log || Object.keys(lead.behavior_log).length === 0) return;
      if (aiPortraits[lead.id]) return; 

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === "undefined") {
          setAiPortraits(prev => ({ ...prev, [lead.id]: "Помилка: Ключ VITE_GEMINI_API_KEY не знайдено." }));
          return;
      }

      setAnalyzingId(lead.id);
      try {
          const prompt = `Ти — геніальний аналітик-продажник IT-курсів для дітей у Сумах (K1BER.SCHOOL). Твоя задача — вичавити максимум інсайтів з ПОВЕДІНКИ клієнта на сайті [behavior_log].

ДЕТАЛЬНА АНАЛІТИКА ПОВЕДІНКИ КЛІЄНТА:
${JSON.stringify(lead.behavior_log, null, 2)}

🚨 НАЙГОЛОВНІШИЙ ФАКТ: Клієнт ВЖЕ ЗАЛИШИВ ЗАЯВКУ! 

ЯК АНАЛІЗУВАТИ:
1. Уважно дивись на "time_per_section" (час у секундах). Де клієнт провів найбільше часу?
- Якщо довго на 'faq' — у нього багато страхів або сумнівів (чи потягне дитина, чи потрібен свій ноут).
- Якщо довго на 'courses' — він прискіпливо вивчав програму та вікові групи. Його цікавить конкретика навчання!
- Якщо довго на 'about' (Чому ми) — йому важливий комфорт, перекуси, маленькі групи.
- Якщо залишив заявку швидко (великий час тільки на 'hero' або 'booking-form') — це імпульсивна покупка, клієнт гарячий.
2. Проаналізуй "interactions" (якщо вони є). Які питання FAQ відкривав? Які курси клікав?

СУВОРІ ПРАВИЛА:
- НІЯКОЇ ВОДИ ("Потреба у якісній IT-освіті"). Роби чіткі висновки на основі цифр! Наприклад: "Клієнт провів 40 секунд на блоці курсів — його зачепила програма, пропонуй конкретний віковий трек."
- Не пиши "ви не завершили реєстрацію". 
- Мова: Жива, розмовна, природна українська.

Видавай ВИНЯТКОВО 3 пункти:
🛑 ІНСАЙТ (БІЛЬ): (Конкретний висновок на основі часу/кліків. Що його найбільше зацікавило або злякало?)
⚡ ТРИГЕР: (Як ми можемо це закрити? Знижка, особистий підхід, гарантія результату).
💬 СКРИПТ: (Фраза для початку розмови, яка б'є точно в цей інсайт. З подякою за заявку).`;

          let modelName = 'gemini-1.5-flash';
          try {
              const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`);
              if (modelsRes.ok) {
                  const modelsData = await modelsRes.json();
                  const validModels = modelsData.models?.filter((m: any) => 
                      m.supportedGenerationMethods?.includes('generateContent') && 
                      m.name.includes('flash')
                  ) || [];
                  
                  if (validModels.length > 0) {
                      const exact = validModels.find((m: any) => m.name.includes('gemini-1.5-flash'));
                      modelName = exact ? exact.name.replace('models/', '') : validModels[0].name.replace('models/', '');
                  }
              }
          } catch (e) {
              console.warn("Could not fetch dynamic models, using fallback", e);
          }

          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey.trim()}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  contents: [{
                      parts: [{
                          text: prompt
                      }]
                  }],
                  generationConfig: {
                      temperature: 0.7
                  }
              })
          });
          const data = await res.json();
          if (res.ok && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
              let responseText = data.candidates[0].content.parts.map((p: any) => p.text || "").join("");
              if (data.candidates[0].finishReason && data.candidates[0].finishReason !== 'STOP') {
                  responseText += `\n[Увага, текст обрізано! Причина: ${data.candidates[0].finishReason}]`;
              }
              setAiPortraits(prev => ({ ...prev, [lead.id]: responseText }));
              console.log("Gemini API Full Response:", data);
          } else {
              console.error("Gemini API Error:", data);
              setAiPortraits(prev => ({ ...prev, [lead.id]: `Помилка: ${data.error?.message || "Невідома помилка Gemini"}` }));
          }
      } catch (err) {
          console.error("Network error:", err);
          setAiPortraits(prev => ({ ...prev, [lead.id]: "Помилка з'єднання з сервером AI." }));
      } finally {
          setAnalyzingId(null);
      }
  };



  const fetchLeads = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setLeads(data ?? []);
      setDbConnected(true);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка підключення');
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchSlots = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingSlots(true);
    // Include details in selection!
    const { data, error } = await supabase.from('course_slots').select('course_slug, available_slots, price, modules, details').order('course_slug');
    if (!error && data) {
      setCourseSlots(data);
    }
    setLoadingSlots(false);
  }, [isAuthenticated]);

  useEffect(() => { 
    if (isAuthenticated) {
      fetchLeads(); 
      fetchSlots();
    }
  }, [isAuthenticated, fetchLeads, fetchSlots]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = (formData.get('email') as string)?.trim();
      const password = formData.get('password') as string;
      
      if (email && /[^\x00-\x7F]/.test(email)) {
        alert("Помилка: Ваш email містить недопустимі символи (наприклад, кирилицю замість латиниці). Будь ласка, введіть email англійською мовою.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
          alert("Помилка авторизації: " + error.message);
      }
  };

  if (isInitializingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-sans p-4">
         <Loader2 size={32} className="animate-spin text-blue-500 mb-4" />
         <p className="text-sm font-bold text-slate-400">Перевірка доступу...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans p-4">
        <form 
          className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl max-w-sm w-full"
          onSubmit={handleLoginSubmit}
        >
          <div className="flex justify-center mb-6">
            <img src="/logo.webp" alt="K1BER Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] object-contain" />
          </div>
          <h2 className="text-xl font-bold text-center mb-6">Вхід до CRM</h2>
          
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="admin@kiber.school" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 text-sm transition-colors"
            required
            autoFocus
          />
          
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Пароль</label>
          <input 
            type="password" 
            name="password"
            placeholder="Ваш пароль" 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-blue-500 text-sm transition-colors"
            required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors text-sm">Увійти</button>
          <button type="button" onClick={() => window.location.href = "/"} className="w-full mt-4 text-slate-400 hover:text-white text-sm transition-colors">Повернутись на сайт</button>
        </form>
      </div>
    );
  }

  const handleRefresh = () => {
    fetchLeads();
    fetchSlots();
  };

  const updateCourseData = async (slug: string, updates: Partial<CourseSlot>) => {
    // Optimistic UI update
    setCourseSlots(prev => {
        const exists = prev.find(s => s.course_slug === slug);
        if (exists) {
            return prev.map(s => s.course_slug === slug ? { ...s, ...updates } : s);
        } else {
            return [...prev, { course_slug: slug, ...updates } as CourseSlot];
        }
    });
    const { data, error } = await supabase.from('course_slots').update({
      ...updates
    }).eq('course_slug', slug).select();
    
    if (error) {
      console.error("Supabase error on modules:", error);
      alert("Помилка Supabase: " + error.message);
      fetchSlots(); // revert on error
    } else if (!data || data.length === 0) {
      alert(`Помилка: Рядок з slug '${slug}' не знайдено в базі! Оновлено 0 рядків.`);
      fetchSlots();
    }
  };

  const saveCourseEditor = async (slug: string, formData: any) => {
     const slot = courseSlots.find(s => s.course_slug === slug) || { course_slug: slug, details: {} } as CourseSlot;
     
     const detailsUpdates = {
       title: formData.title,
       desc: formData.desc,
       image: formData.image,
       ages: formData.ages,
     };
     
     const existingDetails = slot.details || {};
     const newDetails = { ...existingDetails, ...detailsUpdates };
     
     // Optimistic
     setCourseSlots(prev => {
         const exists = prev.find(s => s.course_slug === slug);
         if (exists) {
             return prev.map(s => s.course_slug === slug ? { 
                 ...s, 
                 price: formData.price, 
                 available_slots: formData.available_slots, 
                 details: newDetails 
             } : s);
         } else {
             return [...prev, { 
                 course_slug: slug, 
                 price: formData.price, 
                 available_slots: formData.available_slots, 
                 details: newDetails 
             } as CourseSlot];
         }
     });
     
     // To DB
     const { data, error } = await supabase.from('course_slots').update({
        price: formData.price,
        available_slots: formData.available_slots,
        details: newDetails
     }).eq('course_slug', slug).select();
     
     if (error) {
       console.error("Помилка збереження курсу:", error);
       alert("Помилка збереження: " + error.message);
     } else if (!data || data.length === 0) {
       alert(`Помилка бази: Картку з slug '${slug}' не знайдено в таблиці. Оновлено 0 рядків.`);
     } else {
       console.log("Успішно збережено:", data);
     }
     
     setEditingCourseFor(null);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingIds(prev => new Set(prev).add(id));
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));

    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);

    if (error) {
      console.error('[CRM] Status update failed:', error.message);
      fetchLeads();
    }
    setUpdatingIds(prev => { const s = new Set(prev); s.delete(id); return s; });
  };

  const q = search.toLowerCase();
  const filtered = leads.filter(l => {
    const isEmptyBotLead = !l.phone && !l.course;
    if (!showEmptyLeads && isEmptyBotLead) return false;

    const matchSearch = !search
      || l.name?.toLowerCase().includes(q)
      || l.phone?.includes(search)
      || l.telegram_id?.includes(search);
    // Resolve legacy statuses (e.g. phone_captured/time_confirmed -> "Новий") for filter
    const matchStatus = !statusFilter
      || l.status === statusFilter
      || getStatusConfig(l.status).label === getStatusConfig(statusFilter).label;
    return matchSearch && matchStatus;
  });

  const today = new Date().toDateString();
  const newToday  = leads.filter(l => new Date(l.created_at).toDateString() === today).length;
  const withPhone = leads.filter(l => l.phone).length;
  const invited   = leads.filter(l => l.status === 'Запрошений').length;

  const formatDate = (iso: string) => new Date(iso).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });

  // ────────────── ВЬЮ: АНАЛИТИКА ──────────────
  const renderAnalytics = () => (
    <>
      <div className="grid grid-cols-2 md:flex md:items-center md:flex-wrap gap-3 pb-4 mb-2">
        <StatCard icon={Users}      label="Всього лідів"  value={leads.length} colorClass="bg-blue-50 text-blue-600" />
        <StatCard icon={TrendingUp} label="Нових сьогодні" value={newToday}    colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard icon={Phone}      label="З телефоном"   value={withPhone}    colorClass="bg-violet-50 text-violet-600" />
        <StatCard icon={UserCheck}  label="Запрошено"     value={invited}      colorClass="bg-amber-50 text-amber-600" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 min-w-0 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Пошук (ім'я, телефон, tg)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all duration-150"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
            <div className="relative w-full sm:w-52 shrink-0">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none w-full pl-4 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all cursor-pointer"
              >
                <option value="">Усі статуси</option>
                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer select-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 w-full sm:w-auto justify-center">
              <input 
                type="checkbox" 
                checked={showEmptyLeads} 
                onChange={e => setShowEmptyLeads(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-600">Пусті бот-ліди</span>
            </label>
          </div>
          <span className="text-sm text-slate-400 flex-shrink-0 pl-2 hidden lg:inline-block ml-auto">
            <span className="font-bold text-slate-700">{filtered.length}</span> / {leads.length}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <AlertCircle size={18} className="text-rose-500 flex-shrink-0" />
          <p className="text-sm text-rose-700 flex-1">{error}</p>
          <button onClick={fetchLeads} className="text-sm font-semibold text-rose-600 hover:text-rose-800 flex-shrink-0">Повторити</button>
        </div>
      )}

      {/* MOBILE LIST VIEW */}
      <div className="md:hidden flex flex-col gap-4 mb-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col gap-3">
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-50 rounded w-1/3"></div>
                  <div className="h-8 bg-slate-50 rounded mt-2"></div>
               </div>
             ))
          ) : filtered.length === 0 ? (
               <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
                    <Users size={36} className="mx-auto mb-3 opacity-20 text-slate-400" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-500">Лідів не знайдено</p>
               </div>
          ) : (
             filtered.map(lead => (
                 <div key={`mob-${lead.id}`} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 relative overflow-hidden transition-all active:scale-[0.99]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-violet-500 opacity-50"></div>
                    <div className="flex justify-between items-start pl-2">
                        <div>
                            <p className="font-bold text-slate-800 text-[15px]">{lead.name || 'Без імені'}</p>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">tg: {lead.telegram_id}</p>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{formatDate(lead.created_at)}</span>
                    </div>

                    <div className="pl-2 space-y-2">
                        {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 bg-blue-50/50 w-max px-2.5 py-1.5 rounded-lg border border-blue-100/50">
                                <Phone size={12} className="text-blue-500" />
                                <span className="text-[13px] font-bold text-blue-700">{lead.phone}</span>
                            </a>
                        )}
                        {lead.course && (
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex flex-col gap-1.5">
                                {lead.program_type && <span className={`text-[9px] uppercase tracking-wider font-bold w-max px-2 py-0.5 rounded ${lead.program_type === 'Академія' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>{lead.program_type}</span>}
                                <span className="text-[12px] font-semibold text-slate-700 leading-snug">{lead.course}</span>
                                {lead.chosen_time && <span className="text-[11px] font-medium text-purple-700 flex items-center gap-1 mt-0.5"><Clock size={11}/> {lead.chosen_time}</span>}
                            </div>
                        )}
                    </div>

                    <div className="pl-2 mt-1 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                        <div className="flex-1">
                            <StatusSelect lead={lead} onUpdate={updateStatus} isUpdating={updatingIds.has(lead.id)} />
                        </div>
                        <button onClick={() => setSelectedLead(lead)} className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl border border-blue-100 active:bg-blue-100 transition-colors shadow-sm shrink-0">
                            <Sparkles size={16} />
                        </button>
                    </div>
                 </div>
             ))
          )}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-50/60">
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap"><span className="flex items-center gap-1.5"><Calendar size={11} />Дата</span></th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Ім&apos;я</th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest"><span className="flex items-center gap-1.5"><Phone size={11} />Телефон</span></th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Курс / Час</th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Поточний статус</th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Змінити статус</th>
                <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Дії</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-slate-400">
                    <Users size={36} className="mx-auto mb-3 opacity-20" strokeWidth={1.5} />
                    <p className="text-sm font-medium">Лідів не знайдено</p>
                    <p className="text-xs mt-1 text-slate-300">Спробуйте змінити фільтри</p>
                  </td>
                </tr>
              ) : (
                filtered.map((lead, idx) => (
                  <tr key={lead.id} className={`border-b border-slate-50 transition-colors duration-100 hover:bg-blue-50/30 ${idx % 2 !== 0 ? 'bg-slate-50/40' : 'bg-white'}`}>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-xs text-slate-500 font-mono tabular-nums">{formatDate(lead.created_at)}</span></td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-none">{lead.name || <span className="text-slate-300 font-normal">Без імені</span>}</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono">tg: {lead.telegram_id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.phone ? <a href={`tel:${lead.phone}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors">{lead.phone}</a> : <span className="text-sm text-slate-200 select-none">—</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.course ? (
                        <div className="flex flex-col gap-1.5 items-start">
                          {lead.program_type && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${lead.program_type === 'Академія' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                              {lead.program_type}
                            </span>
                          )}
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{lead.course}</span>
                          {lead.chosen_time ? <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100 flex items-center gap-1">🗓️ {lead.chosen_time}</span> : <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">Час не обрано</span>}
                        </div>
                      ) : <span className="text-sm text-slate-300">—</span>}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={lead.status || 'new'} /></td>
                    <td className="px-6 py-4"><StatusSelect lead={lead} onUpdate={updateStatus} isUpdating={updatingIds.has(lead.id)} /></td>
                    <td className="px-6 py-4 align-top">
                        <button onClick={() => setSelectedLead(lead)} className="text-[11px] flex items-center justify-center gap-1.5 font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors shadow-sm whitespace-nowrap">
                            <Sparkles size={12} className="text-blue-500" /> Картка клієнта
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // ────────────── ВЬЮ: КОНСТРУКТОР ──────────────
  const renderBuilder = () => (
    <div className="w-full pb-10 overflow-hidden">
      <div className="mb-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
         <Settings className="text-blue-500 flex-shrink-0 mt-0.5"/>
         <div>
           <h3 className="text-sm font-bold text-blue-900 mb-1">Налаштування карток курсів</h3>
           <p className="text-xs text-blue-700/80 leading-relaxed">Тут ви можете налаштувати те, як виглядають курси на головному сайті. Змініть картинку, опис, вік, кількість місць або ціну. Ці картки виглядають точнісінько так, як їх бачать ваші клієнти на Landing Page. Всі зміни відразу записуються в базу даних і з'являються на сайті.</p>
         </div>
      </div>
  
      <div className="bg-slate-950 text-white rounded-[2rem] p-4 md:p-8 border border-slate-900 shadow-2xl relative">
         {/* Декоративні елементи фону */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03] pointer-events-none rounded-[2rem]"></div>
  
         {loadingSlots ? (
             <div className="text-center py-20 relative z-10 flex flex-col items-center justify-center">
                 <Loader2 size={32} className="animate-spin text-cyan-500 mb-4" />
                 <p className="text-slate-400">Завантаження карток...</p>
             </div>
         ) : (
             <div className="relative w-full">
                {/* Кнопки-стрілки */}
                <button
                    onClick={() => scrollBuilder('left')}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full items-center justify-center backdrop-blur-md border border-slate-700 shadow-2xl transition-all"
                >
                    <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <button
                    onClick={() => scrollBuilder('right')}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-slate-900/90 hover:bg-slate-800 text-cyan-400 rounded-full items-center justify-center backdrop-blur-md border border-slate-700 shadow-2xl transition-all hover:scale-105"
                >
                    <svg className="w-5 h-5 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Scroll wrapper — overflow-x-auto here, NOT on parent */}
                <div
                    ref={builderScrollRef}
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 md:gap-6 pb-4 pt-2 px-1 md:px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x"
                >
                {DEFAULT_COURSES.map(defCourse => {
                   const slot = courseSlots.find(c => c.course_slug === defCourse.slug) || { course_slug: defCourse.slug, available_slots: 10, price: defCourse.price };
                   const details = slot.details || {};
                   const course = {
                      title: details.title || defCourse.title,
                      desc: details.desc || defCourse.desc,
                      image: details.image || defCourse.image,
                      ages: details.ages || defCourse.ages,
                      tag: details.tag || defCourse.tag,
                      tagColor: details.tagColor || defCourse.tagColor,
                      btnBorder: details.btnBorder || defCourse.btnBorder,
                      cardBorder: details.cardBorder || defCourse.cardBorder,
                   };
      
                   return (
                     <div key={defCourse.slug} className={`group relative bg-slate-900 rounded-2xl border border-slate-800 ${course.cardBorder} transition-all duration-300 flex flex-col overflow-hidden w-[78vw] sm:w-[300px] md:w-[320px] flex-shrink-0 snap-center`}>
                        
                        {/* EDIT OVERLAY - visible on hover (desktop) or always visible on mobile */}
                        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30 flex flex-col items-center justify-center gap-3">
                           <button onClick={() => setEditingCourseFor(defCourse.slug)} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 transition-transform hover:scale-105"><Edit3 size={16}/> Редагувати картку</button>
                           <button onClick={() => setEditingModulesFor(defCourse.slug)} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center gap-2 transition-transform hover:scale-105"><Component size={16}/> Модулі програми</button>
                        </div>
      
                        <div className="h-48 w-full bg-slate-800 relative overflow-hidden border-b border-slate-800">
                           <img src={course.image} alt="" className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.style.opacity = '0'; }} />
                           <span className={`absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md ${course.tagColor}`}>
                               {course.tag}
                           </span>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1 relative z-10">
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="inline-block px-2.5 py-1 rounded-md bg-white/10 text-white text-xs font-black tracking-wider uppercase shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-white/10">
                                        👤 {course.ages}
                                    </span>
                                    <div className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 ${slot.available_slots < 6 ? 'bg-red-950/50 border border-red-500/30 text-red-400' : 'bg-orange-950/50 border border-orange-500/30 text-orange-400'}`}>
                                        🔥 Місць: {slot.available_slots}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-100 leading-tight">{course.title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-4">{course.desc}</p>
                            
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-white">{slot.price ?? defCourse.price} ₴</span>
                                <span className="text-sm font-medium text-slate-500">/ інтенсив</span>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-400 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900 cursor-not-allowed transition-colors">
                                    Подивитись програму навчань
                                </div>
                                <div className={`w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-500 py-3 px-4 rounded-xl border border-slate-800 bg-slate-900 cursor-not-allowed transition-colors`}>
                                    Забронювати місце
                                </div>
                            </div>
                        </div>
                     </div>
                   );
                })}
                </div>
             </div>
         )}
      </div>
    </div>
  );

  const renderLeadModal = () => {
    if (!selectedLead) return null;
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h2 className="text-xl font-black text-slate-800">Картка клієнта</h2>
              <p className="text-sm text-slate-500 font-medium">#{selectedLead.id} — {formatDate(selectedLead.created_at)}</p>
            </div>
            <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Ім'я</span>
                <p className="text-base font-bold text-slate-800">{selectedLead.name || 'Без імені'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Телефон</span>
                <p className="text-base font-bold text-blue-600">{selectedLead.phone || '—'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Telegram ID</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.telegram_id || '—'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Джерело</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.source || 'website'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Напрямок</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.program_type || '—'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Місто</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.city || '—'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Ім'я дитини</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.child_name || '—'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Вік дитини</span>
                <p className="text-base font-medium text-slate-600">{selectedLead.child_age || '—'}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 col-span-2 sm:col-span-1">
                <span className="block text-xs uppercase tracking-widest font-bold text-emerald-600/70 mb-1">Згода на обробку даних</span>
                {selectedLead.behavior_log?.legal_consent ? (
                  <p className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 size={16}/> 
                    Отримано ({new Date(selectedLead.behavior_log.legal_consent_timestamp).toLocaleString('uk-UA')})
                  </p>
                ) : (
                  <p className="text-sm font-medium text-slate-500">—</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2"><Calendar size={16}/> Обраний інтенсив</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Курс</span>
                   <p className="text-sm font-bold text-slate-800">{selectedLead.course || '—'}</p>
                 </div>
                 <div>
                   <span className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Час</span>
                   <p className="text-sm font-bold text-slate-800">{selectedLead.chosen_time || '—'}</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><Star size={16} className="text-slate-400"/> Змінити статус</h3>
              <div className="w-full max-w-sm">
                <StatusSelect lead={selectedLead} onUpdate={(id, status) => {
                  updateStatus(id, status);
                  setSelectedLead({ ...selectedLead, status });
                }} isUpdating={updatingIds.has(selectedLead.id)} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5 rounded-2xl border border-violet-100 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500"></div>
               <h3 className="text-sm font-bold text-violet-900 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-violet-500"/> AI Аналітика ліда</h3>
               
               {selectedLead.behavior_log && Object.keys(selectedLead.behavior_log).length > 0 ? (
                  <div className="flex flex-col gap-4">
                      {!aiPortraits[selectedLead.id] && analyzingId !== selectedLead.id && (
                          <button onClick={() => handleFetchAI(selectedLead)} className="text-sm w-fit flex items-center justify-center gap-2 font-bold text-white bg-violet-600 px-4 py-2.5 rounded-xl hover:bg-violet-500 transition-colors shadow-md shadow-violet-500/20">
                              <Sparkles size={16} /> Згенерувати AI-портрет
                          </button>
                      )}
                      {analyzingId === selectedLead.id && (
                          <div className="text-sm w-fit flex items-center justify-center gap-2 font-bold text-violet-600 bg-violet-100 px-4 py-2.5 rounded-xl border border-violet-200">
                              <Loader2 size={16} className="animate-spin" /> Аналізую поведінку...
                          </div>
                      )}
                      {aiPortraits[selectedLead.id] && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-violet-100">
                              <p className="text-[13px] font-bold text-violet-800 mb-2 flex items-center gap-1.5"><Sparkles size={14}/> Інсайт та рекомендації:</p>
                              <p className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap">{aiPortraits[selectedLead.id]}</p>
                          </div>
                      )}
                      
                      <div className="mt-2 pt-4 border-t border-violet-100">
                         <p className="text-xs font-bold text-slate-500 mb-2">Сирий лог часу (секунди на секціях):</p>
                         <pre className="text-[10px] bg-white p-2 rounded-lg text-slate-600 overflow-x-auto border border-slate-100">
                           {JSON.stringify(selectedLead.behavior_log, null, 2)}
                         </pre>
                      </div>
                  </div>
               ) : (
                  <p className="text-sm text-slate-500 italic">Немає зібраних даних про поведінку на сайті.</p>
               )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleUpdateCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim();
    const password = formData.get('password') as string;

    let hasError = false;
    let messages: string[] = [];

    if (email) {
      // Check for Cyrillic or non-ASCII characters
      if (/[^\x00-\x7F]/.test(email)) {
        alert("Помилка: Ваш email містить недопустимі символи (наприклад, кирилицю замість латиниці). Будь ласка, введіть email англійською мовою.");
        return;
      }
      const { error: emailError } = await supabase.auth.updateUser({ email });
      if (emailError) {
        alert("Помилка оновлення Email: " + emailError.message);
        hasError = true;
      } else {
        messages.push("✅ Email успішно змінено! (Можливо, потрібно підтвердити лист на новій пошті)");
      }
    }

    if (password && !hasError) {
      const { error: passwordError } = await supabase.auth.updateUser({ password });
      if (passwordError) {
        if (passwordError.message.includes("different from the old password") || passwordError.message.includes("should be different")) {
          alert("Помилка: Ви ввели свій поточний пароль у поле для НОВОГО пароля.\nЯкщо ви хочете змінити лише Email, залиште поле пароля порожнім.");
        } else {
          alert("Помилка оновлення Пароля: " + passwordError.message);
        }
        hasError = true;
      } else {
        messages.push("✅ Пароль успішно змінено!");
      }
    }

    if (messages.length > 0 && !hasError) {
      alert(messages.join("\n"));
      (e.target as HTMLFormElement).reset();
    }
  };

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
       <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Settings className="text-blue-500" /> Налаштування профілю
       </h3>
       <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Тут ви можете змінити логін (email) та пароль для входу в CRM. 
          Заповнюйте лише ті поля, які хочете змінити.
       </p>
       <form onSubmit={handleUpdateCredentials} className="space-y-5">
          <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Новий Email (Логін)</label>
             <input 
                type="email" 
                name="email"
                placeholder={session?.user?.email || "Нова пошта"}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
             />
          </div>
          <div>
             <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Новий Пароль</label>
             <input 
                type="password" 
                name="password"
                placeholder="Введіть новий пароль"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
             />
             <p className="text-[11px] text-slate-400 mt-2">Пароль повинен містити не менше 6 символів.</p>
          </div>
          <div className="pt-4 border-t border-slate-100">
             <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2">
                <Save size={16} /> Зберегти зміни
             </button>
          </div>
       </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col fixed inset-y-0 left-0 z-30 shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
             <Star size={18} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">
            Kiber School<br/>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">CRM Dashboard</span>
          </h1>
        </div>
        
        <nav className="p-4 flex flex-col gap-1.5 flex-1">
          <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-500/10' : 'text-slate-600 hover:bg-slate-50'}`}>
            <LayoutDashboard size={18} className={activeTab === 'analytics' ? 'text-blue-600' : 'text-slate-400'}/> Аналітика лідів
          </button>
          <button onClick={() => setActiveTab('builder')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'builder' ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-500/10' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Component size={18} className={activeTab === 'builder' ? 'text-blue-600' : 'text-slate-400'}/> Конструктор курсів
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700 shadow-inner shadow-blue-500/10' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Settings size={18} className={activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}/> Налаштування
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
           <button onClick={async () => { await supabase.auth.signOut(); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-bold text-rose-600 transition-all duration-150">
             <LogOut size={14} /> Вийти з CRM
           </button>
           <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all duration-150">
             ← На головний сайт
           </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 flex items-center justify-around p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('analytics')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'analytics' ? 'text-blue-600' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-bold">Аналітика</span>
        </button>
        <button onClick={() => setActiveTab('builder')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'builder' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Component size={20} />
            <span className="text-[10px] font-bold">Конструктор</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Settings size={20} />
            <span className="text-[10px] font-bold">Профіль</span>
        </button>
        <button onClick={async () => { await supabase.auth.signOut(); }} className="flex flex-col items-center gap-1 p-2 rounded-xl text-rose-400 hover:text-rose-600 transition-all">
            <LogOut size={20} />
            <span className="text-[10px] font-bold">Вийти</span>
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen pb-20 md:pb-0 overflow-x-hidden">
         <header className="bg-white border-b border-slate-100 sticky top-0 z-20 px-4 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center shadow-sm gap-3">
            <div className="flex justify-between items-center w-full sm:w-auto">
              <div>
                <h2 className="text-base md:text-lg font-black text-slate-800">
                   {activeTab === 'analytics' ? 'Аналітика лідів' : activeTab === 'builder' ? 'Конструктор курсів' : 'Налаштування профілю'}
                </h2>
                {lastUpdated && !loading && (
                  <p className="text-[10px] md:text-[11px] font-medium text-slate-400 mt-0.5">Останнє оновлення: {lastUpdated.toLocaleTimeString('uk-UA')}</p>
                )}
              </div>
              {/* Mobile-only DB indicator */}
              <div className="sm:hidden flex items-center gap-1.5">
                  <Database size={12} className={dbConnected ? 'text-emerald-500' : 'text-rose-400'} />
              </div>
            </div>
            
            <div className="flex justify-between sm:justify-end items-center gap-4 w-full sm:w-auto">
              <div className="hidden sm:flex items-center gap-2">
                <Database size={12} className={dbConnected ? 'text-emerald-500' : 'text-rose-400'} />
                <span className={`text-[10px] uppercase font-bold tracking-widest ${dbConnected ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {dbConnected ? 'DB OK' : 'DB ERROR'}
                </span>
              </div>
              <button onClick={handleRefresh} disabled={loading || loadingSlots} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 active:bg-blue-200 rounded-xl text-sm font-bold transition-all duration-150 disabled:opacity-50">
                  <RefreshCw size={14} className={loading || loadingSlots ? 'animate-spin' : ''} /> Оновити дані
              </button>
            </div>
         </header>

         <div className="p-4 md:p-8 flex-1 w-full max-w-[1600px] mx-auto overflow-x-hidden">
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'builder' && renderBuilder()}
            {activeTab === 'settings' && renderSettings()}
         </div>
      </main>

      {editingModulesFor && (
        <ModulesModal 
          slug={editingModulesFor} 
          slot={courseSlots.find(s => s.course_slug === editingModulesFor) || { course_slug: editingModulesFor, details: {}, modules: [] }}
          onClose={() => setEditingModulesFor(null)}
          onSave={(modules: any) => {
            updateCourseData(editingModulesFor, { modules });
            setEditingModulesFor(null);
          }}
        />
      )}

      {editingCourseFor && (
        <CourseEditorModal
          slot={courseSlots.find(s => s.course_slug === editingCourseFor) || { course_slug: editingCourseFor, details: {} }}
          onClose={() => setEditingCourseFor(null)}
          onSave={async (formData: any) => {
             await saveCourseEditor(editingCourseFor, formData);
          }}
        />
      )}
      {renderLeadModal()}
    </div>
  );
}
