import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('types', table => {
    table.increments('id').primary()
    table.string('flavor').notNullable()

    table.integer('foodId')
      .notNullable()
      .references('id')
      .inTable('foods')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('types')
}
