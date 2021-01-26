import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { RemoveFoodRepository } from '@/data/protocols/db/menu/remove-food-repository'
import { RemoveFood } from '@/domain/usecases/menu/remove-food'

export class DbRemoveFood implements RemoveFood {
  constructor (
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository,
    private readonly removeFoodRepository: RemoveFoodRepository) {}

  async remove (foodId: number): Promise<void> {
    const food = await this.loadFoodByIdRepository.loadById(foodId)
    if (!food) {
      throw new Error('Food not found')
    }
    await this.removeFoodRepository.remove(foodId)
  }
}
