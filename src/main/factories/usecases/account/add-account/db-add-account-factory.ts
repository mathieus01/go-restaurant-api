import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountDbRepository } from '@/infra/db/account/account-db-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountDbRepository = new AccountDbRepository()
  const hasher = new BcryptAdapter(salt)
  return new DbAddAccount(accountDbRepository, accountDbRepository, hasher)
}
