import Knex from 'knex'
import { DbHelper } from '../helpers/db-helper'
import { LogDbRepository } from './log-db-repository'

describe('LogDbRepository', () => {
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
    await db('logs').delete()
    done()
  })
  describe('logError()', () => {
    test('Should create an error log on success ', async () => {
      const sut = new LogDbRepository()
      await sut.logError('any_stack')
      const logs = await db('logs').select()
      expect(logs).toBeTruthy()
      expect(logs.length).toEqual(1)
    })
  })
})
