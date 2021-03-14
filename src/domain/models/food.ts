import { AccountModel } from './account'
import { TypeModel } from './type'

export interface FoodModel {
  id?: number
  name: string
  description: string
  avatar?: string
  type?: TypeModel
  account?: AccountModel
  price: number
}
