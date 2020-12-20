import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Knex from 'knex'
import { DbHelper } from '../../helpers/db-helper'
import { FoodDbRepository } from './food-db-repository'

describe('Food Db Repository', () => {
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
      const sut = new FoodDbRepository()
      const { food } = mockAddFoodParams()
      const foodId = await sut.add({ food })
      expect(foodId).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load a food by id', async () => {
      const { food } = mockAddFoodParams()
      const foodId = await db('foods').insert({ food }).returning('id')
      const sut = new FoodDbRepository()
      const foodModel = await sut.loadById(foodId[0])
      expect(foodModel).toBeTruthy()
    })
  })
})
