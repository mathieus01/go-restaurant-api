import { OrderModel, FoodOrderModel } from '@/domain/models'
import { AddFoodOrderParams, AddOrderParams } from '@/domain/usecases'
import { mockAccountModel, mockFoodModel } from '@/domain/test'

export const mockFoodOrderModel = (): FoodOrderModel => ({
  id: 1,
  food: mockFoodModel(),
  amount: 1,
  observation: 'any_observation',
  order: mockOrderModel()
})

export const mockOrderModel = (): OrderModel => ({
  id: 1,
  date: new Date('2021-02-16T00:00:00'),
  address: 'any_address',
  status: 'any_status',
  foodsOrder: [],
  account: mockAccountModel()
})

export const mockAddFoodOrderParams = (): AddFoodOrderParams => ({
  food_id: 1,
  amount: 1,
  observation: 'any_observation'
})

export const mockAddOrderParams = (): AddOrderParams => ({
  foodsOrder: [mockAddFoodOrderParams()],
  accountId: 1,
  address: 'any_address',
  date: new Date('2021-02-16T00:00:00'),
  status: 'any_status'
})
