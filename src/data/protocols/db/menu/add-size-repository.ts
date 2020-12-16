import { SizeModel } from '@/domain/models/sizes'
import { AddSizeParams } from '@/domain/usecases/menu/add-food'

export interface AddSizeRepository {
  add(addSizeParams: AddSizeParams): Promise<SizeModel>
}
