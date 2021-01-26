import { DbRemoveFood } from '@/data/usecases/menu/remove-food/db-remove-food'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'

export const makeDbRemoveFood = (): DbRemoveFood => {
  const foodDbRepository = new FoodDbRepository()
  return new DbRemoveFood(foodDbRepository)
}
