import { VercelRequest, VercelResponse } from '@vercel/node';
import bot from '../src/bot';

export default async (req: VercelRequest, res: VercelResponse) => {
    // Этот лог мы ОБЯЗАНЫ увидеть в панели Vercel
    console.log("=== ВХОДЯЩИЙ ТРАФИК ОТ TELEGRAM ===");

    try {
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            return res.status(200).send('OK');
        }
        return res.status(200).send('Бот на связи, жду POST запросы.');
    } catch (error) {
        console.error('Критический сбой обработчика:', error);
        return res.status(500).send('Internal Error');
    }
};