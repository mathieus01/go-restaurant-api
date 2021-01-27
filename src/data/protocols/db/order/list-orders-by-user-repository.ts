import { OrderModel } from '@/domain/models/order'

export interface ListOrdersByUserRepository {
  loadOrdersByUser(userId: number): Promise<OrderModel[]>
}
