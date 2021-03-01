import { LoadAccountByIdRepository, LoadFoodByIdRepository, AddOrderRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { AddOrder, addOrderParams } from '@/domain/usecases'

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
