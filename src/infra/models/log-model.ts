import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'

class Log extends Model {
}

Log.init({
  stack: DataTypes.STRING,
  date: DataTypes.DATE
}, {
  sequelize: DbHelper.connection,
  tableName: 'logs'
})

export default Log
