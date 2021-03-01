import { AddFoodRepository, LoadFoodByIdRepository, LoadFoodsRepository, RemoveFoodRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { AddFoodParams } from '@/domain/usecases'
import { Food } from '@/infra/models'

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
