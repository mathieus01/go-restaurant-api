import { FoodModel, TypeModel } from '@/domain/models'
import { AddFoodParams, AddFoodRequestParams, AddTypeParams } from '@/domain/usecases'

export const mockTypeModel = (): TypeModel => ({
  id: 1,
  description: 'any_description'
})
export const mockAddTypeParams = (): AddTypeParams => ({
  description: 'any_description'
})

export const mockFoodModel = (): FoodModel => ({
  id: 1,
  food: 'any_food',
  type: mockTypeModel(),
  price: 30.00
})

export const mockAddFoodRequestParams = (): AddFoodRequestParams => ({
  food: 'any_food',
  type: 'any_description',
  price: 30.00,
  restaurantId: 1
})
export const mockAddFoodParams = (): AddFoodParams => ({
  food: 'any_food',
  type: mockTypeModel(),
  price: 30.00,
  restaurantId: 1
})

export const mockAddFoodParamsWithoutPrice = (): AddFoodRequestParams => ({
  food: 'any_food',
  type: 'PIZZA',
  restaurantId: 1
})
