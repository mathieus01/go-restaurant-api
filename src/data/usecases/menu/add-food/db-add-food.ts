import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { FoodModel } from '@/domain/models/foods'
import { AddFood, AddFoodParams } from '@/domain/usecases/menu/add-food'

export class DbAddFood implements AddFood {
  constructor (
    private readonly addFoodRepository: AddFoodRepository,
    private readonly addTypeRepository: AddTypeRepository,
    private readonly addSizeRepository: AddSizeRepository,
    private readonly loadFoodByIdRepository: LoadFoodByIdRepository
  ) {}

  async add (addfoodParams: AddFoodParams): Promise<FoodModel> {
    const { type, food } = addfoodParams
    const { sizes } = type
    const foodId = await this.addFoodRepository.add({ food })
    if (foodId) {
      const typeId = await this.addTypeRepository.add({ flavor: type.flavor, food_id: foodId })
      if (typeId) {
        for (const sizeParams of sizes) {
          await this.addSizeRepository.add({ size: sizeParams.size, price: sizeParams.price, type_id: typeId })
        }
        const foodModel = await this.loadFoodByIdRepository.loadById(foodId)
        return foodModel
      }
    }
    return null
  }
}
