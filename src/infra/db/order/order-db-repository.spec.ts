import { OrderDbRepository } from './order-db-repository'
import { Account, Food, Order, Type } from '@/infra/models'
import { mockAccountModel, mockAddAccountModel, mockAddOrderParams } from '@/domain/test'
import { FoodModel } from '@/domain/models'

const makeAddFood = async (): Promise<FoodModel> => {
  const restaurant = mockAccountModel()
  restaurant.isRestaurant = true
  restaurant.description = 'any_description'
  const accountModel = await Account.create(restaurant)
  const typeModel = await Type.create({ description: 'any_description' })
  const foodModel = await Food.create({ name: 'any_food1', description: 'any_description', price: 30, type_id: typeModel.id, account_id: accountModel.id })
  return foodModel
}

describe('OrderDbRepository', () => {
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
      const foodModel = await makeAddFood()
      const { address, status, date } = mockAddOrderParams()
      const account = await Account.create(mockAddAccountModel())
      const sut = new OrderDbRepository()
      const order = await sut.add({
        address,
        status,
        date,
        accountId: account.id,
        foodsOrder: [{
          amount: 1,
          food_id: foodModel.id,
          observation: 'any_observation'
        }]
      })
      expect(order).toBeTruthy()
    })
  })

  describe('loadOrdersByUser', () => {
    test('Should load a list of orders by user', async () => {
      const foodModel = await makeAddFood()
      const account2 = await Account.create(mockAddAccountModel())
      const { address, date } = mockAddOrderParams()
      await Order.create({ status: 'RECEBIDO', address, date, account_id: account2.id, food_id: foodModel.id })
      await Order.create({ status: 'RECEBIDO', address, date, account_id: account2.id, food_id: foodModel.id })
      const sut = new OrderDbRepository()
      const orders = await sut.loadOrdersByUser(account2.id)
      expect(orders).toBeTruthy()
      expect(orders.length).toEqual(2)
    })
  })
  describe('updateOrderStatus', () => {
    test('Should update order status', async () => {
      const foodModel = await makeAddFood()
      const account2 = await Account.create(mockAddAccountModel())
      const { address, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, date, account_id: account2.id, food_id: foodModel.id })
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
      const foodModel = await makeAddFood()

      const account2 = await Account.create(mockAddAccountModel())
      const { address, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, date, account_id: account2.id, food_id: foodModel.id })
      const sut = new OrderDbRepository()
      const findedOrder = await sut.loadById(order.id)

      expect(findedOrder).toBeTruthy()
      expect(findedOrder.id).toEqual(order.id)
    })
  })
})
