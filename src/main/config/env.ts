export default {
  databaseUrl: process.env.DB_URL || 'postgresql://localhost:5432',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670===5H',
  db_host: '127.0.0.1',
  db_database: 'go-restaurant',
  db_user: 'docker',
  db_password: 'docker',
  db_port: 5432
}
