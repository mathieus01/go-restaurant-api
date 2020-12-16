import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodRepository {
  loadById(id: number): Promise<FoodModel>
}
