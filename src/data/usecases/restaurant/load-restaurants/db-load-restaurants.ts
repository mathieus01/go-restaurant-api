import { LoadRestaurantsRepository } from '@/data/protocols/db'
import { RestaurantModel } from '@/domain/models'
import { LoadRestaurants } from '@/domain/usecases'

export class DbLoadRestaurants implements LoadRestaurants {
  constructor (private readonly loadRestaurantsRepository: LoadRestaurantsRepository) {}

  async loadAll (): Promise<RestaurantModel[]> {
    const restaurants = await this.loadRestaurantsRepository.loadAll()
    return restaurants || []
  }
}
