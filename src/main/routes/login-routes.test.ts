import Account from '@/infra/models/account-model'
import { hash } from 'bcrypt'
import request from 'supertest'
import app from '../config/app'

describe('Login Route', () => {
  beforeEach(async (done) => {
    await Account.destroy({
      where: {}
    })
    done()
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await Account.create({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password,
        isRestaurant: false
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_mail@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })
    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_mail@mail.com',
          password: 'any_password'
        })
        .expect(401)
    })
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'mathieusnunes@gmail.com',
          password: '123',
          passwordConfirmation: '123',
          isRestaurant: false
        })
        .expect(200)
    })
  })
})
