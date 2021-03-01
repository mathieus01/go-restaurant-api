import { OrderModel } from '@/domain/models'

export interface LoadOrderByIdRepository {
  loadById(id: number): Promise<OrderModel>
}
