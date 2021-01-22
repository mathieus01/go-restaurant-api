import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { AddFoodParams, AddSizeParams, AddTypeParams } from '@/domain/usecases/menu/add-food'
import { mockFoodModel, mockSizeModel, mockTypeModel } from '@/domain/test/mock-menu'
import { FoodModel } from '@/domain/models/foods'
import { LoadFoodsRepository } from '../protocols/db/menu/load-foods-repository'

export const mockAddTypeRepository = (): AddTypeRepository => {
  class AddTypeRepositoryStub implements AddTypeRepository {
    async add (addTypeParams: AddTypeParams): Promise<number> {
      return Promise.resolve(mockTypeModel().id)
    }
  }
  return new AddTypeRepositoryStub()
}
export const mockAddSizeRepository = (): AddSizeRepository => {
  class AddSizeRepositoryStub implements AddSizeRepository {
    async add (addSizeParams: AddSizeParams): Promise<number> {
      return Promise.resolve(mockSizeModel().id)
    }
  }
  return new AddSizeRepositoryStub()
}
export const mockAddFoodRepository = (): AddFoodRepository => {
  class AddFoodRepositoryStub implements AddFoodRepository {
    async add (addFoodParams: AddFoodParams): Promise<number> {
      return Promise.resolve(mockFoodModel().id)
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
