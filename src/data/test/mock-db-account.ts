import { AccountModel } from '@/domain/models/account'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
