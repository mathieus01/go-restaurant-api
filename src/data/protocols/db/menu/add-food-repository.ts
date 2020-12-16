import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'

export interface AddFoodRepository {
  add(addFoodParams: AddFoodParams): Promise<FoodModel>
}
