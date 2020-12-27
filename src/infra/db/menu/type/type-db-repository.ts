import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { AddTypeParams } from '@/domain/usecases/menu/add-food'
import Type from '@/infra/models/type-model'

export class TypeDbRepository implements AddTypeRepository {
  async add (addTypeParams: AddTypeParams): Promise<number> {
    const typeModel = await Type.create(addTypeParams)
    return typeModel.id
  }
}
