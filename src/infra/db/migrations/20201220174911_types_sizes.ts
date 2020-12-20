import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('types_sizes', table => {
    table.increments('id').primary()
    table
      .integer('typeId')
      .references('id')
      .inTable('types')
    table
      .integer('sizeId')
      .references('id')
      .inTable('sizes')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('types_sizes')
}
