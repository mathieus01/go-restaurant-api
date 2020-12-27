import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddSizeParams } from '@/domain/usecases/menu/add-food'
import Size from '@/infra/models/size-model'

export class SizeDbRepository implements AddSizeRepository {
  async add (addSizeParams: AddSizeParams): Promise<number> {
    const sizeModel = await Size.create(addSizeParams)
    return sizeModel.id
  }
}
