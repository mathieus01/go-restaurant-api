import { TypeModel } from '@/domain/models/types'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Food from './food-model'

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

Type.belongsTo(Food, { as: 'food', foreignKey: 'food_id' })

export default Type
