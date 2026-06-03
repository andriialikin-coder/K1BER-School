import { VercelRequest, VercelResponse } from '@vercel/node';
import bot from '../src/bot';

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        // Проверяем, что запрос пришел именно методом POST
        if (req.method === 'POST') {
            // Передаем входящее сообщение от Телеграма в движок нашего бота
            await bot.handleUpdate(req.body);
            res.status(200).send('OK');
        } else {
            res.status(200).send('Бот работает. Ожидание POST-запросов от Telegram.');
        }
    } catch (error) {
        console.error('Ошибка внутри Webhook-обработчика:', error);
        res.status(500).send('Internal Server Error');
    }
};