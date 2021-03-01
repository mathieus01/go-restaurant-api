import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadOrdersByUser } from '@/main/factories/usecases'
import { LoadOrdersByUserController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadOrdersByUserController = (): Controller => {
  const controller = new LoadOrdersByUserController(makeDbLoadOrdersByUser())
  return makeLogControllerDecorator(controller)
}
