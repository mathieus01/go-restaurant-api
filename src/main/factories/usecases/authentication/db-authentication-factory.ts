import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountDbRepository } from '@/infra/db/account/account-db-repository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountDbRepository = new AccountDbRepository()
  return new DbAuthentication(accountDbRepository, bcryptAdapter, jwtAdapter, accountDbRepository)
}
