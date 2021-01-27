import { OrderModel } from '@/domain/models/order'

export interface ListOrdersByUserRepository {
  listOrdersByUser(userId: number): Promise<OrderModel[]>
}
