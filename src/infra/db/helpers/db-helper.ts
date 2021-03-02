import { Sequelize } from 'sequelize'

class Database {
  public connection: Sequelize

  constructor () {
    this.init()
  }

  init (): void {
    const dbConfig = process.env.NODE_ENV === 'test' ? this.getDatabaseTest() : this.makeDatabase()
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

  makeDatabase = (): any => ({
    database: 'go-restaurant',
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'docker',
    password: 'docker',
    define: {
      timestamps: true,
      underscored: true
    }
  })
}

const database: Database = new Database()

export default database
