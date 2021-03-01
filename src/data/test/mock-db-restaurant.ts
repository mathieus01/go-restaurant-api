import { RestaurantModel } from '@/domain/models/restaurant'
import { mockRestaurantsModelList } from '@/domain/test/mock-restaurant'
import { LoadRestaurantsRepository } from '../protocols/db/restaurant/load-restaurants-repository'

export const makeLoadRestaurantsRepositorySpy = (): LoadRestaurantsRepository => {
  class LoadRestaurantsRepositorySpy implements LoadRestaurantsRepository {
    async loadAll (): Promise<RestaurantModel[]> {
      return Promise.resolve(mockRestaurantsModelList())
    }
  }
  return new LoadRestaurantsRepositorySpy()
}
