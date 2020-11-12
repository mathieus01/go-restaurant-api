import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '@/domain/models/account'
import { DbHelper } from '../helpers/db-helper'

export class AccountDbRepository implements LoadAccountByEmailRepository, UpdateAccessTokenRepository {
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
    return Promise.resolve()
  }
}
