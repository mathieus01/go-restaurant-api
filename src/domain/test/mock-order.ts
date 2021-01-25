import { OrderModel } from '../models/order'
import { addOrderParams } from '../usecases/order/add-order'
import { mockAccountModel } from './mock-account'
import { mockFoodModel } from './mock-menu'

export const mockOrderModel = (): OrderModel => ({
  account: mockAccountModel(),
  food: mockFoodModel(),
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})

export const mockAddOrderParams = (): addOrderParams => ({
  account_id: 1,
  food_id: 1,
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})
