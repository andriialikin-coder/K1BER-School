import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Users, Phone, TrendingUp, Star, Search, RefreshCw,
  ChevronDown, Calendar, Database, Loader2, AlertCircle,
  X, PhoneCall, UserCheck, Archive, PhoneMissed, Clock,
  CheckCircle2, XCircle
} from 'lucide-react';

// ═══════════════════════════════════════════════
//  SUPABASE CLIENT
// ═══════════════════════════════════════════════
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// ═══════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════
interface Lead {
  id: number;
  created_at: string;
  telegram_id: string;
  name: string | null;
  phone: string | null;
  status: string;
  source: string | null;
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
  phone_captured: { label: '📱 Телефон',    badge: 'bg-teal-50 text-teal-700 ring-1 ring-teal-500/20',  dot: 'bg-teal-500' },
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
        className="
          appearance-none bg-white border border-slate-200 rounded-lg
          pl-3 pr-8 py-1.5 text-sm font-medium text-slate-700 cursor-pointer
          hover:border-blue-300 hover:bg-blue-50/30
          focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400
          transition-all duration-150
          disabled:opacity-50 disabled:cursor-wait
        "
      >
        {!STATUS_OPTIONS.find(s => s.value === lead.status) && (
          <option value="" disabled>
            {getStatusConfig(lead.status).label} → оберіть новий
          </option>
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

// ═══════════════════════════════════════════════
//  CRM DASHBOARD
// ═══════════════════════════════════════════════
export default function CRMPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());
  const [dbConnected, setDbConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const password = prompt("Введіть секретний ключ доступу до CRM:");
    if (password === "K1berAdmin2026!") {
      setIsAuthenticated(true);
    } else {
      alert("Доступ заборонено!");
      window.location.href = "/"; // Викидаємо хакера на лендинг
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

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

  useEffect(() => { 
    if (isAuthenticated) fetchLeads(); 
  }, [isAuthenticated, fetchLeads]);

  if (!isAuthenticated) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">Перевірка доступу...</div>;

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingIds(prev => new Set(prev).add(id));
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));

    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('[CRM] Status update failed:', error.message);
      fetchLeads();
    }
    setUpdatingIds(prev => { const s = new Set(prev); s.delete(id); return s; });
  };

  const q = search.toLowerCase();
  const filtered = leads.filter(l => {
    const matchSearch = !search
      || l.name?.toLowerCase().includes(q)
      || l.phone?.includes(search)
      || l.telegram_id?.includes(search);
    const matchStatus = !statusFilter || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const today = new Date().toDateString();
  const newToday  = leads.filter(l => new Date(l.created_at).toDateString() === today).length;
  const withPhone = leads.filter(l => l.phone).length;
  const invited   = leads.filter(l => l.status === 'Запрошений').length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('uk-UA', {
      day: '2-digit', month: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      <header className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                <Star size={18} className="text-white" fill="currentColor" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-bold text-slate-900 leading-none">Kiber School</h1>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">CRM Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto flex-1 pb-0.5">
              <StatCard icon={Users}      label="Всього лідів"  value={leads.length} colorClass="bg-blue-50 text-blue-600" />
              <StatCard icon={TrendingUp} label="Нових сьогодні" value={newToday}    colorClass="bg-emerald-50 text-emerald-600" />
              <StatCard icon={Phone}      label="З телефоном"   value={withPhone}    colorClass="bg-violet-50 text-violet-600" />
              <StatCard icon={UserCheck}  label="Запрошено"     value={invited}      colorClass="bg-amber-50 text-amber-600" />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-sm font-semibold text-slate-600 transition-all duration-150 disabled:opacity-40"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Оновити</span>
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold text-slate-600 transition-all duration-150"
              >
                ← Сайт
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 min-w-0">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Пошук за іменем, телефоном або Telegram ID..."
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
            <div className="relative flex-shrink-0">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none w-full sm:w-52 pl-4 pr-9 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all cursor-pointer"
              >
                <option value="">Усі статуси</option>
                {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <span className="text-sm text-slate-400 flex-shrink-0 pl-1">
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

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-50/60">
                  <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    <span className="flex items-center gap-1.5"><Calendar size={11} />Дата</span>
                  </th>
                  <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Ім&apos;я</th>
                  <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Phone size={11} />Телефон</span>
                  </th>
                  <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Поточний статус</th>
                  <th className="text-left px-6 py-3.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Змінити статус</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-slate-400">
                      <Users size={36} className="mx-auto mb-3 opacity-20" strokeWidth={1.5} />
                      <p className="text-sm font-medium">Лідів не знайдено</p>
                      <p className="text-xs mt-1 text-slate-300">Спробуйте змінити фільтри</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead, idx) => (
                    <tr key={lead.id} className={`border-b border-slate-50 transition-colors duration-100 hover:bg-blue-50/30 ${idx % 2 !== 0 ? 'bg-slate-50/40' : 'bg-white'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-slate-500 font-mono tabular-nums">{formatDate(lead.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-800 leading-none">
                            {lead.name || <span className="text-slate-300 font-normal">Без імені</span>}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1 font-mono">tg: {lead.telegram_id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors">{lead.phone}</a>
                        ) : (
                          <span className="text-sm text-slate-200 select-none">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                      <td className="px-6 py-4"><StatusSelect lead={lead} onUpdate={updateStatus} isUpdating={updatingIds.has(lead.id)} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {lastUpdated && !loading && (
          <p className="text-center text-xs text-slate-300 mt-4 tabular-nums">
            Оновлено о {lastUpdated.toLocaleTimeString('uk-UA')}
          </p>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-4 mt-auto">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Kiber School CRM&nbsp;&nbsp;·&nbsp;&nbsp;v1.0.0</p>
          <div className="flex items-center gap-2">
            <Database size={12} className={dbConnected ? 'text-emerald-500' : 'text-rose-400'} />
            <span className={`text-xs font-medium ${dbConnected ? 'text-emerald-600' : 'text-rose-500'}`}>
              {dbConnected ? 'DB Connected' : 'DB Disconnected'}
            </span>
            <span className={`w-2 h-2 rounded-full ml-0.5 ${dbConnected ? 'bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse' : 'bg-rose-400'}`} />
          </div>
        </div>
      </footer>
    </div>
  );
}
