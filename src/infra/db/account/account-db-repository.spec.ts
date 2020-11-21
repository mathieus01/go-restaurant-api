import { AccountDbRepository } from './account-db-repository'
import { DbHelper } from '@/infra/db/helpers/db-helper'
import { mockAddAccountModel } from '@/domain/test/mock-account'
import Knex from 'knex'

describe('Account Db Repository', () => {
  let db: Knex

  beforeAll(async (done) => {
    db = await DbHelper.connect()
    await db.migrate.latest()
    done()
  })

  afterAll(async done => {
    await db.destroy()
    done()
  })

  beforeEach(async (done) => {
    await db('accounts').delete()
    done()
  })

  describe('loadByEmail()', () => {
    test('Should return a account on loadByEmail success', async () => {
      const sut = new AccountDbRepository()
      await db('accounts').insert(mockAddAccountModel())
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
      const result = await db('accounts').insert(mockAddAccountModel())
      await sut.updateAccessToken(result[0], 'any_token')
      const fakeAccount = await db('accounts').where({ id: result[0] }).select()
      expect(fakeAccount[0].token).toEqual('any_token')
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
})
