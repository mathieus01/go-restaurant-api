import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { OrderModel } from '@/domain/models/order'
import { AddOrder, addOrderParams } from '@/domain/usecases/order/add-order'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addOrderRepository: AddOrderRepository
  ) {}

  async add (order: addOrderParams): Promise<OrderModel> {
    const food = await this.loadFoodByIdRepository.loadById(order.food_id)
    const account = await this.loadAccountByIdRepository.loadById(order.account_id)
    if (food && account) {
      const orderModel = await this.addOrderRepository.add(order)
      return orderModel
    }
    return null
  }
}
