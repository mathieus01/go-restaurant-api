import { SizeModel } from './sizes'

export interface TypeModel {
  id?: number
  flavor: string
  size: SizeModel
  foodId?: number
}
