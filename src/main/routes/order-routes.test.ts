import { mockAddAccountModel } from '@/domain/test/mock-account'
import Account from '@/infra/models/account-model'
import Food from '@/infra/models/food-model'
import Size from '@/infra/models/size-model'
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

  test('should ', async () => {
    const food1 = await Food.create({ food: 'any_food1' })
    const type1 = await Type.create({ flavor: 'any_flavor1', food_id: food1.id })
    const size1 = await Size.create({ size: 'any_size1', price: 70, type_id: type1.id })
    const account = await Account.create(mockAddAccountModel())

    const httpRequest = {
      size_food_id: size1.id,
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
