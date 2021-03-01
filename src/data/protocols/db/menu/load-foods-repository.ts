import { FoodModel } from '@/domain/models/food'

export interface LoadFoodsRepository {
  loadAllFoods(): Promise<FoodModel[]>
}
