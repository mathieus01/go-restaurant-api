import { DbHelper } from '@/infra/db/helpers/db-helper'
import { hash } from 'bcrypt'
import Knex from 'knex'
import request from 'supertest'
import app from '../config/app'

describe('Login Route', () => {
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
    await db('accounts').delete()
    done()
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await db('accounts').insert({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password
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
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
})
