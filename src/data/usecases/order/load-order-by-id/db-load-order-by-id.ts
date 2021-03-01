import { LoadOrderByIdRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { LoadOrderById } from '@/domain/usecases'

export class DbLoadOrderById implements LoadOrderById {
  constructor (private readonly loadOrderByIdRepository: LoadOrderByIdRepository) {}

  async loadById (id: number): Promise<OrderModel> {
    return this.loadOrderByIdRepository.loadById(id)
  }
}
