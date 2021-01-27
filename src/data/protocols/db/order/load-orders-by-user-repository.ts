import { OrderModel } from '@/domain/models/order'

export interface LoadOrdersByUserRepository {
  loadOrdersByUser(userId: number): Promise<OrderModel[]>
}
