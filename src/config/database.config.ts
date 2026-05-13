import { config as envConfig } from 'dotenv';
import knex, { Knex } from 'knex';

envConfig({ path: '.env' });

const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 0,
    max: 5,
  },
  migrations: {
    directory: './src/database/migrations',
  },
};

export const db = knex(dbConfig);
export default dbConfig;