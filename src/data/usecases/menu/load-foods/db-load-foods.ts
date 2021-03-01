import { LoadFoodsRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { LoadFoods } from '@/domain/usecases'

export class DbLoadFoods implements LoadFoods {
  constructor (private readonly loadFoodsRepository: LoadFoodsRepository) {}

  async load (): Promise<FoodModel[]> {
    const foods = await this.loadFoodsRepository.loadAllFoods()
    return foods || []
  }
}
