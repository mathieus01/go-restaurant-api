import { AccountModel } from './account'
import { TypeModel } from './type'

export interface FoodModel {
  id?: number
  food: string
  type?: TypeModel
  account?: AccountModel
  price: number
}
