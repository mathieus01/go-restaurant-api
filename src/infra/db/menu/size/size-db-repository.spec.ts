import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Knex from 'knex'
import { DbHelper } from '../../helpers/db-helper'
import { SizeDbRepository } from './size-db-repository'

describe('Size Db Repository', () => {
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
    test('Should add a size', async () => {
      const { type } = mockAddFoodParams()
      const { sizes } = type
      const { size } = sizes[0]
      const sut = new SizeDbRepository()
      const sizeId = await sut.add({ size })
      expect(sizeId).toBeTruthy()
    })
  })
})
