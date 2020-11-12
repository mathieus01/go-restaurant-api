module.exports = {
  development: {
    client: 'pg',
    migrations: {
      directory: `${__dirname}/src/infra/db/migrations`
    }
  }
}
