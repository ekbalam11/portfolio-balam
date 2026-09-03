import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer(): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI no está definida en el archivo .env');
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to the database');

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start server:', error);
  process.exit(1);
});