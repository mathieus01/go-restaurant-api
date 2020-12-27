import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import Account from '@/infra/models/account-model'

export class AccountDbRepository implements LoadAccountByEmailRepository, UpdateAccessTokenRepository, AddAccountRepository {
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
}
