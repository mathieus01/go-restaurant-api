import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadFoods } from '@/main/factories/usecases'
import { LoadFoodsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadFoodsController = (): Controller => {
  const controller = new LoadFoodsController(makeDbLoadFoods())
  return makeLogControllerDecorator(controller)
}
