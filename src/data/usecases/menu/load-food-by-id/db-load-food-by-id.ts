import { LoadFoodByIdRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { LoadFoodById } from '@/domain/usecases'

export class DbLoadFoodById implements LoadFoodById {
  constructor (private readonly loadFoodByIdRepository: LoadFoodByIdRepository) {}

  async loadById (foodId: number): Promise<FoodModel> {
    const food = await this.loadFoodByIdRepository.loadById(foodId)
    return food
  }
}
