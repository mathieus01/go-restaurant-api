import { OrderModel } from '@/domain/models/order'

export interface LoadOrderById {
  loadById(id: number): Promise<OrderModel>
}
