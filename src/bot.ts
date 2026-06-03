import { Telegraf } from 'telegraf';
import { supabase } from './supabaseClient';

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
    ctx.reply('Привет! Я твой помощник. Как тебя зовут?');
});

// Логика захвата данных и записи в Supabase
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const userId = ctx.from.id.toString();

    // Тут мы сохраняем лид в базу
    const { error } = await supabase
        .from('leads')
        .insert([{ telegram_id: userId, name: text, source: 'bot', status: 'new' }]);

    if (error) {
        ctx.reply('Ошибка системы, попробуй позже.');
    } else {
        ctx.reply('Записал! Скоро с тобой свяжутся.');
    }
});

bot.launch();