import { FoodModel } from './food'

export interface AccountModel {
  id?: number
  name: string
  email: string
  password: string
  isRestaurant: boolean
  description?: string
  address?: string
  token?: string

  foods?: FoodModel[]
  avatar?: string
  cover?: string
  type?: string
}
