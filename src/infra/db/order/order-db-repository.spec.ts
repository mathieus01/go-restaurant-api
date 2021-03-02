import { OrderDbRepository } from './order-db-repository'
import { Account, Food, Order, Type } from '@/infra/models'
import { mockAccountModel, mockAddAccountModel, mockAddOrderParams } from '@/domain/test'

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
    test('should add an order on success', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id, account_id: accountModel.id })
      const { address, observation, date } = mockAddOrderParams()
      const account2 = await Account.create(mockAddAccountModel())
      const sut = new OrderDbRepository()
      const order = await sut.add({ status: 'RECEBIDO', address, observation, date, account_id: account2.id, food_id: foodModel.id })
      expect(order).toBeTruthy()
    })
  })

  describe('loadOrdersByUser', () => {
    test('Should load a list of orders by user', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const account2 = await Account.create(mockAddAccountModel())
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id, account_id: accountModel.id })
      const { address, observation, date } = mockAddOrderParams()
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account2.id, food_id: foodModel.id })
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account2.id, food_id: foodModel.id })
      const sut = new OrderDbRepository()
      const orders = await sut.loadOrdersByUser(account2.id)
      expect(orders).toBeTruthy()
      expect(orders.length).toEqual(2)
    })
  })
  describe('updateOrderStatus', () => {
    test('Should update order status', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const account2 = await Account.create(mockAddAccountModel())
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id, account_id: accountModel.id })
      const { address, observation, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account2.id, food_id: foodModel.id })
      const sut = new OrderDbRepository()
      await sut.updateOrderStatus(order.id, 'ENTREGUE')

      const updatedOrder = await Order.findOne({
        where: {
          id: order.id
        }
      })

      expect(updatedOrder).toBeTruthy()
      expect(updatedOrder.status).toEqual('ENTREGUE')
    })
  })
  describe('loadById', () => {
    test('Should load a order by id', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const account2 = await Account.create(mockAddAccountModel())
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id, account_id: accountModel.id })
      const { address, observation, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account2.id, food_id: foodModel.id })
      const sut = new OrderDbRepository()
      const findedOrder = await sut.loadById(order.id)

      expect(findedOrder).toBeTruthy()
      expect(findedOrder.id).toEqual(order.id)
    })
  })
})
