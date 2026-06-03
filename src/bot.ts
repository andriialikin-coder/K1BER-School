import { Telegraf } from 'telegraf';
import { supabase } from './supabaseClient';

// Явно объявляем токен, вытаскивая его из глобального окружения safe-методом
const token = (typeof process !== 'undefined' && process.env ? process.env.BOT_TOKEN : '') as string;

if (!token) {
    console.warn("Внимание: BOT_TOKEN не обнаружен в локальном окружении. Код готов к деплою на Vercel.");
}

const bot = new Telegraf(token);

bot.start((ctx) => {
    ctx.reply('Привет! Я твой помощник. Как тебя зовут?');
});

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const userId = ctx.from.id.toString();

    // Запись в Supabase
    const { error } = await supabase
        .from('leads')
        .insert([{ telegram_id: userId, name: text, source: 'bot', status: 'new' }]);

    if (error) {
        console.error('Ошибка Supabase:', error);
        ctx.reply('Ошибка системы, попробуй позже.');
    } else {
        ctx.reply('Записал! Скоро с тобой свяжутся.');
    }
});

// Экспортируем бота для работы через Webhook на Vercel
export default bot;