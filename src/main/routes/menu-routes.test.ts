import { mockAddFoodParams, mockAddFoodRequestParams, mockAddTypeParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
import Type from '@/infra/models/type-model'
import request from 'supertest'
import app from '../config/app'

describe('Login Route', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    done()
  })

  describe('POST /menu', () => {
    test('Should return 200 on add Food', async () => {
      await request(app)
        .post('/api/menu')
        .send(mockAddFoodRequestParams())
        .expect(200)
    })
  })

  describe('GET /menu', () => {
    test('Should return 200 on get list of FOOD', async () => {
      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      await Food.create({ food: 'any_food1', price, type_id: typeModel.id })
      await Food.create({ food: 'any_food2', price, type_id: typeModel.id })
      await Food.create({ food: 'any_food3', price, type_id: typeModel.id })

      await request(app)
        .get('/api/menu')
        .expect(200)
    })
  })
  describe('DELETE /menu', () => {
    test('Should return 204 on remove a FOOD', async () => {
      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const food = await Food.create({ food: 'any_food1', price, type_id: typeModel.id })

      await request(app)
        .delete(`/api/menu/${food.id}`)
        .expect(204)
    })
  })
})
