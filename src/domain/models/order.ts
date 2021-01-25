import { AccountModel } from './account'
import { FoodModel } from './foods'

export interface OrderModel {
  id?: number
  food?: FoodModel
  observation?: string
  date: Date
  address: string
  account?: AccountModel
  status?: string
}
