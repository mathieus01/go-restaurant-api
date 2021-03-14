import { AddFoodRepository, AddTypeRepository, LoadTypeRepository } from '@/data/protocols/db'
import { FoodModel } from '@/domain/models'
import { AddFood, AddFoodRequestParams } from '@/domain/usecases'

export class DbAddFood implements AddFood {
  constructor (
    private readonly addFoodRepository: AddFoodRepository,
    private readonly loadTypeRepository: LoadTypeRepository,
    private readonly addTypeRepository: AddTypeRepository
  ) {}

  async add (addfoodParams: AddFoodRequestParams): Promise<FoodModel> {
    const { name, description, type, avatar, price, restaurantId } = addfoodParams
    let typeModel = await this.loadTypeRepository.loadByDescription(type)
    if (!typeModel) {
      typeModel = await this.addTypeRepository.add({ description: type })
    }
    if (typeModel) {
      const foodModel = await this.addFoodRepository.add({ name, description, avatar, price, type: typeModel, restaurantId })
      return foodModel
    }
    return null
  }
}
