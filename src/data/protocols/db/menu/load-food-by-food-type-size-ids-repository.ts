import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodByFoodTypeAndSizeIdsRepository {
  loadFoodByFoodTypeAndSizeIds(sizeFoodId: number): Promise<FoodModel>
}
