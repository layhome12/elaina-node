import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();

    table
      .integer('group_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('groups')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('name', 150);
    table.string('username', 150);
    table.string('email');
    table.string('password');

    table.string('picture').nullable();
    table.string('biodata').nullable();

    table.string('activation_code', 10).nullable();

    table.boolean('activation_status').defaultTo(false);
    table.boolean('is_blocked').defaultTo(false);

    table.dateTime('created_at').nullable();
    table.dateTime('updated_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}