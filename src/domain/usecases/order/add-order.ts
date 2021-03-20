import { OrderModel } from '@/domain/models/order'

export interface AddFoodOrderParams {
  food_id: number
  order_id?: number
  amount: number
  observation: string
}

export interface AddOrderParams {
  foodsOrder: AddFoodOrderParams[]
  accountId: number
  date: Date
  address: string
  status?: string
}

export interface AddOrder {
  add(order: AddOrderParams): Promise<OrderModel>
}
