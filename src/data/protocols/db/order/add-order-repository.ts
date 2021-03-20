import { OrderModel } from '@/domain/models'
import { AddOrderParams } from '@/domain/usecases'

export interface AddOrderRepository {
  add(orderParam: AddOrderParams): Promise<OrderModel>
}
