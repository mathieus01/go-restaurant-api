import { FoodModel } from './foods'
import { SizeModel } from './sizes'

export interface TypeModel {
  id?: number
  flavor: string
  size: SizeModel
  foodId: FoodModel
}
