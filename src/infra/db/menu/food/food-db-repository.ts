import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'
import Food from '@/infra/models/food-model'

export class FoodDbRepository implements AddFoodRepository, LoadFoodByIdRepository {
  async add (addFoodParams: AddFoodParams): Promise<number> {
    const food = await Food.create(addFoodParams)
    return food.id
  }

  async loadById (id: number): Promise<FoodModel> {
    const foodModel = await Food.findByPk(id)
    return foodModel
  }
}
