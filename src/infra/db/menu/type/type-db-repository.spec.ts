import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Knex from 'knex'
import { DbHelper } from '../../helpers/db-helper'
import { TypeDbRepository } from './type-db-repository'

describe('Type Db Repository', () => {
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
    await db('foods').delete()
    done()
  })

  describe('add()', () => {
    test('Should add a food', async () => {
      const { type } = mockAddFoodParams()
      const { flavor } = type
      const sut = new TypeDbRepository()
      const typeId = await sut.add({ flavor, foodId: 1 })
      expect(typeId).toBeTruthy()
    })
  })
})
