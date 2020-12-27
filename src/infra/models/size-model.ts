import { SizeModel } from '@/domain/models/sizes'
import { Model, DataTypes } from 'sequelize'
import Type from './type-model'
import DbHelper from '../db/helpers/db-helper'

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

Size.belongsTo(Type, { as: 'type', foreignKey: 'type_id' })

export default Size
