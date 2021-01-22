import { DbLoadFoods } from '@/data/usecases/menu/load-foods/db-load-foods'
import { LoadFoods } from '@/domain/usecases/menu/load-foods'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'

export const makeDbLoadFoods = (): LoadFoods => {
  const foodDbRepository = new FoodDbRepository()
  return new DbLoadFoods(foodDbRepository)
}
