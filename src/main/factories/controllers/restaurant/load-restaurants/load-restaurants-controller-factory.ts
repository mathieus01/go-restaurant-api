import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadRestaurants } from '@/main/factories/usecases'
import { LoadRestaurantsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadRestaurantsController = (): Controller => {
  const controller = new LoadRestaurantsController(makeDbLoadRestaurants())
  return makeLogControllerDecorator(controller)
}
