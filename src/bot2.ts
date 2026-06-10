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

    // Сохраняем начальное состояние в chat_histories
    await supabase.from('chat_histories').upsert({
        chat_id: chatId,
        messages: [{
            status: 'survey_new',
            parent_name: '',
            child_name: '',
            age: null,
            location: '',
            phone: '',
            consent: false
        }],
        updated_at: new Date().toISOString()
    }, { onConflict: 'chat_id' });

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

    // Читаем текущее состояние из chat_histories
    const { data: history, error } = await supabase.from('chat_histories')
        .select('messages')
        .eq('chat_id', chatId)
        .single();

    if (error || !history || !history.messages || !history.messages.length) {
        await ctx.reply("Будь ласка, натисніть /start для початку реєстрації.");
        return;
    }

    let state = history.messages[0] || {};
    // Если это старый формат AI-бота, сбрасываем
    if (state.role) {
        state = { status: 'survey_new' };
    }

    const status = state.status;

    // Обработка отмены
    const lowerText = text.toLowerCase();
    if (lowerText === 'відмовитись' || text === '❌ Ні, хай далі сидить у гаджетах' || text === '❌ ні' || lowerText === '/cancel') {
        state.status = 'survey_cancelled';
        await supabase.from('chat_histories').update({ messages: [state] }).eq('chat_id', chatId);
        await ctx.reply("Реєстрацію скасовано. Якщо передумаєте — напишіть /start.", Markup.removeKeyboard());
        return;
    }

    // Вспомогательная функция для обновления состояния
    const saveState = async (newState: string, extra: any = {}) => {
        state.status = newState;
        Object.assign(state, extra);
        await supabase.from('chat_histories').update({ messages: [state], updated_at: new Date().toISOString() }).eq('chat_id', chatId);
    };

    // Конечный автомат (State Machine)
    switch (status) {
        case 'survey_new':
            if (text === '✅ Записатись зараз' || lowerText === 'зареєструватись') {
                await saveState('survey_parent_name');
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
            await saveState('survey_child_name', { parent_name: text });
            await ctx.reply("Введіть, будь ласка, ім'я дитини.");
            break;

        case 'survey_child_name':
            if (!/^[\u0400-\u04FFA-Za-z\s\-]{2,60}$/.test(text)) {
                await ctx.reply("Невірний формат імені дитини. Використовуйте тільки літери, пробіли та дефіси. Спробуйте ще раз.");
                return;
            }
            await saveState('survey_age', { child_name: text });
            await ctx.reply("Вкажіть вік дитини (цілим числом, наприклад 10).");
            break;

        case 'survey_age':
            const age = parseInt(text, 10);
            if (isNaN(age) || age < 6 || age > 15) {
                await ctx.reply("Вік має бути від 6 до 15 років. Введіть правильний вік тільки цифрами.");
                return;
            }
            await saveState('survey_location', { age: age });
            await ctx.reply("Вкажіть, будь ласка, населений пункт, де ви проживаєте (наприклад, Суми).");
            break;

        case 'survey_location':
            if (!/^[\u0400-\u04FFA-Za-z\s\-]{2,60}$/.test(text)) {
                await ctx.reply("Невірний формат населеного пункту. Використовуйте тільки літери, пробіли та дефіси. Спробуйте ще раз.");
                return;
            }
            await saveState('survey_phone', { location: text });
            await ctx.reply("Вкажіть номер телефону для контакту (наприклад +380501234567 або 0501234567).");
            break;

        case 'survey_phone':
            const cleanPhone = text.replace(/[\s\-]/g, '');
            if (!/^(?:\+?380\d{9}|0\d{9}|\+\d{7,15})$/.test(cleanPhone)) {
                await ctx.reply("Невірний формат номера телефону. Підтримуються формати: +380XXXXXXXXX або 0XXXXXXXXX або міжнародний формат +XXXXXXXXXXX. Спробуйте ще раз.");
                return;
            }
            await saveState('survey_consent', { phone: cleanPhone });
            await ctx.reply("Чи погоджуєтесь Ви на обробку персональних даних для запису на курси? (Так/Ні)", Markup.keyboard([["✅ Так"], ["❌ Ні"]]).oneTime().resize());
            break;

        case 'survey_consent':
            const isConsent = lowerText.includes('так') || lowerText === 'yes' || text === '✅ Так';
            if (!isConsent && !lowerText.includes('ні') && lowerText !== 'no' && text !== '❌ Ні') {
                await ctx.reply("Будь ласка, відповідайте: Так або Ні.");
                return;
            }
            await saveState('survey_confirm', { consent: isConsent });
            
            const summary = `Підтвердження:\nТой, хто заповнює: ${state.parent_name}\nІм'я дитини: ${state.child_name}\nВік дитини: ${state.age}\nНаселений пункт: ${state.location}\nТелефон: ${state.phone}\nЗгода на обробку ПД: ${isConsent ? 'Так' : 'Ні'}\n\nПідтвердіть, чи записати ці дані? (Відповіді: Так / Ні)`;
            await ctx.reply(summary, Markup.keyboard([["✅ Так"], ["❌ Ні"]]).oneTime().resize());
            break;

        case 'survey_confirm':
            const confirm = lowerText.includes('так') || lowerText === 'yes' || text === '✅ Так';
            if (!confirm) {
                await saveState('survey_cancelled');
                await ctx.reply("Реєстрацію скасовано. Якщо бажаєте спробувати ще раз — надішліть /start.", Markup.removeKeyboard());
                return;
            }

            // Успешное завершение! Сохраняем как ЛИД
            await saveState('survey_completed');
            await supabase.from('leads').upsert({
                telegram_id: chatId,
                name: state.parent_name,
                phone: state.phone,
                status: 'new',
                source: 'bot2_survey',
                city: state.location,
                child_age: String(state.age),
                child_name: state.child_name,
                consent: state.consent
            }, { onConflict: 'telegram_id' });

            await ctx.reply("Дякуємо! Ваша заявка успішно прийнята. Ми зв'яжемося з вами найближчим часом.", Markup.removeKeyboard());

            // Уведомление администраторов
            try {
                const adminIds = [process.env.TG_USER_1, process.env.TG_USER_2].filter(Boolean);
                const notificationText = `🔥 НОВА ЗАЯВКА (Бот Опитування)!\n\n👨‍👧 Батько: ${state.parent_name}\n👶 Дитина: ${state.child_name} (${state.age} років)\n📍 Місто: ${state.location}\n📞 Телефон: ${state.phone}`;
                
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
