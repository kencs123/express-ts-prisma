import app from './app';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function bootstrap() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connection established');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();