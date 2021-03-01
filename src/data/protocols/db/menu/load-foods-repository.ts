import { FoodModel } from '@/domain/models'

export interface LoadFoodsRepository {
  loadAllFoods(): Promise<FoodModel[]>
}
