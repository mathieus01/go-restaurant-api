import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { LoadFoodByFoodTypeAndSizeIdsRepository } from '@/data/protocols/db/menu/load-food-by-food-type-size-ids-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'
import Food from '@/infra/models/food-model'
import Size from '@/infra/models/size-model'
import Type from '@/infra/models/type-model'

export class FoodDbRepository implements AddFoodRepository, LoadFoodByIdRepository, LoadFoodByFoodTypeAndSizeIdsRepository {
  async add (addFoodParams: AddFoodParams): Promise<number> {
    const food = await Food.create(addFoodParams)
    return food.id
  }

  async loadById (id: number): Promise<FoodModel> {
    const foodModel = await Food.findByPk(id)
    return foodModel
  }

  async loadFoodByFoodTypeAndSizeIds (sizeFoodId: number): Promise<FoodModel> {
    const food = await Food.findOne({
      include: [{
        model: Type,
        as: 'types',
        include: [{
          model: Size,
          as: 'sizes',
          where: { id: sizeFoodId }
        }]
      }]
    })
    return food
  }
}
