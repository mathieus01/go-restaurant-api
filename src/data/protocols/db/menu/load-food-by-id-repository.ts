import { FoodModel } from '@/domain/models/food'

export interface LoadFoodByIdRepository {
  loadById(id: number): Promise<FoodModel>
}
