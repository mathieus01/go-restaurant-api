import { OrderModel } from '@/domain/models/order'

export interface addOrderParams {
  sizeFood_id: number
  observation: string
  date: Date
  address: string
  user_id: number
}

export interface AddOrder {
  add(order: addOrderParams): Promise<OrderModel>
}
