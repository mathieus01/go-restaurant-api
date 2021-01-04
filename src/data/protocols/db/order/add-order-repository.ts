import { OrderModel } from '@/domain/models/order'
import { addOrderParams } from '@/domain/usecases/order/add-order'

export interface AddOrderRepository {
  add(orderParam: addOrderParams): Promise<OrderModel>
}
