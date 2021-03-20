import { DbAddOrder } from '@/data/usecases/order/add-order/db-add-order'
import { AddOrder } from '@/domain/usecases/order/add-order'
import { FoodOrderDbRepository } from '@/infra/db/food-order/food-order-db-repository'
import { OrderDbRepository } from '@/infra/db/order/order-db-repository'

export const makeDbAddOrder = (): AddOrder => {
  const orderDbRepository = new OrderDbRepository()
  const foodOrderDbRepositort = new FoodOrderDbRepository()
  return new DbAddOrder(orderDbRepository, foodOrderDbRepositort)
}
