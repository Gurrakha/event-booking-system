import { PrismaClient } from '@/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import env from './env';

const adapter = new PrismaMariaDb({
  host: env.db.host,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter, errorFormat: 'minimal' });
export default prisma;
