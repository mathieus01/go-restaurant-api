import { RemoveFoodRepository } from '@/data/protocols/db'
import { RemoveFood } from '@/domain/usecases'

export class DbRemoveFood implements RemoveFood {
  constructor (
    private readonly removeFoodRepository: RemoveFoodRepository) {}

  async remove (foodId: number): Promise<void> {
    await this.removeFoodRepository.remove(foodId)
  }
}
