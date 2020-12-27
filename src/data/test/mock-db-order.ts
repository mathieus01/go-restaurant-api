import { AccountModel } from '@/domain/models/account'
import { FoodModel } from '@/domain/models/foods'
import { OrderModel } from '@/domain/models/order'
import { mockAccountModel } from '@/domain/test/mock-account'
import { mockFoodModel } from '@/domain/test/mock-menu'
import { mockOrderModel } from '@/domain/test/mock-order'
import { addOrderParams } from '@/domain/usecases/order/add-order'
import { LoadAccountByIdRepository } from '../protocols/db/account/load-account-by-id-repository'
import { LoadFoodByFoodTypeAndSizeIdsRepository } from '../protocols/db/menu/load-food-by-food-type-size-ids-repository'
import { AddOrderRepository } from '../protocols/db/order/add-order-repository'

export const mockAddOrderRepository = (): AddOrderRepository => {
  class AddOrderRepositoryStub implements AddOrderRepository {
    async add (order: addOrderParams): Promise<OrderModel> {
      return Promise.resolve(mockOrderModel())
    }
  }
  return new AddOrderRepositoryStub()
}
export const mockLoadFoodByFoodTypeAndSizeIdsRepository = (): LoadFoodByFoodTypeAndSizeIdsRepository => {
  class LoadFoodByFoodTypeAndSizeIdsRepositoryStub implements LoadFoodByFoodTypeAndSizeIdsRepository {
    async load (sizeFoodId: number): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new LoadFoodByFoodTypeAndSizeIdsRepositoryStub()
}

export const mockLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: number): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByIdRepositoryStub()
}
