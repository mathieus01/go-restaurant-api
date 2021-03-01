import { FoodModel } from '@/domain/models/food'

export interface LoadFoods {
  load(): Promise<FoodModel[]>
}
