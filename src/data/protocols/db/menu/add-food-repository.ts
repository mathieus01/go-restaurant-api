import { FoodModel } from '@/domain/models'
import { AddFoodParams } from '@/domain/usecases'

export interface AddFoodRepository {
  add(addFoodParams: AddFoodParams): Promise<FoodModel>
}
