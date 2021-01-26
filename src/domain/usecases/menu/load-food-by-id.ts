import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodById {
  loadById(foodId: number): Promise<FoodModel>
}
