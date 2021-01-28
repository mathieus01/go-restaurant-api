import { UpdateOrderStatusRepository } from '@/data/protocols/db/order/update-order-status-repository'
import { UpdateOrderStatus } from '@/domain/usecases/order/update-order-status'

export class DBUpdateOrderStatus implements UpdateOrderStatus {
  constructor (private readonly updateOrderStatusRepository: UpdateOrderStatusRepository) {}

  async updateOrderStatus (orderId: number, status: string): Promise<void> {
    await this.updateOrderStatusRepository.updateOrderStatus(orderId, status)
  }
}
