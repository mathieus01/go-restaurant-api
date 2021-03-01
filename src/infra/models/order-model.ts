import { AccountModel } from '@/domain/models/account'
import { FoodModel } from '@/domain/models/food'
import { OrderModel } from '@/domain/models/order'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Order extends Model implements OrderModel {
  id?: number
  food: FoodModel
  observation?: string
  date: Date
  address: string
  account: AccountModel
  status?: string
}

Order.init({
  observation: DataTypes.STRING,
  date: DataTypes.DATE,
  address: DataTypes.STRING,
  status: DataTypes.STRING,
  account_id: DataTypes.INTEGER,
  food_id: DataTypes.INTEGER
}, {
  sequelize: DbHelper.connection,
  tableName: 'orders'
})

export default Order
