import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { FoodModel } from '@/domain/models/foods'
import { LoadFoodById } from '@/domain/usecases/menu/load-food-by-id'

export class DbLoadFoodById implements LoadFoodById {
  constructor (private readonly loadFoodByIdRepository: LoadFoodByIdRepository) {}

  async loadById (foodId: number): Promise<FoodModel> {
    const food = await this.loadFoodByIdRepository.loadById(foodId)
    return food
  }
}
