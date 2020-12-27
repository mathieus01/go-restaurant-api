import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodByIdRepository {
  loadById(id: number): Promise<FoodModel>
}
