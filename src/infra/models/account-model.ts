import { AccountModel } from '@/domain/models/account'
import { Model, DataTypes } from 'sequelize'
import { Food, Order } from '.'
import DbHelper from '../db/helpers/db-helper'

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

Account.hasMany(Food, { as: 'foods', foreignKey: 'account_id' })
Food.belongsTo(Account, { as: 'account', foreignKey: 'account_id' })
Account.hasMany(Order, { as: 'orders' })
Order.belongsTo(Account, { as: 'account' })

export default Account
