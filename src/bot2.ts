import { Telegraf, Context, Markup } from 'telegraf';
import { supabase } from './supabaseClient';
import fs from 'fs';
import path from 'path';

// Используем отдельный токен для бота-анкетолога
const token = (process.env.BOT2_TOKEN || '') as string;
const bot = new Telegraf(token);

if (!token) {
    console.error("Критическая ошибка: BOT2_TOKEN отсутствует в Vercel.");
}

const WELCOME_TEXT = `<b>🎉 ВІТАЮ! 🎉</b>

Я — маленький цифровий помічник із K1BERSCHOOL — кібершколи майбутнього.

K1BERSCHOOL — це не гурток, а крок до того, щоб дитина увійшла в 1% найуспішніших людей планети.

Програма K1BERSCHOOL — топова та змістовна, створена спеціально, щоб діти реально розуміли, як працюють сучасні технології.

▪️ Діти створюють власних чат-ботів, сайти, застосунки та багато іншого
▪️ 3D-моделюють і друкують свої проєкти
▪️ Вчаться керувати нейромережами й робити реальні проєкти
▪️ Розвивають підприємницьке мислення та впевненість у собі

На пробному уроці можна:
🖨️ надрукувати власний 3D-брелок,
🎮 створити персонажа Minecraft,
🤖 або спробувати роботу з нейромережами — обирайте варіант, який до душі саме вашій дитині!`;

bot.start(async (ctx: Context) => {
    const chatId = ctx.from?.id.toString();
    if (!chatId) return;

    // Сбрасываем статус на начало и очищаем данные
    await supabase.from('leads').upsert({
        telegram_id: chatId,
        name: ctx.from?.first_name || 'Unknown',
        status: 'survey_new',
        source: 'bot2_survey',
        raw_data: '{}'
    }, { onConflict: 'telegram_id' });

    const videoPath = path.join(__dirname, '../public/logo.mp4');
    const keyboard = Markup.keyboard([
        ["✅ Записатись зараз", "❌ Ні, хай далі сидить у гаджетах"]
    ]).oneTime().resize();

    try {
        if (fs.existsSync(videoPath)) {
            await ctx.replyWithVideo(
                { source: fs.createReadStream(videoPath) },
                {
                    caption: WELCOME_TEXT,
                    parse_mode: 'HTML',
                    reply_markup: keyboard.reply_markup
                }
            );
        } else {
            await ctx.replyWithHTML(WELCOME_TEXT, keyboard);
        }
    } catch (e) {
        console.error("Помилка відправки відео:", e);
        await ctx.replyWithHTML(WELCOME_TEXT, keyboard);
    }
});

