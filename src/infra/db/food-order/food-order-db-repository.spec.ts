import { FoodOrderDbRepository } from './food-order-db-repository'
import { Account, Food, Order, Type } from '@/infra/models'
import { mockAccountModel, mockAddAccountModel, mockAddFoodOrderParams, mockAddOrderParams } from '@/domain/test'
import { FoodModel, OrderModel } from '@/domain/models'

interface Props {
  foodModel: FoodModel
  orderModel: OrderModel
}

const makeAddFoodAndAddOrder = async (): Promise<Props> => {
  const restaurant = mockAccountModel()
  restaurant.isRestaurant = true
  restaurant.description = 'any_description'
  const accountModel = await Account.create(restaurant)
  const typeModel = await Type.create({ description: 'any_description' })
  const foodModel = await Food.create({ name: 'any_food1', description: 'any_description', price: 30, type_id: typeModel.id, account_id: accountModel.id })
  const account = await Account.create(mockAddAccountModel())
  const { address, date } = mockAddOrderParams()
  const orderModel = await Order.create({ status: 'RECEBIDO', address, date, account_id: account.id, food_id: foodModel.id })
  return { foodModel, orderModel }
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
      const { foodModel, orderModel } = await makeAddFoodAndAddOrder()
      const addFoodOrderParams = mockAddFoodOrderParams()
      addFoodOrderParams.food_id = foodModel.id
      addFoodOrderParams.order_id = orderModel.id
      const sut = new FoodOrderDbRepository()
      const foodsOrdersModels = await sut.add([addFoodOrderParams])
      expect(foodsOrdersModels).toBeTruthy()
      expect(foodsOrdersModels[0].amount).toBe(1)
      expect(foodsOrdersModels[0].observation).toBe('any_observation')
    })
  })
})
