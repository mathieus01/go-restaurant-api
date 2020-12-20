import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { LoadFoodRepository } from '@/data/protocols/db/menu/load-food-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFoodParams } from '@/domain/usecases/menu/add-food'
import { DbHelper } from '../../helpers/db-helper'

export class FoodDbRepository implements AddFoodRepository, LoadFoodRepository {
  async add (addFoodParams: AddFoodParams): Promise<number> {
    const db = await DbHelper.connect()
    const id = await db('foods').insert(addFoodParams).returning('id')
    return id[0]
  }

  async loadById (id: number): Promise<FoodModel> {
    const db = await DbHelper.connect()
    const foodModel = await db('foods').where({ id }).select()
    return foodModel
  }
}
