import { Telegraf, Context } from 'telegraf';
import { supabase } from './supabaseClient';

const token = (process.env.BOT_TOKEN || '') as string;
const groqApiKey = (process.env.GROQ_API_KEY || '') as string;

if (!token || !groqApiKey) {
    console.error("Критическая ошибка: BOT_TOKEN или GROQ_API_KEY отсутствует в Vercel.");
}

const bot = new Telegraf(token);

// --- ОБРАБОТКА /START ---
bot.start(async (ctx: Context) => {
    const chatId = ctx.from?.id.toString();
    const userName = ctx.from?.first_name || 'Unknown';
    if (!chatId) return;

    // 1. Достаем динамическое приветствие
    const { data: promptData } = await supabase.from('prompts').select('greeting_text').eq('name', 'main_bot').single();
    const greeting = promptData?.greeting_text;

    if (!greeting) {
        console.error("[CRITICAL] Помилка: Поле greeting_text порожнє або відсутнє в таблиці prompts для name='main_bot'!");
        await ctx.reply("Сталася помилка при запуску бота. Будь ласка, спробуйте пізніше або зверніться до адміністратора.");
        return;
    }

    // 2. Обнуляем/создаем историю и пишем лида в CRM
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

    // 1. Достаем динамическое приветствие (или берем заглушку)
    const { data: promptData, error: promptError } = await supabase.from('prompts').select('greeting_text').eq('name', 'main_bot').single();
    if (promptError) console.error("[CRITICAL] Ошибка загрузки промпта при /clear:", promptError.message);
    const greeting = promptData?.greeting_text || 'Память очищена. Начнем заново.';

    // 2. Жестко перезаписываем историю диалога
    await supabase.from('chat_histories').upsert({
        chat_id: chatId,
        messages: [{ role: "assistant", content: greeting }],
        updated_at: new Date().toISOString()
    });

    console.log(`[MEMORY CLEARED] Юзер ${chatId} сбросил контекст.`);
    await ctx.reply(greeting);
});

