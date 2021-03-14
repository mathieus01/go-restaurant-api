import app from '@/main/config/app'
import { Account } from '@/infra/models'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const makeAccessToken = async (): Promise<string> => {
  const { id } = await Account.create({
    name: 'any_name_token',
    email: 'any_email_token@mail.com',
    password: 'any_password_token',
    isRestaurant: false
  })

  const token = sign({ id }, env.jwtSecret)
  await Account.update({ token }, { where: { id } })
  return token
}

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
      .set('x-access-token', await makeAccessToken())
      .expect(200)
  })
})
