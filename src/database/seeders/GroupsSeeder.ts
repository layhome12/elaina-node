import { Knex } from 'knex';
import { SeederInterface } from './MainSeeder';
import Dates from '../../common/helpers/date.helper';

export default class GroupsSeeder implements SeederInterface {
  public async run(knex: Knex): Promise<void> {
    const rows = [
      { name: 'Developer' },
      { name: 'Administrator' },
      { name: 'User' },
    ].map((item) => ({
      ...item,
      created_at: Dates.now(),
    }));

    await knex('groups').insert(rows);
  }
}