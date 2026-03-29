import { configDotenv } from 'dotenv';

configDotenv();

const env = {
  // APP ENVS
  app: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    name: process.env.DATABASE_NAME || 'event_db',
  },
};

export default env;
