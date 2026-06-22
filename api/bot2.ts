import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    console.log("=== ВХОДЯЩИЙ ТРАФИК ОТ TELEGRAM (BOT 2 - SURVEY) (ОТКЛЮЧЕН) ===");

    return res.status(200).send('Bot 2 is offline.');
};
