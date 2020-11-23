import { FoodModel } from '@/domain/models/foods'

export interface AddSizeParams {
  size: string
  cost: number
}

export interface AddTypeParams {
  flavor: string
}

export interface AddFoodParams {
  food: string
  types: AddTypeParams[]
  sizes: AddSizeParams[]
}

export interface AddFood {
  add(foodParams: AddFoodParams): Promise<FoodModel>
}
