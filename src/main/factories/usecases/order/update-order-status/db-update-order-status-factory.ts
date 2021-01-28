import { DBUpdateOrderStatus } from '@/data/usecases/order/update-order-status/db-update-order-status'
import { OrderDbRepository } from '@/infra/db/order/order-db-repository'

export const makeDBUpdateOrderStatus = (): DBUpdateOrderStatus => {
  const orderDbRepository = new OrderDbRepository()
  return new DBUpdateOrderStatus(orderDbRepository)
}
