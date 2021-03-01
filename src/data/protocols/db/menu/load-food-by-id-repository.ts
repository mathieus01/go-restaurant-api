import { FoodModel } from '@/domain/models'

export interface LoadFoodByIdRepository {
  loadById(id: number): Promise<FoodModel>
}
