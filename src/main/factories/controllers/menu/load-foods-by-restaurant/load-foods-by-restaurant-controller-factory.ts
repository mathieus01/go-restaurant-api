import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadFoodsByRestaurant } from '@/main/factories/usecases'
import { LoadFoodsByRestaurantController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadFoodsByRestaurantController = (): Controller => {
  const controller = new LoadFoodsByRestaurantController(makeDbLoadFoodsByRestaurant())
  return makeLogControllerDecorator(controller)
}
