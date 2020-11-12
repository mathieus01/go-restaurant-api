import knex from 'knex'

export const DbHelper = {
  db: null as knex,
  uri: null as string,

  async connect (uri?: string) {
    this.uri = uri
    this.db = await process.env.NODE_ENV === 'test' ? this.getDatabaseTest() : this.getDatabase()
    return this.db
  },

  async disconnect (): Promise<void> {
    await this.db.destroy()
  },

  getDatabaseTest () {
    return knex({
      client: 'sqlite3',
      connection: {
        filename: 'src/infra/db/helpers/database.sqlite'
      },
      migrations: {
        directory: 'src/infra/db/migrations'
      },
      useNullAsDefault: true
    })
  },

  getDatabase (uri: string) {
    return knex({
      client: 'pg',
      connection: {
        host: uri,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      },
      useNullAsDefault: true
    })
  }

}
