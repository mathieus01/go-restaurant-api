import { ListOrdersByUserRepository } from '@/data/protocols/db/order/list-orders-by-user-repository'
import { OrderModel } from '@/domain/models/order'
import { ListOrdersByUser } from '@/domain/usecases/order/list-orders-by-user'

export class DbListOrdersByUser implements ListOrdersByUser {
  constructor (private readonly listOrdersByUserRepository: ListOrdersByUserRepository) {}

  async listOrdersByUser (userId: number): Promise<OrderModel[]> {
    const orders = await this.listOrdersByUserRepository.listOrdersByUser(userId)
    return orders
  }
}
