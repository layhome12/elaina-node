import knex from 'knex';
import dbConfig from '../../config/database.config';

import UsersSeeder from './UsersSeeder';
import GroupsSeeder from './GroupsSeeder';

export class MainSeeder {
  async run(): Promise<void> {
    const db = knex(dbConfig);

    // -- seeder in here (order penting!)
    await this.runSeeder(db, GroupsSeeder);
    await this.runSeeder(db, UsersSeeder);

    await db.destroy();
  }

  private runSeeder = async (db: any, SeederClass: any) => {
    const seeder = new SeederClass();
    await seeder.run(db);
  };
}

export interface SeederInterface {
  run(knex: any): Promise<void>;
}