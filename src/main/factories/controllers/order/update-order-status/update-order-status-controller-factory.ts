import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadOrderById, makeDBUpdateOrderStatus } from '@/main/factories/usecases'
import { UpdateOrderStatusController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOrderStatusController = (): Controller => {
  const controller = new UpdateOrderStatusController(makeDbLoadOrderById(), makeDBUpdateOrderStatus())
  return makeLogControllerDecorator(controller)
}
