import { DbAddFood } from '@/data/usecases/menu/add-food/db-add-food'
import { AddFood } from '@/domain/usecases/menu/add-food'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'
import { TypeDbRepository } from '@/infra/db/menu/type/type-db-repository'

export const makeDbAddFood = (): AddFood => {
  const foodDbRepository = new FoodDbRepository()
  const typeDbRepository = new TypeDbRepository()
  return new DbAddFood(foodDbRepository, typeDbRepository, typeDbRepository)
}