// --- ОСНОВНЫЕ "МОЗГИ" ---
bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const chatId = ctx.from.id.toString();

    // ========== ПЕРЕХВАТ НОМЕРА ТЕЛЕФОНА (ДО Groq API) ==========
    const phoneRegex = /(?:\+?\d{1,3})?[\s\-]?\(?\d{2,3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/;
    const phoneMatch = text.match(phoneRegex);

    if (phoneMatch) {
        // Очищаем номер от пробелов, дефисов, скобок — оставляем только цифры и +
        const rawPhone = phoneMatch[0];
        const cleanPhone = rawPhone.replace(/[^\d+]/g, '');

        // --- ПАРСИНГ ИМЕНИ ИЗ ТЕКСТА ---
        // Очищаем строку от номера телефона, чтобы вытащить имя
        let nameCandidate = text.replace(rawPhone, '');
        // Полностью убираем любые цифры из остатка текста
        nameCandidate = nameCandidate.replace(/[\d]/g, '');

        let parsedName = '';

        // Жесткие маркеры-префиксы. Если юзер написал один из них, имя будет СЛЕДУЮЩИМ словом.
        const nameMarkers = [
            'мене звати', 'мене звуть', 'звати мене', 'моє ім\'я', 'моє імя',
            'меня зовут', 'мое имя', 'моё имя', 'ім\'я', 'імя', 'имя', 'я'
        ];

        for (const marker of nameMarkers) {
            const markerRegex = new RegExp(`(?:^|\\s)${marker}(?:\\s+|$)([^\\s,.:;!?]+)`, 'i');
            const match = nameCandidate.match(markerRegex);
            if (match && match[1]) {
                // Нашли слово идущее сразу за маркером (например, "Наталя")
                parsedName = match[1].trim();
                break;
            }
        }

        // Если маркер не сработал (юзер просто написал "Наталя 0991234567"), включаем резервную глубокую очистку
        if (!parsedName) {
            const stopWords = [
                'ось номер', 'ось мій номер', 'мій номер', 'мой номер',
                'номер телефону', 'номер телефона', 'телефон',
                'це мій', 'це мой', 'ось', 'це', 'це я',
                'запишіть', 'запишите', 'запиши',
                'будь ласка', 'пожалуйста',
                'зателефонуйте', 'перезвоните', 'зателефонуй'
            ];

            for (const word of stopWords) {
                const safeRegex = new RegExp(`(^|\\s)${word}(?=\\s|$)`, 'gi');
                nameCandidate = nameCandidate.replace(safeRegex, ' ');
            }

            // Убираем одиночные союзы
            nameCandidate = nameCandidate.replace(/(^|\s)(і|й|а|та)(?=\s|$)/gi, ' ');

            // Сносим пунктуацию
            nameCandidate = nameCandidate
                .replace(/[,.:;!?()"\-\+_\/\\|*]/g, '')
                .replace(/\s+/g, ' ')
                .trim();

            // Если что-то осталось — берем первое слово как имя
            if (nameCandidate) {
                parsedName = nameCandidate.split(' ')[0];
            }
        }

        // Финальная валидация длины. Если все еще пусто или мусор — берем имя из Telegram-профиля
        parsedName = (parsedName.length >= 2 && parsedName.length < 20)
            ? parsedName
            : (ctx.from?.first_name || 'Шановний клієнт');

        // Делаем первую букву имени заглавной на уровне кода, для красоты в CRM
        parsedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);

        console.log(`[PHONE CAPTURED] Юзер ${chatId} | Номер: ${cleanPhone} | Ім'я: ${parsedName}`);

        // 1. ЗАПИСЬ В CRM (Supabase) — upsert в leads с именем и номером
        const { error: crmError } = await supabase.from('leads').upsert({
            telegram_id: chatId,
            name: parsedName,
            phone: cleanPhone,
            status: 'phone_captured'
        }, { onConflict: 'telegram_id' });

        if (crmError) {
            console.error('[CRM ERROR] Не удалось сохранить номер:', crmError.message);
        }

        // 2. ОЧИСТКА ПАМЯТИ — сброс истории диалога
        const { data: resetPromptData } = await supabase
            .from('prompts')
            .select('greeting_text')
            .eq('name', 'main_bot')
            .single();
        const resetGreeting = resetPromptData?.greeting_text || 'Дякуємо за звернення!';

        await supabase.from('chat_histories').upsert({
            chat_id: chatId,
            messages: [{ role: "assistant", content: resetGreeting }],
            updated_at: new Date().toISOString()
        });

        // 3. ОТВЕТ КЛИЕНТУ — персонализированное сообщение
        await ctx.reply(
            `Дякую, ${parsedName}! Ваш номер ${cleanPhone} зафіксовано. ` +
            `Наш менеджер зв'яжеться з вами найближчим часом для підтвердження запису на безкоштовний урок.`
        );

        // 4. СТОП — запрос к Groq API НЕ уходит
        return;
    }
    // ========== КОНЕЦ ПЕРЕХВАТА НОМЕРА ==========

    // 1. Подгружаем системный промпт (личность бота)
    const { data: promptData, error: promptError } = await supabase.from('prompts').select('content, temperature').eq('name', 'main_bot').single();

    if (promptError) {
        console.error("[CRITICAL DB ERROR] Не удалось загрузить промпт из Supabase:", promptError.message);
    }

    const systemPrompt = promptData?.content || "Ты полезный ассистент.";
    console.log("[SYSTEM PROMPT LOADED]:", systemPrompt.substring(0, 50) + "...");

    // 2. Ищем триггерные слова для перехвата стратегии
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

    // 3. Поднимаем историю диалога
    const { data: historyData } = await supabase.from('chat_histories').select('messages').eq('chat_id', chatId).maybeSingle();
    const history = Array.isArray(historyData?.messages) ? historyData.messages : [];

    // 4. Формируем стек памяти для LLM (системный промпт + история + инъекция + текущий текст)
    history.push({ role: "user", content: text });
    const messagesForGroq = [
        { role: "system", content: systemPrompt },
        ...history.slice(-10, -1) // Берем последние реплики, чтобы не переполнять токены
    ];
    if (injectionMessage) messagesForGroq.push(injectionMessage);
    messagesForGroq.push(history[history.length - 1]); // Последнее сообщение юзера

    // Показываем клиенту, что бот "печатает"
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

        await supabase.from('leads').upsert({
            telegram_id: chatId,
            raw_data: text, // Сохраняем последнее сообщение
            status: 'in_progress'
        }, { onConflict: 'telegram_id' });

        await ctx.reply(aiReply);
    } catch (e) {
        console.error("[LLM ERROR]:", e);
        await ctx.reply("Секунду, я обдумываю информацию... (Системная задержка)");
    }
});

export default bot;