import { AddTypeRepository, LoadTypeRepository } from '@/data/protocols/db'
import { TypeModel } from '@/domain/models'
import { AddTypeParams } from '@/domain/usecases'
import { Type } from '@/infra/models'

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
