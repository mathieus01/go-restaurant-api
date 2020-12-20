import { AddTypeParams } from '@/domain/usecases/menu/add-food'

export interface AddTypeRepository {
  add (addTypeParams: AddTypeParams): Promise<number>
}
