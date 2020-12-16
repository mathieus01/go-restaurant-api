import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadFoodRepository } from '@/data/protocols/db/menu/load-food-repository'
import { FoodModel } from '@/domain/models/foods'
import { SizeModel } from '@/domain/models/sizes'
import { TypeModel } from '@/domain/models/types'
import { mockAddFoodParams, mockFoodModel, mockSizeModel, mockTypeModel } from '@/domain/test/mock-menu'
import { throwError } from '@/domain/test/test-helpers'
import { AddFoodParams, AddSizeParams, AddTypeParams } from '@/domain/usecases/menu/add-food'
import { DbAddFood } from './db-add-food'

const makeAddTypeRepository = (): AddTypeRepository => {
  class AddTypeRepositoryStub implements AddTypeRepository {
    async add (addTypeParams: AddTypeParams): Promise<TypeModel> {
      return Promise.resolve(mockTypeModel())
    }
  }
  return new AddTypeRepositoryStub()
}
const makeAddSizeRepository = (): AddSizeRepository => {
  class AddSizeRepositoryStub implements AddSizeRepository {
    async add (addSizeParams: AddSizeParams): Promise<SizeModel> {
      return Promise.resolve(mockSizeModel())
    }
  }
  return new AddSizeRepositoryStub()
}
const makeAddFoodRepository = (): AddFoodRepository => {
  class AddFoodRepositoryStub implements AddFoodRepository {
    async add (addFoodParams: AddFoodParams): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new AddFoodRepositoryStub()
}

const makeLoadFoodRepository = (): LoadFoodRepository => {
  class LoadFoodRepositoryStub implements LoadFoodRepository {
    async loadById (id: number): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new LoadFoodRepositoryStub()
}

interface SutSizes {
  sut: DbAddFood
  addFoodRepositoryStub: AddFoodRepository
  addSizeRepositoryStub: AddSizeRepository
  addTypeRepositoryStub: AddTypeRepository
  loadFoodRepositoryStub: LoadFoodRepository
}

const makeSut = (): SutSizes => {
  const addFoodRepositoryStub = makeAddFoodRepository()
  const addTypeRepositoryStub = makeAddTypeRepository()
  const addSizeRepositoryStub = makeAddSizeRepository()
  const loadFoodRepositoryStub = makeLoadFoodRepository()
  const sut = new DbAddFood(addFoodRepositoryStub, addTypeRepositoryStub, addSizeRepositoryStub, loadFoodRepositoryStub)
  return {
    sut,
    addSizeRepositoryStub,
    addTypeRepositoryStub,
    addFoodRepositoryStub,
    loadFoodRepositoryStub
  }
}

describe('DbAddFood', () => {
  test('Should call AddFoodRepository with correct values', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addFoodRepositoryStub, 'add')
    await sut.add(mockAddFoodParams())
    expect(addSpy).toHaveBeenCalledWith({ food: 'any_food' })
  })
  test('Should return null if AddFoodRepository return null', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    jest.spyOn(addFoodRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if AddFoodRepository throws', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    jest.spyOn(addFoodRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call AddTypeRepository with correct values', async () => {
    const { sut, addTypeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTypeRepositoryStub, 'add')
    await sut.add(mockAddFoodParams())
    expect(addSpy).toHaveBeenCalledWith({
      flavor: 'any_flavor',
      foodId: 1
    })
  })
  test('Should return null if AddTypeRepository return null', async () => {
    const { sut, addTypeRepositoryStub } = makeSut()
    jest.spyOn(addTypeRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if AddTypeRepository throws', async () => {
    const { sut, addTypeRepositoryStub } = makeSut()
    jest.spyOn(addTypeRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call AddSizeRepository with correct values', async () => {
    const { sut, addSizeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSizeRepositoryStub, 'add')
    await sut.add(mockAddFoodParams())
    expect(addSpy).toHaveBeenCalledWith({ size: 'any_size', typeId: 1 })
  })
  test('Should throw if AddSizeRepository throws', async () => {
    const { sut, addSizeRepositoryStub } = makeSut()
    jest.spyOn(addSizeRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call LoadFoodRepository with correct values', async () => {
    const { sut, loadFoodRepositoryStub } = makeSut()
    const foodModel = mockFoodModel()
    const loadSpy = jest.spyOn(loadFoodRepositoryStub, 'loadById')
    await sut.add(mockAddFoodParams())
    expect(loadSpy).toHaveBeenCalledWith(foodModel.id)
  })
  test('Should return null if LoadFoodRepository return null', async () => {
    const { sut, loadFoodRepositoryStub } = makeSut()
    jest.spyOn(loadFoodRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if LoadFoodRepository throws', async () => {
    const { sut, loadFoodRepositoryStub } = makeSut()
    jest.spyOn(loadFoodRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should return a food model on success', async () => {
    const { sut } = makeSut()
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toEqual(mockFoodModel())
  })
})
