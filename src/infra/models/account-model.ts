import { AccountModel } from '@/domain/models/account'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Account extends Model implements AccountModel {
  id?: number
  name: string
  email: string
  password: string
  token?: string
}

Account.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  sequelize: DbHelper.connection,
  tableName: 'accounts'
})

export default Account
