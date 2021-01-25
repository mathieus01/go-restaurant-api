import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { mockAddFoodParams, mockAddFoodRequestParams, mockFoodModel } from '@/domain/test/mock-menu'
import { mockAddFoodRepository, mockAddTypeRepository, mockLoadTypeRepository } from '@/data/test/mock-db-food'
import { throwError } from '@/domain/test/test-helpers'
import { DbAddFood } from './db-add-food'
import { LoadTypeRepository } from '@/data/protocols/db/menu/load-type-repository'

interface SutSizes {
  sut: DbAddFood
  addFoodRepositoryStub: AddFoodRepository
  loadTypeRepositoryStub: LoadTypeRepository
  addTypeRepositoryStub: AddTypeRepository
}

const makeSut = (): SutSizes => {
  const addFoodRepositoryStub = mockAddFoodRepository()
  const addTypeRepositoryStub = mockAddTypeRepository()
  const loadTypeRepositoryStub = mockLoadTypeRepository()
  const sut = new DbAddFood(addFoodRepositoryStub, loadTypeRepositoryStub, addTypeRepositoryStub)
  return {
    sut,
    addTypeRepositoryStub,
    addFoodRepositoryStub,
    loadTypeRepositoryStub
  }
}

describe('DbAddFood', () => {
  test('Should call LoadTypeRepository with correct values', async () => {
    const { sut, loadTypeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadTypeRepositoryStub, 'loadByDescription')
    await sut.add(mockAddFoodRequestParams())
    expect(addSpy).toHaveBeenCalledWith('any_description')
  })
  test('Should call AddLoadTypeRepository if LoadTypeRepository return null', async () => {
    const { sut, addTypeRepositoryStub, loadTypeRepositoryStub } = makeSut()
    jest.spyOn(loadTypeRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.resolve(null))
    const addTypeSpy = jest.spyOn(addTypeRepositoryStub, 'add')
    await sut.add(mockAddFoodRequestParams())
    expect(addTypeSpy).toHaveBeenCalledWith({ description: 'any_description' })
  })
  test('Should throw if LoadTypeRepository throws', async () => {
    const { sut, loadTypeRepositoryStub } = makeSut()
    jest.spyOn(loadTypeRepositoryStub, 'loadByDescription').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodRequestParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call AddTypeRepository with correct values', async () => {
    const { sut, addTypeRepositoryStub, loadTypeRepositoryStub } = makeSut()
    jest.spyOn(loadTypeRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.resolve(null))
    const addSpy = jest.spyOn(addTypeRepositoryStub, 'add')
    await sut.add(mockAddFoodRequestParams())
    expect(addSpy).toHaveBeenCalledWith({
      description: 'any_description'
    })
  })
  test('Should return null if AddTypeRepository return null', async () => {
    const { sut, addTypeRepositoryStub, loadTypeRepositoryStub } = makeSut()
    jest.spyOn(loadTypeRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.resolve(null))
    jest.spyOn(addTypeRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodRequestParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if AddTypeRepository throws', async () => {
    const { sut, addTypeRepositoryStub, loadTypeRepositoryStub } = makeSut()
    jest.spyOn(loadTypeRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.resolve(null))
    jest.spyOn(addTypeRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodRequestParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call AddFoodRepository with correct values', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addFoodRepositoryStub, 'add')
    await sut.add(mockAddFoodRequestParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddFoodParams())
  })
  test('Should return null if AddFoodRepository return null', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    jest.spyOn(addFoodRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodRequestParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if AddFoodRepository throws', async () => {
    const { sut, addFoodRepositoryStub } = makeSut()
    jest.spyOn(addFoodRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodRequestParams())
    await expect(response).rejects.toThrow()
  })
  test('Should return a food model on success', async () => {
    const { sut } = makeSut()
    const foodModel = await sut.add(mockAddFoodRequestParams())
    expect(foodModel).toEqual(mockFoodModel())
  })
})
