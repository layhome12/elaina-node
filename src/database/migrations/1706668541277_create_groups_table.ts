import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('groups', (table) => {
    table.increments('id').primary();

    table.string('name', 150);

    table.dateTime('created_at').nullable();
    table.dateTime('updated_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('groups');
}