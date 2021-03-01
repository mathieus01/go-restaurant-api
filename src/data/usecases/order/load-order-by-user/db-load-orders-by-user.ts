import { LoadOrdersByUserRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { LoadOrdersByUser } from '@/domain/usecases'

export class DbLoadOrdersByUser implements LoadOrdersByUser {
  constructor (private readonly listOrdersByUserRepository: LoadOrdersByUserRepository) {}

  async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
    const orders = await this.listOrdersByUserRepository.loadOrdersByUser(userId)
    return orders
  }
}
