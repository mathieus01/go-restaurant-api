import { RemoveFoodRepository } from '@/data/protocols/db/menu/remove-food-repository'
import { RemoveFood } from '@/domain/usecases/menu/remove-food'

export class DbRemoveFood implements RemoveFood {
  constructor (
    private readonly removeFoodRepository: RemoveFoodRepository) {}

  async remove (foodId: number): Promise<void> {
    await this.removeFoodRepository.remove(foodId)
  }
}
