import { FoodModel } from '@/domain/models/foods'

export interface AddSizeParams {
  size: string
  type_id?: number
  price?: number
}

export interface AddTypeParams {
  flavor: string
  sizes?: AddSizeParams[]
  food_id?: number
}

export interface AddFoodParams {
  food: string
  type?: AddTypeParams
}

export interface AddFood {
  add(addfoodParams: AddFoodParams): Promise<FoodModel>
}
