import { DbLoadFoods } from './db-load-foods'
import { LoadFoodsRepository } from '@/data/protocols/db'
import { mockLoadFoodsRepository } from '@/data/test'
import { mockFoodModel, throwError } from '@/domain/test'

interface SutTypes {
  sut: DbLoadFoods
  loadFoodsRepositoryStub: LoadFoodsRepository
}

const makeSut = (): SutTypes => {
  const loadFoodsRepositoryStub = mockLoadFoodsRepository()
  const sut = new DbLoadFoods(loadFoodsRepositoryStub)
  return {
    sut,
    loadFoodsRepositoryStub
  }
}

describe('DbLoadFoods', () => {
  test('Should call LoadFoodsRepository with correct values', async () => {
    const { sut, loadFoodsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodsRepositoryStub, 'loadAllFoods')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledWith()
  })
  test('Should return empty list if LoadFoodsRepository returns null', async () => {
    const { sut, loadFoodsRepositoryStub } = makeSut()
    jest.spyOn(loadFoodsRepositoryStub, 'loadAllFoods').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.load()
    expect(response).toEqual([])
  })
  test('Should throw if LoadFoodsRepository throws', async () => {
    const { sut, loadFoodsRepositoryStub } = makeSut()
    jest.spyOn(loadFoodsRepositoryStub, 'loadAllFoods').mockImplementationOnce(throwError)
    const response = sut.load()
    await expect(response).rejects.toThrow()
  })
  test('Should return FoodModel on success', async () => {
    const { sut } = makeSut()
    const response = await sut.load()
    expect(response).toEqual([mockFoodModel()])
  })
})