bot.on('text', async (ctx: Context) => {
    // @ts-ignore
    const text = ctx.message?.text?.trim() || '';
    const chatId = ctx.from?.id.toString();
    if (!chatId) return;

    // Читаем текущий статус из базы
    const { data: lead, error } = await supabase.from('leads')
        .select('status, raw_data')
        .eq('telegram_id', chatId)
        .single();

    if (error || !lead) {
        await ctx.reply("Будь ласка, натисніть /start для початку реєстрації.");
        return;
    }

    const status = lead.status;
    let rawData: any = {};
    try {
        rawData = typeof lead.raw_data === 'string' ? JSON.parse(lead.raw_data) : (lead.raw_data || {});
    } catch (e) {
        console.error("Ошибка парсинга raw_data", e);
    }

    // Обработка отмены
    const lowerText = text.toLowerCase();
    if (lowerText === 'відмовитись' || text === '❌ Ні, хай далі сидить у гаджетах' || text === '❌ ні' || lowerText === '/cancel') {
        await supabase.from('leads').update({ status: 'survey_cancelled' }).eq('telegram_id', chatId);
        await ctx.reply("Реєстрацію скасовано. Якщо передумаєте — напишіть /start.", Markup.removeKeyboard());
        return;
    }

    // Конечный автомат (State Machine)
    switch (status) {
        case 'survey_new':
            if (text === '✅ Записатись зараз' || lowerText === 'зареєструватись') {
                await supabase.from('leads').update({ status: 'survey_parent_name' }).eq('telegram_id', chatId);
                await ctx.reply("Будь ласка, введіть ваше ім'я (того, хто заповнює анкету).", Markup.removeKeyboard());
            } else {
                await ctx.reply("Будь ласка, виберіть одну з кнопок на клавіатурі.");
            }
            break;

        case 'survey_parent_name':
            if (!/^[\u0400-\u04FFA-Za-z\s\-]{2,60}$/.test(text)) {
                await ctx.reply("Невірний формат імені. Використовуйте тільки літери, пробіли та дефіси. Спробуйте ще раз.");
                return;
            }
            rawData.parent_name = text;
            await supabase.from('leads').update({ 
                status: 'survey_child_name', 
                name: text, 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            await ctx.reply("Введіть, будь ласка, ім'я дитини.");
            break;

        case 'survey_child_name':
            if (!/^[\u0400-\u04FFA-Za-z\s\-]{2,60}$/.test(text)) {
                await ctx.reply("Невірний формат імені дитини. Використовуйте тільки літери, пробіли та дефіси. Спробуйте ще раз.");
                return;
            }
            rawData.child_name = text;
            await supabase.from('leads').update({ 
                status: 'survey_age', 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            await ctx.reply("Вкажіть вік дитини (цілим числом, наприклад 10).");
            break;

        case 'survey_age':
            const age = parseInt(text, 10);
            if (isNaN(age) || age < 6 || age > 15) {
                await ctx.reply("Вік має бути від 6 до 15 років. Введіть правильний вік тільки цифрами.");
                return;
            }
            rawData.age = age;
            await supabase.from('leads').update({ 
                status: 'survey_location', 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            await ctx.reply("Вкажіть, будь ласка, населений пункт, де ви проживаєте (наприклад, Суми).");
            break;

        case 'survey_location':
            if (!/^[\u0400-\u04FFA-Za-z\s\-]{2,60}$/.test(text)) {
                await ctx.reply("Невірний формат населеного пункту. Використовуйте тільки літери, пробіли та дефіси. Спробуйте ще раз.");
                return;
            }
            rawData.location = text;
            await supabase.from('leads').update({ 
                status: 'survey_phone', 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            await ctx.reply("Вкажіть номер телефону для контакту (наприклад +380501234567 або 0501234567).");
            break;

        case 'survey_phone':
            const cleanPhone = text.replace(/[\s\-]/g, '');
            if (!/^(?:\+?380\d{9}|0\d{9}|\+\d{7,15})$/.test(cleanPhone)) {
                await ctx.reply("Невірний формат номера телефону. Підтримуються формати: +380XXXXXXXXX або 0XXXXXXXXX або міжнародний формат +XXXXXXXXXXX. Спробуйте ще раз.");
                return;
            }
            rawData.phone = cleanPhone;
            await supabase.from('leads').update({ 
                status: 'survey_consent', 
                phone: cleanPhone, 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            await ctx.reply("Чи погоджуєтесь Ви на обробку персональних даних для запису на курси? (Так/Ні)", Markup.keyboard([["✅ Так"], ["❌ Ні"]]).oneTime().resize());
            break;

        case 'survey_consent':
            const isConsent = lowerText.includes('так') || lowerText === 'yes' || text === '✅ Так';
            if (!isConsent && !lowerText.includes('ні') && lowerText !== 'no' && text !== '❌ Ні') {
                await ctx.reply("Будь ласка, відповідайте: Так або Ні.");
                return;
            }
            rawData.consent = isConsent;
            await supabase.from('leads').update({ 
                status: 'survey_confirm', 
                raw_data: JSON.stringify(rawData) 
            }).eq('telegram_id', chatId);
            
            const summary = `Підтвердження:\nТой, хто заповнює: ${rawData.parent_name}\nІм'я дитини: ${rawData.child_name}\nВік дитини: ${rawData.age}\nНаселений пункт: ${rawData.location}\nТелефон: ${rawData.phone}\nЗгода на обробку ПД: ${isConsent ? 'Так' : 'Ні'}\n\nПідтвердіть, чи записати ці дані? (Відповіді: Так / Ні)`;
            await ctx.reply(summary, Markup.keyboard([["✅ Так"], ["❌ Ні"]]).oneTime().resize());
            break;

        case 'survey_confirm':
            const confirm = lowerText.includes('так') || lowerText === 'yes' || text === '✅ Так';
            if (!confirm) {
                await supabase.from('leads').update({ status: 'survey_cancelled' }).eq('telegram_id', chatId);
                await ctx.reply("Реєстрацію скасовано. Якщо бажаєте спробувати ще раз — надішліть /start.", Markup.removeKeyboard());
                return;
            }

            // Успешное завершение!
            await supabase.from('leads').update({ status: 'survey_completed' }).eq('telegram_id', chatId);
            await ctx.reply("Дякуємо! Ваша заявка успішно прийнята. Ми зв'яжемося з вами найближчим часом.", Markup.removeKeyboard());

            // Уведомление администраторов
            try {
                const adminIds = [process.env.TG_USER_1, process.env.TG_USER_2].filter(Boolean);
                const notificationText = `🔥 НОВА ЗАЯВКА (Бот Опитування)!\n\n👨‍👧 Батько: ${rawData.parent_name}\n👶 Дитина: ${rawData.child_name} (${rawData.age} років)\n📍 Місто: ${rawData.location}\n📞 Телефон: ${rawData.phone}`;
                
                for (const adminId of adminIds) {
                    await bot.telegram.sendMessage(adminId as string, notificationText);
                }
            } catch (err) {
                console.error("Failed to notify admins", err);
            }
            break;
            
        case 'survey_completed':
            await ctx.reply("Ви вже успішно зареєструвалися! Якщо хочете подати ще одну заявку, натисніть /start.");
            break;

        default:
            await ctx.reply("Ваша сесія застаріла або сталася помилка. Натисніть /start для нової реєстрації.");
            break;
    }
});

export default bot;
