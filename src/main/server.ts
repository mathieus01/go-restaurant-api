import 'module-alias/register'
import { DbHelper } from '@/infra/db/helpers/db-helper'
import env from './config/env'

DbHelper.connect(env.db_host)
  .then(async (db) => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
