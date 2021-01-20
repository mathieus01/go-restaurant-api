import { DbAddOrder } from '@/data/usecases/order/add-order/db-add-order'
import { AddOrder } from '@/domain/usecases/order/add-order'
import { AccountDbRepository } from '@/infra/db/account/account-db-repository'
import { FoodDbRepository } from '@/infra/db/menu/food/food-db-repository'
import { OrderDbRepository } from '@/infra/db/order/order-db-repository'

export const makeDbAddOrder = (): AddOrder => {
  const foodDbRepository = new FoodDbRepository()
  const accountDbRepository = new AccountDbRepository()
  const orderDbRepository = new OrderDbRepository()
  return new DbAddOrder(foodDbRepository, accountDbRepository, orderDbRepository)
}
