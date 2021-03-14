import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountDbRepository } from '@/infra/db'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountDbRepository = new AccountDbRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountDbRepository)
}
