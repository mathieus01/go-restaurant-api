module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'docker',
    password: 'docker',
    database: 'go-restaurant',
    define: {
      timestamps: true,
      underscored: true
    }
  },
  test: {
    dialect: 'sqlite',
    storage: 'src/infra/db/helpers/database.sqlite'
  },
  define: {
    timestamps: true,
    underscored: true
  }
}
