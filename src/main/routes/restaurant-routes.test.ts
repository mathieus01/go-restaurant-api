import app from '@/main/config/app'
import { Account } from '@/infra/models'
import request from 'supertest'

describe('Restaurant Route', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    await Account.destroy({
      where: {}
    })
    done()
  })

  test('Should return 200 on get list of restaurants', async () => {
    await Account.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isRestaurant: true
    })

    await request(app)
      .get('/api/restaurants')
      .expect(200)
  })
})
