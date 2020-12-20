import { mockAddFoodParams } from '@/domain/test/mock-menu'
import { DbHelper } from '@/infra/db/helpers/db-helper'
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
    await db('foods').delete()
    await db('types').delete()
    await db('sizes').delete()
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
