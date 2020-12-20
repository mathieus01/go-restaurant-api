import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { AddTypeParams } from '@/domain/usecases/menu/add-food'
import Knex from 'knex'
import { DbHelper } from '../../helpers/db-helper'

export class TypeDbRepository implements AddTypeRepository {
  async add (addTypeParams: AddTypeParams): Promise<number> {
    const db: Knex = await DbHelper.connect()
    const id = await db('types').insert(addTypeParams).returning('id')
    return id[0]
  }
}
