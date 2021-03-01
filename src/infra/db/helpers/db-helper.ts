import { Sequelize } from 'sequelize'
import { database as dbConfigDataBase } from '@/infra/db/config/database'

class Database {
  public connection: Sequelize

  constructor () {
    this.init()
  }

  init (): void {
    const dbConfig = process.env.NODE_ENV === 'test' ? this.getDatabaseTest() : dbConfigDataBase
    this.connection = new Sequelize(dbConfig)
  }

  getDatabaseTest (): any {
    return {
      dialect: 'sqlite',
      storage: 'src/infra/db/helpers/database.sqlite',
      define: {
        timestamps: true,
        underscored: true
      }
    }
  }
}

const database: Database = new Database()

export default database
