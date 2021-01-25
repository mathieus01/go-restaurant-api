import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadTypeRepository } from '@/data/protocols/db/menu/load-type-repository'
import { TypeModel } from '@/domain/models/types'
import { AddTypeParams } from '@/domain/usecases/menu/add-food'
import Type from '@/infra/models/type-model'

export class TypeDbRepository implements AddTypeRepository, LoadTypeRepository {
  async add (addTypeParams: AddTypeParams): Promise<TypeModel> {
    const { description } = addTypeParams
    const typeModel = await Type.create({ description: description.toUpperCase() })
    return typeModel
  }

  async loadByDescription (description: string): Promise<TypeModel> {
    const typeModel = await Type.findOne({
      where: {
        description
      }
    })
    return typeModel
  }
}
