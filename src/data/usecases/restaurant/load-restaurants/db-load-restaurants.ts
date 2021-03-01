import { LoadRestaurantsRepository } from '@/data/protocols/db/restaurant/load-restaurants-repository'
import { RestaurantModel } from '@/domain/models/restaurant'
import { LoadRestaurants } from '@/domain/usecases/restaurant/load-restaurants'

export class DbLoadRestaurants implements LoadRestaurants {
  constructor (private readonly loadRestaurantsRepository: LoadRestaurantsRepository) {}

  async loadAll (): Promise<RestaurantModel[]> {
    const restaurants = await this.loadRestaurantsRepository.loadAll()
    return restaurants || []
  }
}
