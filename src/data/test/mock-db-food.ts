import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { AddFoodParams, AddTypeParams } from '@/domain/usecases/menu/add-food'
import { mockFoodModel, mockTypeModel } from '@/domain/test/mock-menu'
import { FoodModel } from '@/domain/models/foods'
import { LoadFoodsRepository } from '../protocols/db/menu/load-foods-repository'
import { TypeModel } from '@/domain/models/types'
import { LoadTypeRepository } from '../protocols/db/menu/load-type-repository'

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

export const mockLoadFoodsRepository = (): LoadFoodsRepository => {
  class LoadFoodsRepositoryStub implements LoadFoodsRepository {
    async loadAllFoods (): Promise<FoodModel[]> {
      return Promise.resolve([mockFoodModel()])
    }
  }
  return new LoadFoodsRepositoryStub()
}
