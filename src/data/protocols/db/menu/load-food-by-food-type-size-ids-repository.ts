import { FoodModel } from '@/domain/models'

export interface LoadFoodByFoodTypeAndSizeIdsRepository {
  loadFoodByFoodTypeAndSizeIds(sizeFoodId: number): Promise<FoodModel>
}
