import { FoodOrderModel } from '@/domain/models'
import { AddFoodOrderParams } from '@/domain/usecases'

export interface AddFoodsOrdersRepository {
  add(foodsOrdersParams: AddFoodOrderParams[]): Promise<FoodOrderModel[]>
}
