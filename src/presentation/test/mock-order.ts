import { OrderModel } from '@/domain/models/order'
import { mockOrderModel } from '@/domain/test/mock-order'
import { AddOrder, addOrderParams } from '@/domain/usecases/order/add-order'
import { LoadOrderById } from '@/domain/usecases/order/load-order-by-id'
import { LoadOrdersByUser } from '@/domain/usecases/order/load-orders-by-user'
import { UpdateOrderStatus } from '@/domain/usecases/order/update-order-status'

export const mockLoadOrdersByUser = (): LoadOrdersByUser => {
  class LoadOrdersByUserStub implements LoadOrdersByUser {
    async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
      return Promise.resolve([mockOrderModel()])
    }
  }
  return new LoadOrdersByUserStub()
}

export const mockLoadOrdersById = (): LoadOrderById => {
  class LoadOrderByIdStub implements LoadOrderById {
    async loadById (id: number): Promise<OrderModel> {
      return Promise.resolve(mockOrderModel())
    }
  }
  return new LoadOrderByIdStub()
}
export const mockUpdateOrderStatus = (): UpdateOrderStatus => {
  class UpdateOrderStatusStub implements UpdateOrderStatus {
    async updateOrderStatus (orderId: number, status: string): Promise<void> {
    }
  }
  return new UpdateOrderStatusStub()
}

export const mockAddOrder = (): AddOrder => {
  class AddOrderStub implements AddOrder {
    async add (order: addOrderParams): Promise<OrderModel> {
      return Promise.resolve(mockOrderModel())
    }
  }
  return new AddOrderStub()
}
