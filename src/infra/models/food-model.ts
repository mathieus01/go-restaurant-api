import { FoodModel, TypeModel, AccountModel } from '@/domain/models'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import { Order } from './'

class Food extends Model implements FoodModel {
  id?: number
  food: string
  type?: TypeModel
  account: AccountModel
  price: number
}

Food.init({
  food: DataTypes.STRING,
  type_id: DataTypes.INTEGER,
  account_id: DataTypes.INTEGER,
  price: DataTypes.DOUBLE
}, {
  sequelize: DbHelper.connection,
  tableName: 'foods'
})

Food.hasMany(Order, { as: 'orders' })
Order.belongsTo(Food, { as: 'food' })

export default Food
