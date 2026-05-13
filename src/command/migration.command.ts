import dbConfig from '../config/database.config';
import knex from 'knex';

const db = knex(dbConfig);

const migrate = async () => {
  try {
    await db.migrate.latest();
    console.log('Running migrations successful..');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed: ', err);
    process.exit(1);
  }
};

migrate();