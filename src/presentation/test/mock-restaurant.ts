import { RestaurantModel } from '@/domain/models'
import { LoadRestaurants } from '@/domain/usecases'
import { mockRestaurantsModelList } from '@/domain/test'

export const mockLoadRestaurantsSpy = (): LoadRestaurants => {
  class LoadRestaurantsSpy implements LoadRestaurants {
    async loadAll (): Promise<RestaurantModel[]> {
      return Promise.resolve(mockRestaurantsModelList())
    }
  }
  return new LoadRestaurantsSpy()
}
