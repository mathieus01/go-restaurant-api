import { RestaurantModel } from '../models/restaurant'

export const mockRestaurantModel = (): RestaurantModel => ({
  id: 1,
  name: 'any_name',
  description: 'any_description',
  address: 'any_address'
})

export const mockRestaurantsModelList = (): RestaurantModel[] => [mockRestaurantModel()]
