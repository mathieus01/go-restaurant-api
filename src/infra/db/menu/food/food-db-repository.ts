import { AddFoodRepository, LoadFoodByIdRepository, LoadFoodsByRestaurantRepository, RemoveFoodRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { AddFoodParams } from '@/domain/usecases'
import { Food } from '@/infra/models'

export class FoodDbRepository implements AddFoodRepository, LoadFoodByIdRepository, LoadFoodsByRestaurantRepository, RemoveFoodRepository {
  async add (addFoodParams: AddFoodParams): Promise<FoodModel> {
    const { name, description, type, price, restaurantId } = addFoodParams
    const foodModel = await Food.create({ name, description, price, type_id: type.id, account_id: restaurantId })
    return foodModel
  }

  async loadById (id: number): Promise<FoodModel> {
    const foodModel = await Food.findByPk(id)
    return foodModel
  }

  async loadByRestaurant (restaurantId: number): Promise<FoodModel[]> {
    const foods = await Food.findAll({ order: [['name', 'ASC']], include: 'restaurant' })
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
