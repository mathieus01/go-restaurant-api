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
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/menu')
        .send(mockAddFoodParams())
        .expect(200)
    })
  })
})
