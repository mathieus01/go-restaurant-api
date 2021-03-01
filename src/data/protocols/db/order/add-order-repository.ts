import { OrderModel } from '@/domain/models'
import { addOrderParams } from '@/domain/usecases'

export interface AddOrderRepository {
  add(orderParam: addOrderParams): Promise<OrderModel>
}
