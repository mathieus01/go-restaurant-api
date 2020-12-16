import { FoodModel } from '../models/foods'
import { SizeModel } from '../models/sizes'
import { TypeModel } from '../models/types'
import { AddFoodParams } from '../usecases/menu/add-food'

export const mockSizeModel = (): SizeModel => ({
  id: 1,
  size: 'any_size'
})

export const mockTypeModel = (): TypeModel => ({
  id: 1,
  flavor: 'any_flavor',
  size: mockSizeModel()
})

export const mockFoodModel = (): FoodModel => ({
  id: 1,
  food: 'any_food',
  type: mockTypeModel()
})

export const mockAddFoodParams = (): AddFoodParams => ({
  food: 'any_food',
  type: {
    flavor: 'any_flavor',
    sizes: [{
      size: 'any_size',
      cost: 70.00
    }]
  }
})
