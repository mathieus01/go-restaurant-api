import { FoodModel } from '@/domain/models/foods'

export interface AddSizeParams {
  size: string
  typeId?: number
  cost?: number
}

export interface AddTypeParams {
  flavor: string
  sizes?: AddSizeParams[]
  foodId?: number
}

export interface AddFoodParams {
  food: string
  type?: AddTypeParams
}

export interface AddFood {
  add(addfoodParams: AddFoodParams): Promise<FoodModel>
}
