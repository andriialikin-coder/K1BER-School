import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    // Этот лог мы ОБЯЗАНЫ увидеть в панели Vercel
    console.log("=== ВХОДЯЩИЙ ТРАФИК ОТ TELEGRAM (ОТКЛЮЧЕН) ===");

    return res.status(200).send('Bot is offline.');
};