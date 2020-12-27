import { AddFoodRepository } from '@/data/protocols/db/menu/add-food-repository'
import { AddSizeRepository } from '@/data/protocols/db/menu/add-size-repository'
import { AddTypeRepository } from '@/data/protocols/db/menu/add-type-repository'
import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { mockAddFoodParams, mockFoodModel } from '@/domain/test/mock-menu'
import { mockAddFoodRepository, mockAddTypeRepository, mockAddSizeRepository, mockLoadFoodByIdRepository } from '@/data/test/mock-db-food'
import { throwError } from '@/domain/test/test-helpers'
import { DbAddFood } from './db-add-food'

interface SutSizes {
  sut: DbAddFood
  addFoodRepositoryStub: AddFoodRepository
  addSizeRepositoryStub: AddSizeRepository
  addTypeRepositoryStub: AddTypeRepository
  loadFoodByIdRepositoryStub: LoadFoodByIdRepository
}

const makeSut = (): SutSizes => {
  const addFoodRepositoryStub = mockAddFoodRepository()
  const addTypeRepositoryStub = mockAddTypeRepository()
  const addSizeRepositoryStub = mockAddSizeRepository()
  const loadFoodByIdRepositoryStub = mockLoadFoodByIdRepository()
  const sut = new DbAddFood(addFoodRepositoryStub, addTypeRepositoryStub, addSizeRepositoryStub, loadFoodByIdRepositoryStub)
  return {
    sut,
    addSizeRepositoryStub,
    addTypeRepositoryStub,
    addFoodRepositoryStub,
    loadFoodByIdRepositoryStub
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
      food_id: 1
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
    expect(addSpy).toHaveBeenCalledWith({ size: 'any_size', price: 70, type_id: 1 })
  })
  test('Should throw if AddSizeRepository throws', async () => {
    const { sut, addSizeRepositoryStub } = makeSut()
    jest.spyOn(addSizeRepositoryStub, 'add').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should call LoadFoodByIdRepository with correct values', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    const foodModel = mockFoodModel()
    const loadSpy = jest.spyOn(loadFoodByIdRepositoryStub, 'loadById')
    await sut.add(mockAddFoodParams())
    expect(loadSpy).toHaveBeenCalledWith(foodModel.id)
  })
  test('Should return null if LoadFoodByIdRepository return null', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toBeNull()
  })
  test('Should throw if LoadFoodByIdRepository throws', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const response = sut.add(mockAddFoodParams())
    await expect(response).rejects.toThrow()
  })
  test('Should return a food model on success', async () => {
    const { sut } = makeSut()
    const foodModel = await sut.add(mockAddFoodParams())
    expect(foodModel).toEqual(mockFoodModel())
  })
})
