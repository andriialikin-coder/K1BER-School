import { supabase } from './supabaseClient';

// Определяем интерфейс прямо тут или проверь, что он экспортирован
export interface Lead {
    id: string;
    telegram_id: string;
    name: string | null;
    phone: string | null;
    source: 'bot' | 'site';
    status: 'new' | 'contacted' | 'booked' | 'lost';
    created_at: Date;
}

export async function addLead(lead: Omit<Lead, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('leads')
        .insert([lead]);

    if (error) {
        console.error('Ошибка записи:', error);
        throw error;
    }
    return data;
}