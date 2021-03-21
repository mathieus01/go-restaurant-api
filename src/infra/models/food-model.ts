import { FoodModel, TypeModel, AccountModel } from '@/domain/models'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Food extends Model implements FoodModel {
  id?: number
  name: string
  description: string
  avatar?: string
  type?: TypeModel
  restaurant: AccountModel
  price: number
}

Food.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  avatar: DataTypes.STRING,
  type_id: DataTypes.INTEGER,
  account_id: DataTypes.INTEGER,
  price: DataTypes.DOUBLE
}, {
  sequelize: DbHelper.connection,
  tableName: 'foods'
})

export default Food
