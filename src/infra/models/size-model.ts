import { SizeModel } from '@/domain/models/sizes'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Order from './order-model'

class Size extends Model implements SizeModel {
  id?: number
  size: string
}

Size.init({
  size: DataTypes.STRING,
  price: DataTypes.FLOAT,
  type_id: DataTypes.INTEGER
}, {
  sequelize: DbHelper.connection,
  tableName: 'sizes'
})

Size.hasMany(Order, { as: 'orders' })
Order.belongsTo(Size, { as: 'size' })

export default Size
