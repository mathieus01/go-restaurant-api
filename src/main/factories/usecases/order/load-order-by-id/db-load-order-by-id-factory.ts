import { DbLoadOrderById } from '@/data/usecases/order/load-order-by-id/db-load-order-by-id'
import { OrderDbRepository } from '@/infra/db/order/order-db-repository'

export const makeDbLoadOrderById = (): DbLoadOrderById => {
  const orderDbRepository = new OrderDbRepository()
  return new DbLoadOrderById(orderDbRepository)
}
