import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
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
        .send(mockAddFoodParams())
        .expect(200)
    })
  })

  describe('GET /menu', () => {
    test('Should return 200 on get list of FOOD', async () => {
      await Food.create({ food: 'any_food1' })
      await Food.create({ food: 'any_food2' })
      await Food.create({ food: 'any_food3' })

      await request(app)
        .get('/api/menu')
        .expect(200)
    })
  })
})
