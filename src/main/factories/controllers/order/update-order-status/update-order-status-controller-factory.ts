import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadOrderById } from '@/main/factories/usecases/order/load-order-by-id/db-load-order-by-id-factory'
import { makeDBUpdateOrderStatus } from '@/main/factories/usecases/order/update-order-status/db-update-order-status-factory'
import { UpdateOrderStatusController } from '@/presentation/controllers/order/update-order-status/update-order-status-controller'
import { Controller } from '@/presentation/protocols'

export const makeUpdateOrderStatusController = (): Controller => {
  const controller = new UpdateOrderStatusController(makeDbLoadOrderById(), makeDBUpdateOrderStatus())
  return makeLogControllerDecorator(controller)
}
