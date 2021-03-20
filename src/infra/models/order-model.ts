import { FoodOrderModel, AccountModel, OrderModel } from '@/domain/models'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Order extends Model implements OrderModel {
  id?: number
  date: Date
  address: string
  status?: string
  foodsOrder?: FoodOrderModel[]
  account?: AccountModel
}

Order.init({
  date: DataTypes.DATE,
  address: DataTypes.STRING,
  status: DataTypes.STRING,
  account_id: DataTypes.INTEGER
}, {
  sequelize: DbHelper.connection,
  tableName: 'orders'
})

export default Order
