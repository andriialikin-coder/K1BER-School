import { Telegraf, Context } from 'telegraf';
import { supabase } from './supabaseClient';

// Строгое приведение типа для токена
const token = (process.env.BOT_TOKEN || '') as string;

if (!token) {
    console.error("Критическая ошибка: BOT_TOKEN отсутствует в окружении.");
}

const bot = new Telegraf(token);

bot.start((ctx: Context) => {
    ctx.reply('Привет! Я твой помощник. Как тебя зовут?');
});

bot.on('text', async (ctx) => {
    const text = ctx.message?.text;
    const userId = ctx.from?.id.toString();

    if (!text || !userId) return;

    // Пишем напрямую в Supabase
    const { error } = await supabase
        .from('leads')
        .insert([{
            telegram_id: userId,
            name: text,
            source: 'bot',
            status: 'new'
        }]);

    if (error) {
        console.error('Ошибка базы данных:', error.message);
        await ctx.reply('Ошибка системы, попробуй позже.');
    } else {
        await ctx.reply('Записал! Скоро с тобой свяжутся.');
    }
});

export default bot;