import { OrderModel } from '../models/order'
import { addOrderParams } from '../usecases/order/add-order'

export const mockOrderModel = (): OrderModel => ({
  user_id: 1,
  sizeFood_id: 1,
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})

export const mockAddOrderParams = (): addOrderParams => ({
  user_id: 1,
  sizeFood_id: 1,
  address: 'any_address',
  date: new Date(),
  observation: 'any_observation'
})
