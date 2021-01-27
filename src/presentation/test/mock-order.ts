import { OrderModel } from '@/domain/models/order'
import { mockOrderModel } from '@/domain/test/mock-order'
import { LoadOrdersByUser } from '@/domain/usecases/order/load-orders-by-user'

export const mockLoadOrdersByUser = (): LoadOrdersByUser => {
  class LoadOrdersByUserStub implements LoadOrdersByUser {
    async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
      return Promise.resolve([mockOrderModel()])
    }
  }
  return new LoadOrdersByUserStub()
}
