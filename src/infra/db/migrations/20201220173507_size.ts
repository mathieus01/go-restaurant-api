import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('sizes', table => {
    table.increments('id').primary()
    table.string('size').notNullable()
    table.decimal('cost')
    table.integer('typeId')
      .notNullable()
      .references('id')
      .inTable('types')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('sizes')
}
