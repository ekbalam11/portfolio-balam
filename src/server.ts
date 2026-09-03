import 'dotenv/config';

import app from './app';
import { connectDB } from './config/database';

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
    await connectDB();

    console.log('Connected to the database');

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Unable to start server:', error);
    process.exit(1);
});