import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddSizeParams } from '@/domain/usecases/menu/add-food'
import Knex from 'knex'
import { DbHelper } from '../../helpers/db-helper'

export class SizeDbRepository implements AddSizeRepository {
  async add (addSizeParams: AddSizeParams): Promise<number> {
    const db: Knex = await DbHelper.connect()
    const id = await db('sizes').insert(addSizeParams).returning('id')
    return id[0]
  }
}
