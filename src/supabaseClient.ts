import { createClient } from '@supabase/supabase-js';

// Вытаскиваем переменные из окружения
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Добавляем проверку, чтобы не запускать клиент с пустыми ключами
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);