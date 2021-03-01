import { Order } from '@/infra/models'
import { AddOrderRepository, LoadOrderByIdRepository, LoadOrdersByUserRepository, UpdateOrderStatusRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { addOrderParams } from '@/domain/usecases'

export class OrderDbRepository implements AddOrderRepository, LoadOrdersByUserRepository, UpdateOrderStatusRepository, LoadOrderByIdRepository {
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

  async updateOrderStatus (orderId: number, status: string): Promise<void> {
    await Order.update({
      status
    }, {
      where: { id: orderId }
    })
  }

  async loadById (id: number): Promise<OrderModel> {
    return await Order.findOne({
      where: {
        id
      }
    })
  }
}
