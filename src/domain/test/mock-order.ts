import { OrderModel } from '../models/order'
import { addOrderParams } from '../usecases/order/add-order'

export const mockOrderModel = (): OrderModel => ({
  account_id: 1,
  size_food_id: 1,
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})

export const mockAddOrderParams = (): addOrderParams => ({
  account_id: 1,
  size_food_id: 1,
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})
