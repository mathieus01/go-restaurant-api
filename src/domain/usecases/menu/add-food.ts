import { FoodModel } from '@/domain/models/food'

export interface AddTypeParams {
  id?: number
  description: string
}

export interface AddFoodParams {
  name: string
  description: string
  avatar?: string
  type?: AddTypeParams
  restaurantId: number
  price?: number
}

export interface AddFoodRequestParams {
  name: string
  description: string
  avatar?: string
  type?: string
  price?: number
  restaurantId: number
}

export interface AddFood {
  add(addfoodParams: AddFoodRequestParams): Promise<FoodModel>
}
