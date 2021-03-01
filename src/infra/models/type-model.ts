import { TypeModel } from '@/domain/models/type'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Food from './food-model'

class Type extends Model implements TypeModel {
  id?: number
  description: string
}

Type.init({
  description: DataTypes.STRING
}, {
  sequelize: DbHelper.connection,
  tableName: 'types'
})

Type.hasMany(Food, { as: 'foods' })
Food.belongsTo(Type, { as: 'type', foreignKey: 'type_id' })

export default Type
