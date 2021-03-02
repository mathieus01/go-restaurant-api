import { DbLoadFoodsByRestaurant } from '@/data/usecases/menu/load-foods-by-restaurant/db-load-foods-by-restaurant'
import { LoadFoodsByRestaurant } from '@/domain/usecases/menu/load-foods-by-restaurant'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'

export const makeDbLoadFoodsByRestaurant = (): LoadFoodsByRestaurant => {
  const foodDbRepository = new FoodDbRepository()
  return new DbLoadFoodsByRestaurant(foodDbRepository)
}
