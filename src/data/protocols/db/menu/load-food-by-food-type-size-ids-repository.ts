import { FoodModel } from '@/domain/models/foods'

export interface LoadFoodByFoodTypeAndSizeIdsRepository {
  load(sizeFoodId: number): Promise<FoodModel>
}
