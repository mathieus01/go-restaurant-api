import { mockAddAccountModel } from '@/domain/test/mock-account'
import { mockAddOrderParams } from '@/domain/test/mock-order'
import Account from '@/infra/models/account-model'
import Food from '@/infra/models/food-model'
import Order from '@/infra/models/order-model'
import Type from '@/infra/models/type-model'
import { OrderDbRepository } from './order-db-repository'

describe('OrderDb Repository', () => {
  beforeEach(async (done) => {
    await Order.destroy({
      where: {}
    })
    await Food.destroy({
      where: {}
    })
    await Type.destroy({
      where: {}
    })
    await Account.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('should add an account on success', async () => {
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      const sut = new OrderDbRepository()
      const order = await sut.add({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })
      expect(order).toBeTruthy()
    })
  })
})
