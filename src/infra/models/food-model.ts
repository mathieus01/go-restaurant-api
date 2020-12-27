import { FoodModel } from '@/domain/models/foods'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Food extends Model implements FoodModel {
  id?: number
  food: string
}

Food.init({
  food: DataTypes.STRING
}, {
  sequelize: DbHelper.connection,
  tableName: 'foods'
})

export default Food
