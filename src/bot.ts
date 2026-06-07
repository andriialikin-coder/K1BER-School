import { Telegraf, Context } from 'telegraf';
import { supabase } from './supabaseClient';

const token = (process.env.BOT_TOKEN || '') as string;
const groqApiKey = (process.env.GROQ_API_KEY || '') as string;

if (!token || !groqApiKey) {
    console.error("Критическая ошибка: BOT_TOKEN или GROQ_API_KEY отсутствует в Vercel.");
}

const bot = new Telegraf(token);

// --- АНТИСПАМ (Rate Limit in-memory) ---
const spamCache = new Map<string, number>();
const SPAM_COOLDOWN_MS = 2000;

// --- ОБРАБОТКА /START ---
bot.start(async (ctx: Context) => {
    const chatId = ctx.from?.id.toString();
    const userName = ctx.from?.first_name || 'Unknown';
    if (!chatId) return;

    const { data: promptData } = await supabase.from('prompts').select('greeting_text').eq('name', 'main_bot').single();
    const greeting = promptData?.greeting_text;

    if (!greeting) {
        console.error("[CRITICAL] Помилка: Поле greeting_text порожнє або відсутнє!");
        await ctx.reply("Сталася помилка при запуску бота.");
        return;
    }

    await supabase.from('chat_histories').upsert({
        chat_id: chatId,
        messages: [{ role: "assistant", content: greeting }],
        updated_at: new Date().toISOString()
    });

    await supabase.from('leads').upsert({
        telegram_id: chatId,
        name: userName,
        source: 'bot',
        status: 'new'
    }, { onConflict: 'telegram_id' });

    await ctx.reply(greeting);
});

// --- ОЧИСТКА ПАМЯТИ (/clear) ---
bot.command('clear', async (ctx) => {
    const chatId = ctx.from?.id.toString();
    if (!chatId) return;

    const { data: promptData, error: promptError } = await supabase.from('prompts').select('greeting_text').eq('name', 'main_bot').single();
    if (promptError) console.error("[CRITICAL] Ошибка загрузки промпта при /clear:", promptError.message);
    const greeting = promptData?.greeting_text || 'Память очищена. Начнем заново.';

    await supabase.from('chat_histories').upsert({
        chat_id: chatId,
        messages: [{ role: "assistant", content: greeting }],
        updated_at: new Date().toISOString()
    });

    await supabase.from('leads').update({ status: 'new' }).eq('telegram_id', chatId);

    console.log(`[MEMORY CLEARED] Юзер ${chatId} сбросил контекст.`);
    await ctx.reply(greeting);
});

