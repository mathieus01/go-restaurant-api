import { FoodModel } from '@/domain/models/food'

export interface LoadFoodById {
  loadById(foodId: number): Promise<FoodModel>
}
