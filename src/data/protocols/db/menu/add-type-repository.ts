import { TypeModel } from '@/domain/models'
import { AddTypeParams } from '@/domain/usecases'

export interface AddTypeRepository {
  add (addTypeParams: AddTypeParams): Promise<TypeModel>
}
