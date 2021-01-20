import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddOrder } from '@/main/factories/usecases/order/add-order/db-add-order-factory'
import { AddOrderController } from '@/presentation/controllers/order/add-order/add-order-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddOrderValidation } from './add-order-validation-factory'

export const makeAddOrderControllerFactory = (): Controller => {
  const controller = new AddOrderController(makeAddOrderValidation(), makeDbAddOrder())
  return makeLogControllerDecorator(controller)
}
