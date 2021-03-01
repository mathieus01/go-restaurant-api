import { AccountModel } from '@/domain/models/account'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Order from './order-model'

class Account extends Model implements AccountModel {
  id?: number
  name: string
  email: string
  password: string
  token?: string
  isRestaurant: boolean
  description?: string
  address?: string
}

Account.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: DataTypes.STRING,
  isRestaurant: DataTypes.BOOLEAN,
  description: DataTypes.STRING,
  address: DataTypes.STRING
}, {
  sequelize: DbHelper.connection,
  tableName: 'accounts'
})

Account.hasMany(Order, { as: 'orders' })
Order.belongsTo(Account, { as: 'account' })

export default Account
