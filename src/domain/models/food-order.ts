import { FoodModel } from './food'
import { OrderModel } from './order'

export interface FoodOrderModel {
  id: number
  food: FoodModel
  order: OrderModel
  amount: number
  observation: string
}
