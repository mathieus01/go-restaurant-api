import { FoodOrderModel, OrderModel, FoodModel } from '@/domain/models'
import { Model, DataTypes } from 'sequelize'
import { Food, Order } from '.'
import DbHelper from '../db/helpers/db-helper'

class FoodOrder extends Model implements FoodOrderModel {
  id: number
  food: FoodModel
  order: OrderModel
  amount: number
  observation: string
}

FoodOrder.init({
  amount: DataTypes.INTEGER,
  observation: DataTypes.STRING,
  food_id: DataTypes.INTEGER,
  order_id: DataTypes.INTEGER
}, {
  sequelize: DbHelper.connection,
  tableName: 'food_order'
})

Food.hasMany(FoodOrder, { as: 'foodsOrder' })
FoodOrder.belongsTo(Food, { as: 'food' })
Order.hasMany(FoodOrder, { as: 'foodsOrder' })
FoodOrder.belongsTo(Order, { as: 'order' })

export default FoodOrder
