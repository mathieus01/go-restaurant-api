import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { LoadOrdersByUserRepository } from '@/data/protocols/db/order/load-orders-by-user-repository'
import { OrderModel } from '@/domain/models/order'
import { addOrderParams } from '@/domain/usecases/order/add-order'
import Order from '@/infra/models/order-model'

export class OrderDbRepository implements AddOrderRepository, LoadOrdersByUserRepository {
  async add (orderParam: addOrderParams): Promise<OrderModel> {
    const order = await Order.create(orderParam)
    return order
  }

  async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
    const orders = await Order.findAll({
      where: {
        account_id: userId
      }
    })
    return orders
  }
}
