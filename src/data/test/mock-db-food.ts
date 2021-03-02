import { AddFoodRepository, AddTypeRepository, LoadFoodByIdRepository, LoadFoodsByRestaurantRepository, LoadTypeRepository, RemoveFoodRepository } from '@/data/protocols/db'
import { AddFoodParams, AddTypeParams } from '@/domain/usecases'
import { mockFoodModel, mockTypeModel } from '@/domain/test'
import { FoodModel, TypeModel } from '@/domain/models'

export const mockAddTypeRepository = (): AddTypeRepository => {
  class AddTypeRepositoryStub implements AddTypeRepository {
    async add (addTypeParams: AddTypeParams): Promise<TypeModel> {
      return Promise.resolve(mockTypeModel())
    }
  }
  return new AddTypeRepositoryStub()
}
export const mockLoadTypeRepository = (): LoadTypeRepository => {
  class LoadTypeRepositoryStub implements LoadTypeRepository {
    async loadByDescription (description: string): Promise<TypeModel> {
      return Promise.resolve(mockTypeModel())
    }
  }
  return new LoadTypeRepositoryStub()
}

export const mockAddFoodRepository = (): AddFoodRepository => {
  class AddFoodRepositoryStub implements AddFoodRepository {
    async add (addFoodParams: AddFoodParams): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new AddFoodRepositoryStub()
}

export const mockLoadFoodByIdRepository = (): LoadFoodByIdRepository => {
  class LoadFoodByIdRepositoryStub implements LoadFoodByIdRepository {
    async loadById (id: number): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new LoadFoodByIdRepositoryStub()
}

export const mockLoadFoodsByRestaurantRepository = (): LoadFoodsByRestaurantRepository => {
  class LoadFoodsRepositoryStub implements LoadFoodsByRestaurantRepository {
    async loadByRestaurant (restaurantId: number): Promise<FoodModel[]> {
      return Promise.resolve([mockFoodModel()])
    }
  }
  return new LoadFoodsRepositoryStub()
}

export const mockRemoveFoodRepository = (): RemoveFoodRepository => {
  class RemoveFoodRepositoryStub implements RemoveFoodRepository {
    async remove (foodId: number): Promise<void> {
    }
  }
  return new RemoveFoodRepositoryStub()
}
