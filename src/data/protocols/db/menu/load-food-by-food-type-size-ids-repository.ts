import { FoodModel } from '@/domain/models/food'

export interface LoadFoodByFoodTypeAndSizeIdsRepository {
  loadFoodByFoodTypeAndSizeIds(sizeFoodId: number): Promise<FoodModel>
}
