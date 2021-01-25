import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadTypeRepository } from '@/data/protocols/db/menu/load-type-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFood, AddFoodRequestParams } from '@/domain/usecases/menu/add-food'

export class DbAddFood implements AddFood {
  constructor (
    private readonly addFoodRepository: AddFoodRepository,
    private readonly loadTypeRepository: LoadTypeRepository,
    private readonly addTypeRepository: AddTypeRepository
  ) {}

  async add (addfoodParams: AddFoodRequestParams): Promise<FoodModel> {
    const { food, type, price } = addfoodParams
    let typeModel = await this.loadTypeRepository.loadByDescription(type)
    if (!typeModel) {
      typeModel = await this.addTypeRepository.add({ description: type })
    }
    if (typeModel) {
      const foodModel = await this.addFoodRepository.add({ food, price, type: typeModel })
      return foodModel
    }
    return null
  }
}
