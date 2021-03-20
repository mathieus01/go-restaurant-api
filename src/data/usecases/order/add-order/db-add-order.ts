import { AddFoodsOrdersRepository, AddOrderRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { AddOrder, AddOrderParams } from '@/domain/usecases'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly addOrderRepository: AddOrderRepository,
    private readonly addFoodsOrdersRepository: AddFoodsOrdersRepository
  ) {}

  async add (order: AddOrderParams): Promise<OrderModel> {
    const orderModel = await this.addOrderRepository.add(order)
    if (orderModel) {
      const foodsOrder = order.foodsOrder.map((foodOrder) => ({ ...foodOrder, order_id: orderModel.id }))
      const foodOrderModel = await this.addFoodsOrdersRepository.add(foodsOrder)
      orderModel.foodsOrder = foodOrderModel
      return orderModel
    }
    return null
  }
}
