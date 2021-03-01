import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadFoodById, makeDbRemoveFood } from '@/main/factories/usecases'
import { RemoveFoodController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeRemoveFoodController = (): Controller => {
  const controller = new RemoveFoodController(makeDbRemoveFood(), makeDbLoadFoodById())
  return makeLogControllerDecorator(controller)
}
