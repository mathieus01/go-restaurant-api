import { mockAddAccountModel } from '@/domain/test/mock-account'
import { mockAddOrderParams } from '@/domain/test/mock-order'
import Account from '@/infra/models/account-model'
import Food from '@/infra/models/food-model'
import Order from '@/infra/models/order-model'
import Size from '@/infra/models/size-model'
import Type from '@/infra/models/type-model'
import { OrderDbRepository } from './order-db-repository'

describe('OrderDb Repository', () => {
  beforeEach(async (done) => {
    await Size.destroy({
      where: {}
    })
    await Type.destroy({
      where: {}
    })
    await Food.destroy({
      where: {}
    })
    await Account.destroy({
      where: {}
    })
    await Order.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('should add an account on success', async () => {
      const food1 = await Food.create({ food: 'any_food1' })
      const type1 = await Type.create({ flavor: 'any_flavor1', food_id: food1.id })
      const size = await Size.create({ size: 'any_size1', price: 70, type_id: type1.id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      const sut = new OrderDbRepository()
      const order = await sut.add({ status: 'RECEBIDO', address, observation, date, account_id: account.id, size_food_id: size.id })
      expect(order).toBeTruthy()
    })
  })
})
