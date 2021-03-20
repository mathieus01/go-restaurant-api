import { FoodModel } from './food'

export interface RestaurantModel {
  id: number
  name: string
  description: string
  address: string

  foods?: FoodModel[]
  avatar?: string
  cover?: string
  type?: string
}
