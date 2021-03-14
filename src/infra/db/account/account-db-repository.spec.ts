import { AccountDbRepository } from './account-db-repository'
import { mockAddAccountModel } from '@/domain/test'
import { Account } from '@/infra/models'

describe('Account Db Repository', () => {
  beforeEach(async (done) => {
    await Account.destroy({
      where: {}
    })
    done()
  })

  describe('loadByEmail()', () => {
    test('Should return a account on loadByEmail success', async () => {
      const sut = new AccountDbRepository()
      await Account.create(mockAddAccountModel())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
    })
    test('Should return a null if loadByEmail fails', async () => {
      const sut = new AccountDbRepository()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update an access token on success', async () => {
      const sut = new AccountDbRepository()
      const account = await Account.create(mockAddAccountModel())
      await sut.updateAccessToken(account.id, 'any_token')
      const fakeAccount = await Account.findByPk(account.id)
      expect(fakeAccount.token).toEqual('any_token')
    })
  })

  describe('add()', () => {
    test('Should add an account on success', async () => {
      const accountParams = mockAddAccountModel()
      const sut = new AccountDbRepository()
      const accountModel = await sut.add(accountParams)
      expect(accountModel).toBeTruthy()
      expect(accountModel.id).toBeTruthy()
      expect(accountModel.name).toBe('any_name')
      expect(accountModel.email).toBe('any_email@mail.com')
      expect(accountModel.password).toBe('any_password')
    })
  })

  describe('loadById()', () => {
    test('Should return an account on success', async () => {
      const account = await Account.create(mockAddAccountModel())
      const sut = new AccountDbRepository()
      const accountModel = await sut.loadById(account.id)
      expect(accountModel).toBeTruthy()
      expect(accountModel.id).toBeTruthy()
      expect(accountModel.name).toBe(account.name)
      expect(accountModel.email).toBe(account.email)
      expect(accountModel.password).toBe(account.password)
    })
    test('Should return null if loadById fails', async () => {
      const sut = new AccountDbRepository()
      const accountModel = await sut.loadById(1)
      expect(accountModel).toBeFalsy()
    })
  })
  describe('loadByToken()', () => {
    test('Should return an account on success', async () => {
      const sut = new AccountDbRepository()
      await Account.create({ ...mockAddAccountModel(), token: 'any_token' })
      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return null if loadByToken fails', async () => {
      const sut = new AccountDbRepository()
      const accountModel = await sut.loadByToken('any_token', 'admin')
      expect(accountModel).toBeFalsy()
    })
  })
})
