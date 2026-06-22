import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const BOT2_TOKEN = process.env.BOT2_TOKEN;

    const results: any = {};

    if (BOT_TOKEN) {
        try {
            const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);
            results.bot1 = await resp.json();
        } catch (e: any) {
            results.bot1_error = e.message;
        }
    } else {
        results.bot1 = 'No BOT_TOKEN found';
    }

    if (BOT2_TOKEN) {
        try {
            const resp = await fetch(`https://api.telegram.org/bot${BOT2_TOKEN}/deleteWebhook`);
            results.bot2 = await resp.json();
        } catch (e: any) {
            results.bot2_error = e.message;
        }
    } else {
        results.bot2 = 'No BOT2_TOKEN found';
    }

    return res.status(200).json({ 
        message: "Webhooks deleted successfully! The bots are now completely free to be connected anywhere else via long-polling or a new webhook.", 
        results 
    });
};
