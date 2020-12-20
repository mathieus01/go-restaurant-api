import { AddSizeParams } from '@/domain/usecases/menu/add-food'

export interface AddSizeRepository {
  add(addSizeParams: AddSizeParams): Promise<number>
}
