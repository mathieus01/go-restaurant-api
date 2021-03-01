import { AccountModel } from './account'
import { FoodModel } from './food'

export interface OrderModel {
  id?: number
  food?: FoodModel
  observation?: string
  date: Date
  address: string
  account?: AccountModel
  status?: string
}
