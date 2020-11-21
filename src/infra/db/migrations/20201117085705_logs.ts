import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('logs', table => {
    table.increments('id').primary()
    table.string('stack', 1000).notNullable()
    table.date('date').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('logs')
}
