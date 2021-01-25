import { FoodModel } from '@/domain/models/foods'

export interface AddTypeParams {
  id?: number
  description: string
}

export interface AddFoodParams {
  food?: string
  type?: AddTypeParams
  price?: number
}

export interface AddFoodRequestParams {
  food?: string
  type?: string
  price?: number
}

export interface AddFood {
  add(addfoodParams: AddFoodRequestParams): Promise<FoodModel>
}
