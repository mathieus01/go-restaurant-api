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
import { LoadOrderByIdRepository } from '../protocols/db/order/load-order-by-id-repository'
import { LoadOrdersByUserRepository } from '../protocols/db/order/load-orders-by-user-repository'
import { UpdateOrderStatusRepository } from '../protocols/db/order/update-order-status-repository'

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
    async loadFoodByFoodTypeAndSizeIds (sizeFoodId: number): Promise<FoodModel> {
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

export const mockLoadOrdersByUserRepository = (): LoadOrdersByUserRepository => {
  class LoadOrdersByUserRepositoryStub implements LoadOrdersByUserRepository {
    async loadOrdersByUser (userId: number): Promise<OrderModel[]> {
      return Promise.resolve([mockOrderModel()])
    }
  }
  return new LoadOrdersByUserRepositoryStub()
}

export const mockUpdateOrderStatusRepository = (): UpdateOrderStatusRepository => {
  class UpdateOrderStatusRepositoryStub implements UpdateOrderStatusRepository {
    async updateOrderStatus (orderId: number, status: string): Promise<void> {
    }
  }
  return new UpdateOrderStatusRepositoryStub()
}

export const mockLoadOrderByIdRepository = (): LoadOrderByIdRepository => {
  class LoadOrderByIdRepositoryStub implements LoadOrderByIdRepository {
    async loadById (id: number): Promise<OrderModel> {
      return Promise.resolve(mockOrderModel())
    }
  }
  return new LoadOrderByIdRepositoryStub()
}
