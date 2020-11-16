require('ts-node/register')

module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'go-restaurant',
    port: '5432',
    user: 'docker',
    password: 'docker'
  },
  migrations: {
    directory: '../migrations'
  },
  useNullAsDefault: true
}
