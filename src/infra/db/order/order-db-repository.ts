import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { OrderModel } from '@/domain/models/order'
import { addOrderParams } from '@/domain/usecases/order/add-order'
import Order from '@/infra/models/order-model'

export class OrderDbRepository implements AddOrderRepository {
  async add (orderParam: addOrderParams): Promise<OrderModel> {
    const order = await Order.create(orderParam)
    return order
  }
}