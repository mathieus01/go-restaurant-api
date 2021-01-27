import { OrderModel } from '@/domain/models/order'

export interface ListOrdersByUser {
  listOrdersByUser(userId: number): Promise<OrderModel[]>
}
