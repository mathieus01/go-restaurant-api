import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('foods', table => {
    table.increments('id').primary()
    table.string('food').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('foods')
}
