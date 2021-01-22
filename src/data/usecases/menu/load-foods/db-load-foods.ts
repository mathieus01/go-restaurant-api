import { LoadFoodsRepository } from '@/data/protocols/db/menu/load-foods-repository'
import { FoodModel } from '@/domain/models/foods'
import { LoadFoods } from '@/domain/usecases/menu/load-foods'

export class DbLoadFoods implements LoadFoods {
  constructor (private readonly loadFoodsRepository: LoadFoodsRepository) {}

  async load (): Promise<FoodModel[]> {
    const foods = await this.loadFoodsRepository.loadAllFoods()
    return foods || []
  }
}
