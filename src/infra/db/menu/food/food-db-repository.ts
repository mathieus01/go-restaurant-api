import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { LoadFoodRepository } from '@/data/protocols/db/menu/load-food-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'
import Food from '@/infra/models/food-model'

export class FoodDbRepository implements AddFoodRepository, LoadFoodRepository {
  async add (addFoodParams: AddFoodParams): Promise<number> {
    const food = await Food.create(addFoodParams)
    return food.id
  }

  async loadById (id: number): Promise<FoodModel> {
    const foodModel = await Food.findByPk(id)
    return foodModel
  }
}
