import 'dotenv/config';

import type { VercelRequest, VercelResponse } from '@vercel/node';

import app from '../src/app';
import { connectDB } from '../src/config/database';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
): Promise<void> {
    console.log('1. Handler iniciado:', req.method, req.url);
    console.log('2. MONGODB_URI definida:', Boolean(process.env.MONGODB_URI));

    try {
        console.log('3. Antes de connectDB');
        await connectDB();
        console.log('4. Después de connectDB');

        app(req, res);
        console.log('5. Express invocado');
    } catch (error) {
        console.error('6. Error en handler:', error);

        if (!res.headersSent) {
            res.status(500).json({
                error: 'Unable to connect to database'
            });
        }
    }
}