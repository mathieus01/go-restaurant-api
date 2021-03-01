import { mockRestaurantsModelList } from '@/domain/test'
import { LoadRestaurantsRepository } from '@/data/protocols/db'
import { RestaurantModel } from '@/domain/models'

export const makeLoadRestaurantsRepositorySpy = (): LoadRestaurantsRepository => {
  class LoadRestaurantsRepositorySpy implements LoadRestaurantsRepository {
    async loadAll (): Promise<RestaurantModel[]> {
      return Promise.resolve(mockRestaurantsModelList())
    }
  }
  return new LoadRestaurantsRepositorySpy()
}
