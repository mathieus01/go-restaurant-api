import { UpdateOrderStatusRepository } from '@/data/protocols/db'
import { UpdateOrderStatus } from '@/domain/usecases'

export class DBUpdateOrderStatus implements UpdateOrderStatus {
  constructor (private readonly updateOrderStatusRepository: UpdateOrderStatusRepository) {}

  async updateOrderStatus (orderId: number, status: string): Promise<void> {
    await this.updateOrderStatusRepository.updateOrderStatus(orderId, status)
  }
}
