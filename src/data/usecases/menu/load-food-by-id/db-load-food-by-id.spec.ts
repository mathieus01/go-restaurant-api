import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { mockLoadFoodByIdRepository } from '@/data/test/mock-db-food'
import { throwError } from '@/domain/test/test-helpers'
import { DbLoadFoodById } from './db-load-food-by-id'

interface SutTypes {
  sut: DbLoadFoodById
  loadFoodByIdRepositoryStub: LoadFoodByIdRepository
}

const makeSut = (): SutTypes => {
  const loadFoodByIdRepositoryStub = mockLoadFoodByIdRepository()
  const sut = new DbLoadFoodById(loadFoodByIdRepositoryStub)
  return {
    sut,
    loadFoodByIdRepositoryStub
  }
}

describe('DbLoadFoodById', () => {
  test('Should call LoadFoodByIdRepository with correct values', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFoodByIdRepositoryStub, 'loadById')
    await sut.loadById(1)
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if LoadFoodByIdRepository throws', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const response = sut.loadById(1)
    await expect(response).rejects.toThrow()
  })
  test('Should return a foodModel on success', async () => {
    const { sut } = makeSut()
    const food = await sut.loadById(1)
    expect(food).toBeTruthy()
  })
})
