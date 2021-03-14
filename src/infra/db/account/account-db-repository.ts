import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { Account } from '@/infra/models'

export class AccountDbRepository implements LoadAccountByEmailRepository, UpdateAccessTokenRepository, AddAccountRepository, LoadAccountByIdRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountModel = await Account.create(accountData)
    return accountModel
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await Account.findOne({ where: { email } })
    return account
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    await Account.update({ token }, { where: { id } })
  }

  async loadById (id: number): Promise<AccountModel> {
    const account = await Account.findByPk(id)
    return account
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const account = await Account.findOne({
      where: {
        token: token
      }
    })
    return account
  }
}
