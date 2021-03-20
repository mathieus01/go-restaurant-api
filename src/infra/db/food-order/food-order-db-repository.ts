import { AddFoodsOrdersRepository } from '@/data/protocols/db'
import { FoodOrderModel } from '@/domain/models'
import { AddFoodOrderParams } from '@/domain/usecases'
import { FoodOrder } from '@/infra/models'

export class FoodOrderDbRepository implements AddFoodsOrdersRepository {
  async add (foodsOrdersParams: AddFoodOrderParams[]): Promise<FoodOrderModel[]> {
    let foodsOrdersList = []
    for (const foodOrderParam of foodsOrdersParams) {
      const foodOrderModel = await FoodOrder.create(foodOrderParam)
      foodsOrdersList = [...foodsOrdersList, foodOrderModel]
    }
    return foodsOrdersList
  }
}
