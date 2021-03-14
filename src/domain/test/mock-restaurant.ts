import { RestaurantModel } from '@/domain/models'

export const mockRestaurantModel = (): RestaurantModel => ({
  id: 1,
  name: 'any_name',
  description: 'any_description',
  address: 'any_address',
  avatar: 'any_avatar',
  cover: 'any_cover',
  type: 'any_type'
})

export const mockRestaurantsModelList = (): RestaurantModel[] => [mockRestaurantModel()]
