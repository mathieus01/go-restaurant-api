import { TypeModel } from '@/domain/models/types'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Size from './size-model'

class Type extends Model implements TypeModel {
  id?: number
  flavor: string
  food_id?: number
}

Type.init({
  flavor: DataTypes.STRING,
  food_id: DataTypes.INTEGER
}, {
  sequelize: DbHelper.connection,
  tableName: 'types'
})

Type.hasMany(Size, { as: 'sizes' })
Size.belongsTo(Type, { as: 'type', foreignKey: 'type_id' })

export default Type
