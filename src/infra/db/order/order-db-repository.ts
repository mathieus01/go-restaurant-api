import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { ListOrdersByUserRepository } from '@/data/protocols/db/order/list-orders-by-user-repository'
import { OrderModel } from '@/domain/models/order'
import { addOrderParams } from '@/domain/usecases/order/add-order'
import Order from '@/infra/models/order-model'

export class OrderDbRepository implements AddOrderRepository, ListOrdersByUserRepository {
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
