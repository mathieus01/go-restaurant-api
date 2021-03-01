import { RestaurantModel } from '@/domain/models/restaurant'

export interface LoadRestaurants {
  loadAll(): Promise<RestaurantModel[]>
}
