import { RestaurantModel } from '@/domain/models/restaurant'

export interface LoadRestaurantsRepository {
  loadAll(): Promise<RestaurantModel[]>
}
