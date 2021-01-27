import { DbLoadOrdersByUser } from '@/data/usecases/order/load-order-by-user/db-load-orders-by-user'
import { OrderDbRepository } from '@/infra/db/order/order-db-repository'

export const makeDbLoadOrdersByUser = (): DbLoadOrdersByUser => {
  const orderDbRepository = new OrderDbRepository()
  return new DbLoadOrdersByUser(orderDbRepository)
}
