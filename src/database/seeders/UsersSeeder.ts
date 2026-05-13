import { Knex } from 'knex';
import { SeederInterface } from './MainSeeder';
import Hash from '../../common/helpers/hash.helper';
import Dates from '../../common/helpers/date.helper';

export default class UsersSeeder implements SeederInterface {
  public async run(knex: Knex): Promise<void> {
    await knex('users').insert([
      {
        group_id: 1,
        name: 'Developer',
        email: 'developer@gmail.com',
        username: 'developer@321',
        password: Hash.make('password'),
        picture: null,
        activation_code: '000000',
        activation_status: true,
        is_blocked: false,
        created_at: Dates.now(),
      },
    ]);
  }
}