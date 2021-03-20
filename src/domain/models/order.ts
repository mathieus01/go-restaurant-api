import { AccountModel } from './account'
import { FoodOrderModel } from './food-order'

export interface OrderModel {
  id?: number
  date: Date
  address: string
  status?: string
  foodsOrder?: FoodOrderModel[]
  account?: AccountModel
}
