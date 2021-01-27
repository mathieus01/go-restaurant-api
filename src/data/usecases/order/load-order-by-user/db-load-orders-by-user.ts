import { LoadOrdersByUserRepository } from '@/data/protocols/db/order/load-orders-by-user-repository'
import { OrderModel } from '@/domain/models/order'
import { LoadOrdersByUser } from '@/domain/usecases/order/load-orders-by-user'

export class DbLoadOrdersByUser implements LoadOrdersByUser {
  constructor (private readonly listOrdersByUserRepository: LoadOrdersByUserRepository) {}

  async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
    const orders = await this.listOrdersByUserRepository.loadOrdersByUser(userId)
    return orders
  }
}
