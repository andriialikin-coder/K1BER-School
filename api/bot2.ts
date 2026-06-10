import { VercelRequest, VercelResponse } from '@vercel/node';
import bot from '../src/bot2';

export default async (req: VercelRequest, res: VercelResponse) => {
    console.log("=== ВХОДЯЩИЙ ТРАФИК ОТ TELEGRAM (BOT 2 - SURVEY) ===");

    try {
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            return res.status(200).send('OK');
        }
        return res.status(200).send('Бот-анкетолог на связи, жду POST запросы.');
    } catch (error) {
        console.error('Критический сбой обработчика bot2:', error);
        return res.status(500).send('Internal Error');
    }
};
