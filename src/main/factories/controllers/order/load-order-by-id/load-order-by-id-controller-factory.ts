import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadOrderById } from '@/main/factories/usecases'
import { LoadOrderByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOrderByIdController = (): Controller => {
  const controller = new LoadOrderByIdController(makeDbLoadOrderById())
  return makeLogControllerDecorator(controller)
}
