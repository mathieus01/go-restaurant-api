import { FoodModel } from '@/domain/models/foods'

export interface LoadFoods {
  load(): Promise<FoodModel[]>
}
