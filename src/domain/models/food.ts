import { TypeModel } from './type'

export interface FoodModel {
  id?: number
  food: string
  type?: TypeModel
  price: number
}
