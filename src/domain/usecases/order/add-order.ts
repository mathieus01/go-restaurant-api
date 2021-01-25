import { OrderModel } from '@/domain/models/order'

export interface addOrderParams {
  food_id: number
  observation: string
  date: Date
  address: string
  account_id: number
  status?: string
}

export interface AddOrder {
  add(order: addOrderParams): Promise<OrderModel>
}
