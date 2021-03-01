import { OrderModel } from '@/domain/models'

export interface LoadOrdersByUserRepository {
  loadOrdersByUser(userId: number): Promise<OrderModel[]>
}
