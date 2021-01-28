import { OrderModel } from '@/domain/models/order'

export interface LoadOrderByIdRepository {
  loadById(id: number): Promise<OrderModel>
}
