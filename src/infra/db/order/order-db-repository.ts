import { Account, Food, FoodOrder, Order } from '@/infra/models'
import { AddOrderRepository, LoadOrderByIdRepository, LoadOrdersByUserRepository, UpdateOrderStatusRepository } from '@/data/protocols/db'
import { OrderModel } from '@/domain/models'
import { AddOrderParams } from '@/domain/usecases'

export class OrderDbRepository implements AddOrderRepository, LoadOrdersByUserRepository, UpdateOrderStatusRepository, LoadOrderByIdRepository {
  async add (orderParam: AddOrderParams): Promise<OrderModel> {
    const { accountId, status, date, address } = orderParam
    const order = await Order.create({
      account_id: accountId,
      status,
      date,
      address
    })

    return order
  }

  async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
    const orders = await Order.findAll({
      where: {
        account_id: userId
      },
      include: [{
        model: FoodOrder,
        as: 'foodsOrder',
        include: [{
          model: Food,
          as: 'food',
          include: [{
            model: Account,
            as: 'restaurant'
          }]
        }]
      }]
    })
    return orders
  }

  async updateOrderStatus (orderId: number, status: string): Promise<void> {
    await Order.update({
      status
    }, {
      where: { id: orderId }
    })
  }

  async loadById (id: number): Promise<OrderModel> {
    return await Order.findOne({
      where: {
        id
      },
      include: [{
        model: FoodOrder,
        as: 'foodsOrder',
        include: [{
          model: Food,
          as: 'food',
          include: [{
            model: Account,
            as: 'restaurant'
          }]
        }]
      }]
    })
  }
}
