import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddOrder } from '@/main/factories/usecases'
import { AddOrderController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddOrderValidation } from './add-order-validation-factory'

export const makeAddOrderController = (): Controller => {
  const controller = new AddOrderController(makeAddOrderValidation(), makeDbAddOrder())
  return makeLogControllerDecorator(controller)
}
