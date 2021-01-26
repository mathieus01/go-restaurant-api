import { DbLoadFoodById } from '@/data/usecases/menu/load-food-by-id/db-load-food-by-id'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'

export const makeDbLoadFoodById = (): DbLoadFoodById => {
  const foodDbRepository = new FoodDbRepository()
  return new DbLoadFoodById(foodDbRepository)
}
