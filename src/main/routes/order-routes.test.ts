import { mockAddAccountModel } from '@/domain/test/mock-account'
import { mockAddFoodParams, mockAddTypeParams } from '@/domain/test/mock-menu'
import Account from '@/infra/models/account-model'
import Food from '@/infra/models/food-model'
import Type from '@/infra/models/type-model'
import request from 'supertest'
import app from '../config/app'

describe('Order Route', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    done()
  })

  test('should add a order ', async () => {
    const { food, price } = mockAddFoodParams()
    const typeModel = await Type.create(mockAddTypeParams())
    const foodModel = await Food.create({ food, price, type_id: typeModel.id })
    const account = await Account.create(mockAddAccountModel())

    const httpRequest = {
      food_id: foodModel.id,
      observation: 'any_observation',
      date: new Date(),
      address: 'any_address',
      account_id: account.id,
      status: 'INICIAL'
    }

    await request(app)
      .post('/api/order')
      .send(httpRequest)
      .expect(200)
  })
})
