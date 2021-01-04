import { FoodModel } from '@/domain/models/foods'
import { Model, DataTypes } from 'sequelize'
import DbHelper from '../db/helpers/db-helper'
import Type from './type-model'

class Food extends Model implements FoodModel {
  id?: number
  food: string
}

Food.init({
  food: DataTypes.STRING
}, {
  sequelize: DbHelper.connection,
  tableName: 'foods'
})

Food.hasMany(Type, { as: 'types' })
Type.belongsTo(Food, { as: 'food', foreignKey: 'food_id' })

export default Food