// --- ОСНОВНЫЕ "МОЗГИ" ---
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const chatId = ctx.from.id.toString();

    // ========== 0. ЗАХИСТ ВІД СПАМУ ==========
    const now = Date.now();
    const lastMessageTime = spamCache.get(chatId) || 0;

    if (now - lastMessageTime < SPAM_COOLDOWN_MS) {
        console.warn(`[SPAM BLOCKED] Користувач ${chatId} відправляє повідомлення занадто швидко.`);
        return;
    }
    spamCache.set(chatId, now);

    // ========== 1. ПЕРЕХВАТ НОМЕРА ТЕЛЕФОНА (ДО Groq API) ==========
    const phoneRegex = /(?:\+?[\d][\d\s\-\(\)]{8,20})/g;
    const matches = text.match(phoneRegex);

    if (matches) {
        let cleanPhoneForCRM = '';
        let displayPhoneForUser = '';
        let rawPhone = '';

        for (const match of matches) {
            const tempClean = match.replace(/[^\d]/g, '');

            const isUa10 = tempClean.length === 10 && tempClean.startsWith('0');
            const isUa12 = tempClean.length === 12 && tempClean.startsWith('380');

            if (isUa10 || isUa12) {
                const isNotSpam = !/^(\d)\1+$/.test(tempClean);
                const isTestNumber = tempClean.endsWith('0501234567') || tempClean.endsWith('501234567');

                if (isNotSpam && !isTestNumber) {
                    cleanPhoneForCRM = isUa10 ? '+38' + tempClean : '+' + tempClean;
                    displayPhoneForUser = match.trim();
                    rawPhone = match;
                    break;
                } else if (isTestNumber) {
                    console.log(`[SECURITY] Перехват заблоковано: тестовий номер.`);
                }
            }
        }

        if (cleanPhoneForCRM && rawPhone) {
            let nameCandidate = text.replace(rawPhone, '').replace(/[\d]/g, '');
            let parsedName = '';
            const nameMarkers = ['мене звати', 'мене звуть', 'звати мене', 'моє ім\'я', 'моє імя', 'меня зовут', 'мое имя', 'моё имя', 'ім\'я', 'імя', 'имя', 'я'];

            for (const marker of nameMarkers) {
                const markerRegex = new RegExp(`(?:^|\\s)${marker}(?:\\s+|$)([^\\s,.:;!?]+)`, 'i');
                const match = nameCandidate.match(markerRegex);
                if (match && match[1]) { parsedName = match[1].trim(); break; }
            }

            if (!parsedName) {
                const stopWords = ['ось номер', 'ось мій номер', 'мій номер', 'мой номер', 'номер телефону', 'номер телефона', 'телефон', 'це мій', 'це мой', 'ось', 'це', 'це я', 'запишіть', 'запишите', 'запиши', 'будь ласка', 'пожалуйста', 'зателефонуйте', 'перезвоните', 'зателефонуй'];
                for (const word of stopWords) {
                    nameCandidate = nameCandidate.replace(new RegExp(`(^|\\s)${word}(?=\\s|$)`, 'gi'), ' ');
                }
                nameCandidate = nameCandidate.replace(/(^|\s)(і|й|а|та)(?=\s|$)/gi, ' ').replace(/[,.:;!?()"\-\+_\/\\|*]/g, '').replace(/\s+/g, ' ').trim();
                if (nameCandidate) parsedName = nameCandidate.split(' ')[0];
            }

            parsedName = (parsedName.length >= 2 && parsedName.length < 20) ? parsedName : (ctx.from?.first_name || 'Шановний клієнт');
            parsedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);

            console.log(`[REAL LEAD CAPTURED] ID: ${chatId} | Ім'я: ${parsedName} | Тел: ${cleanPhoneForCRM}`);

            try {
                await Promise.all([
                    supabase.from('leads').upsert({
                        telegram_id: chatId,
                        name: parsedName,
                        phone: cleanPhoneForCRM,
                        status: 'phone_captured'
                    }, { onConflict: 'telegram_id' }),

                    supabase.from('chat_histories').upsert({
                        chat_id: chatId,
                        messages: [{ role: "assistant", content: "Дякуємо! Ваші дані внесено в систему. Тепер перейдіть на наш сайт, щоб обрати конкретний літній IT-інтенсив." }],
                        updated_at: new Date().toISOString()
                    })
                ]);
            } catch (dbError) {
                console.error("[CRITICAL DB ERROR]:", dbError);
            }

            const urlPhone = encodeURIComponent(cleanPhoneForCRM);
            const urlName = encodeURIComponent(parsedName);
            const webAppUrl = `https://kiber-school.vercel.app/?phone=${urlPhone}&name=${urlName}`;

            await ctx.reply(
                "Дякуємо! Ваші дані внесено в систему. Тепер перейдіть на наш сайт, щоб обрати конкретний літній IT-інтенсив.",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "🌐 Обрати курс на сайті", url: webAppUrl }
                            ]
                        ]
                    }
                }
            );
            return;
        }
    }
    // ========== КОНЕЦ ПЕРЕХВАТА НОМЕРА ==========

    // 2. Подгружаем системный промпт (личность бота)
    const { data: promptData, error: promptError } = await supabase.from('prompts').select('content, temperature').eq('name', 'main_bot').single();

    if (promptError) console.error("[CRITICAL DB ERROR] Не удалось загрузить промпт из Supabase:", promptError.message);
    const systemPrompt = promptData?.content || "Ты полезный ассистент.";

    // 3. Ищем триггерные слова для перехвата стратегии
    const { data: triggers } = await supabase.from('objection_knowledge_base').select('objection_keyword, ai_strategy');
    let injectionMessage = null;

    if (triggers && triggers.length > 0) {
        const cleanText = text.toLowerCase();
        const matched = triggers.find(t => {
            if (!t.objection_keyword) return false;
            const keywords = t.objection_keyword.toLowerCase().split(',').map((k: string) => k.trim());
            return keywords.some((keyword: string) => {
                const regex = new RegExp(`(?:^|[\\s.,!?()\\-"'])${keyword}(?:[\\s.,!?()\\-"']|$)`, 'i');
                return regex.test(cleanText);
            });
        });

        if (matched) {
            console.log(`[TRIGGER] Перехват на слово: ${matched.objection_keyword}`);
            injectionMessage = {
                role: "system",
                content: `КРИТИЧЕСКОЕ ПРАВИЛО: Клиент озвучил триггер "${matched.objection_keyword}". Твоя стратегия: ${matched.ai_strategy}. Строго следуй ей сейчас.`
            };
        }
    }

    // 4. Поднимаем историю диалога и СТАТУС ЛИДА (параллельно для скорости)
    const [historyRes, leadRes] = await Promise.all([
        supabase.from('chat_histories').select('messages').eq('chat_id', chatId).maybeSingle(),
        supabase.from('leads').select('status').eq('telegram_id', chatId).maybeSingle()
    ]);

    const history = Array.isArray(historyRes.data?.messages) ? historyRes.data.messages : [];
    const isCaptured = leadRes.data?.status === 'phone_captured';

    // 4.1 Если лид уже сдал номер — жестко меняем ему личность, отключая воронку продаж
    let finalSystemPrompt = systemPrompt;
    if (isCaptured) {
        finalSystemPrompt = "Ти — Олег, адміністратор Kiber School. Цей клієнт ВЖЕ залишив свій номер телефону, і заявка успішно передана менеджеру. Твоя єдина мета зараз: ввічливо і лаконічно відповідати на його поточні запитання або попрощатися. КРИТИЧНЕ ПРАВИЛО: БІЛЬШЕ НІКОЛИ НЕ ПРОСИ НОМЕР ТЕЛЕФОНУ І НЕ ПРОПОНУЙ БРОНЮВАТИ МІСЦЕ.";
        // ВАЖНО: Мы больше не очищаем injectionMessage, чтобы триггеры вроде "Дякую" могли срабатывать даже после захвата лида.
    }

    history.push({ role: "user", content: text });
    const messagesForGroq = [
        { role: "system", content: finalSystemPrompt },
        ...history.slice(-10, -1)
    ];
    if (injectionMessage) messagesForGroq.push(injectionMessage);
    messagesForGroq.push(history[history.length - 1]);

    await ctx.sendChatAction('typing');

    // 5. Запрос в нейросеть (Groq API)
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messagesForGroq,
                temperature: promptData?.temperature || 0.7,
                max_tokens: 350
            })
        });

        if (!response.ok) throw new Error(`Groq API Status: ${response.status}`);
        const data = await response.json();
        const aiReply = data.choices[0].message.content.trim();

        // 6. Сохраняем ответ в память и обновляем лид в CRM
        history.push({ role: "assistant", content: aiReply });
        await supabase.from('chat_histories').upsert({ chat_id: chatId, messages: history, updated_at: new Date().toISOString() });

        // Важно: записываем raw_data ТОЛЬКО если статус еще не "phone_captured", чтобы не сломать стейт-менеджмент
        if (!isCaptured) {
            await supabase.from('leads').upsert({
                telegram_id: chatId,
                raw_data: text,
                status: 'in_progress'
            }, { onConflict: 'telegram_id' });
        }

        await ctx.reply(aiReply);
    } catch (e) {
        console.error("[LLM ERROR]:", e);
        await ctx.reply("Секунду, я обдумываю информацию... (Системная задержка)");
    }
});

export default bot;