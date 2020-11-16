import knex from 'knex'
import env from '@/main/config/env'

export const DbHelper = {
  db: null as knex,
  uri: null as string,

  async connect (uri?: string) {
    this.uri = uri
    this.db = await process.env.NODE_ENV === 'test' ? this.getDatabaseTest() : this.getDatabase(uri)
    return this.db
  },

  async disconnect (): Promise<void> {
    await this.db.destroy()
  },

  getConnection () {
    return this.db
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
        user: env.db_user,
        password: env.db_password,
        database: env.db_database
      },
      migrations: {
        directory: 'src/infra/db/migrations'
      },
      useNullAsDefault: true
    })
  }

}
