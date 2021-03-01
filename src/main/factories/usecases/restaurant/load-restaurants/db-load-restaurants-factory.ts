import { DbLoadRestaurants } from '@/data/usecases'
import { LoadRestaurants } from '@/domain/usecases'
import { RestaurantDbRepository } from '@/infra/db'

export const makeDbLoadRestaurants = (): LoadRestaurants => {
  const restaurantDbRepository = new RestaurantDbRepository()
  return new DbLoadRestaurants(restaurantDbRepository)
}
