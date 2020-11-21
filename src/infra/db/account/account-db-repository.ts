import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { DbHelper } from '../helpers/db-helper'

export class AccountDbRepository implements LoadAccountByEmailRepository, UpdateAccessTokenRepository, AddAccountRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const db = await DbHelper.connect()
    const ids = await db('accounts').insert(accountData)
    const result = await db('accounts').where({ id: ids[0] }).select()
    const accountModel = result?.length > 0 ? result[0] : null
    return accountModel
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const db = await DbHelper.connect()
    const result = await db('accounts').where({ email }).select()
    const account = result?.length > 0 ? result[0] : null
    return account
  }

  async updateAccessToken (id: number, token: string): Promise<void> {
    const db = await DbHelper.connect()
    await db('accounts').update({
      token
    }).where({ id })
  }
}
