import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodsRepository {
  loadAllFoods(): Promise<FoodModel[]>
}
