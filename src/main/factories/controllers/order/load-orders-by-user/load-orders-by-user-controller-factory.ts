import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadOrdersByUser } from '@/main/factories/usecases/order/load-orders-by-user/db-load-orders-by-user-factory'
import { LoadOrdersByUserController } from '@/presentation/controllers/order/load-orders-by-user/load-orders-by-user-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadOrdersByUserController = (): Controller => {
  const controller = new LoadOrdersByUserController(makeDbLoadOrdersByUser())
  return makeLogControllerDecorator(controller)
}
