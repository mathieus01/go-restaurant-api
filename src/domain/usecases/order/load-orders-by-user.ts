import { OrderModel } from '@/domain/models/order'

export interface LoadOrdersByUser {
  loadOrdersByUser(userId: number): Promise<OrderModel[]>
}
