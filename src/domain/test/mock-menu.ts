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
  name: 'any_food',
  description: 'any_description',
  type: mockTypeModel(),
  price: 30.00
})

export const mockAddFoodRequestParams = (): AddFoodRequestParams => ({
  name: 'any_food',
  description: 'any_description',
  type: 'any_description',
  avatar: 'any_image',
  price: 30.00,
  restaurantId: 1
})
export const mockAddFoodParams = (): AddFoodParams => ({
  name: 'any_food',
  description: 'any_description',
  type: mockTypeModel(),
  avatar: 'any_image',
  price: 30.00,
  restaurantId: 1
})

export const mockAddFoodParamsWithoutPrice = (): AddFoodRequestParams => ({
  name: 'any_food',
  description: 'any_description',
  type: 'PIZZA',
  restaurantId: 1
})
