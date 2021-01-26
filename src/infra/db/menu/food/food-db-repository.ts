import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { LoadFoodsRepository } from '@/data/protocols/db/menu/load-foods-repository'
import { RemoveFoodRepository } from '@/data/protocols/db/menu/remove-food-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'
import Food from '@/infra/models/food-model'

export class FoodDbRepository implements AddFoodRepository, LoadFoodByIdRepository, LoadFoodsRepository, RemoveFoodRepository {
  async add (addFoodParams: AddFoodParams): Promise<FoodModel> {
    const { food, type, price } = addFoodParams
    const foodModel = await Food.create({ food, price, type_id: type.id })
    return foodModel
  }

  async loadById (id: number): Promise<FoodModel> {
    const foodModel = await Food.findByPk(id)
    return foodModel
  }

  async loadAllFoods (): Promise<FoodModel[]> {
    const foods = await Food.findAll({ order: [['food', 'ASC']] })
    return foods
  }

  async remove (foodId: number): Promise<void> {
    await Food.destroy({
      where: {
        id: foodId
      }
    })
  }
}
