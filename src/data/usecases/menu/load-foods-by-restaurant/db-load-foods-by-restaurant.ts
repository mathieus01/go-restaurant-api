import { LoadFoodsByRestaurantRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { LoadFoodsByRestaurant } from '@/domain/usecases'

export class DbLoadFoodsByRestaurant implements LoadFoodsByRestaurant {
  constructor (private readonly loadFoodsByRestaurantRepository: LoadFoodsByRestaurantRepository) {}

  async load (restaurantId: number): Promise<FoodModel[]> {
    const foods = await this.loadFoodsByRestaurantRepository.loadByRestaurant(restaurantId)
    return foods || []
  }
}
