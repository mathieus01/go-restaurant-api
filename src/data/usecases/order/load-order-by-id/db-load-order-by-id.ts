import { LoadOrderByIdRepository } from '@/data/protocols/db/order/load-order-by-id-repository'
import { OrderModel } from '@/domain/models/order'
import { LoadOrderById } from '@/domain/usecases/order/load-order-by-id'

export class DbLoadOrderById implements LoadOrderById {
  constructor (private readonly loadOrderByIdRepository: LoadOrderByIdRepository) {}

  async loadById (id: number): Promise<OrderModel> {
    return this.loadOrderByIdRepository.loadById(id)
  }
}
