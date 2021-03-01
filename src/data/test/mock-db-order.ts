import { AccountModel, FoodModel, OrderModel } from '@/domain/models'
import { mockAccountModel, mockFoodModel, mockOrderModel } from '@/domain/test'
import { addOrderParams } from '@/domain/usecases'
import {
  LoadAccountByIdRepository,
  LoadFoodByFoodTypeAndSizeIdsRepository,
  AddOrderRepository,
  LoadOrderByIdRepository,
  LoadOrdersByUserRepository,
  UpdateOrderStatusRepository
} from '@/data/protocols/db'

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
