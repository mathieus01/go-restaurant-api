import { Hasher } from '@/data/protocols/cryptography'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepositoryStub.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const accountModel = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return accountModel
    }
    return null
  }
}
