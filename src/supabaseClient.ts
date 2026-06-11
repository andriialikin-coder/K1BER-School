import { createClient } from '@supabase/supabase-js';

// Вытаскиваем переменные из окружения
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
// БОТ ДОЛЖЕН РАБОТАТЬ ЧЕРЕЗ SERVICE ROLE KEY ДЛЯ ОБХОДА RLS
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Добавляем проверку, чтобы не запускать клиент с пустыми ключами
if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables! Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
}

// Теперь бот авторизуется как админ и имеет полные права доступа к базе
export const supabase = createClient(supabaseUrl, supabaseServiceKey);