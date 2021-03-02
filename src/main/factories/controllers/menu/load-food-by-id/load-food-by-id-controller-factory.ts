import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadFoodById } from '@/main/factories/usecases'
import { LoadFoodByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadFoodByIdController = (): Controller => {
  const controller = new LoadFoodByIdController(makeDbLoadFoodById())
  return makeLogControllerDecorator(controller)
}
