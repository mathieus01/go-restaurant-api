import { FoodModel } from '@/domain/models/foods'
import { TypeModel } from '@/domain/models/types'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Order from './order-model'

class Food extends Model implements FoodModel {
  id?: number
  food: string
  type?: TypeModel
  price: number
}

Food.init({
  food: DataTypes.STRING,
  type_id: DataTypes.INTEGER,
  price: DataTypes.DOUBLE
}, {
  sequelize: DbHelper.connection,
  tableName: 'foods'
})

Food.hasMany(Order, { as: 'orders' })
Order.belongsTo(Food, { as: 'food' })

export default Food
