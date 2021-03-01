import { RestaurantModel } from '@/domain/models'

export interface LoadRestaurantsRepository {
  loadAll(): Promise<RestaurantModel[]>
}
