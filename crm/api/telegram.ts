import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { lead } = req.body;
    if (!lead) return res.status(400).json({ error: 'Missing lead data' });

    // Безпечно беремо токени з серверних змінних оточення
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_IDS = [process.env.TG_USER_1, process.env.TG_USER_2].filter(Boolean);

    if (!BOT_TOKEN) {
        console.error("No Telegram Bot Token found (BOT_TOKEN).");
        return res.status(500).json({ error: 'Telegram bot credentials missing' });
    }

    if (CHAT_IDS.length === 0) {
        console.error("No Telegram Chat IDs found (TG_USER_1, TG_USER_2).");
        return res.status(500).json({ error: 'Telegram chat IDs missing' });
    }

    // Форматування повідомлення
    const text = `🔥 НОВИЙ ЛІД ДЛЯ K1BER.SCHOOL!\n\n👤 Ім'я: ${lead.name || 'Не вказано'}\n📞 Телефон: ${lead.phone || 'Не вказано'}\n🎯 Курс: ${lead.course || 'Не обрано'}\n\n👇 Тисни кнопку нижче, щоб подивитися AI-аналіз клієнта та готовий скрипт для дзвінка!`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payloadTemplate = {
        text,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "📊 Відкрити картку в CRM", url: "https://kiber-school.vercel.app/crm" }
                ]
            ]
        }
    };

    try {
        // Відправляємо сповіщення всім зазначеним менеджерам паралельно
        const promises = CHAT_IDS.map(chat_id => {
            return fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payloadTemplate, chat_id })
            });
        });

        await Promise.all(promises);
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error('Failed to send telegram messages:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
