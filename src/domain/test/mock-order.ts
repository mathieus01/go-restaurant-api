import { OrderModel } from '@/domain/models'
import { addOrderParams } from '@/domain/usecases'
import { mockAccountModel, mockFoodModel } from '@/domain/test'

export const mockOrderModel = (): OrderModel => ({
  account: mockAccountModel(),
  food: mockFoodModel(),
  address: 'any_address',
  date: new Date('2021-02-16T00:00:00'),
  observation: 'any_observation'
})

export const mockAddOrderParams = (): addOrderParams => ({
  account_id: 1,
  food_id: 1,
  address: 'any_address',
  date: new Date('2021-02-16T00:00:00'),
  observation: 'any_observation'
})
