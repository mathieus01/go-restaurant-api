import { FoodOrderModel } from '@/domain/models'
import { mockFoodOrderModel } from '@/domain/test'
import { AddFoodOrderParams } from '@/domain/usecases'
import { AddFoodsOrdersRepository } from '../protocols/db'

export const mockAddFoodsOrdersRepository = (): AddFoodsOrdersRepository => {
  class AddFoodsOrdersRepositoryStub implements AddFoodsOrdersRepository {
    async add (foodsOrdersParams: AddFoodOrderParams[]): Promise<FoodOrderModel[]> {
      return Promise.resolve([mockFoodOrderModel()])
    }
  }
  return new AddFoodsOrdersRepositoryStub()
}
