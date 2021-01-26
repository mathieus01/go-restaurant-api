import { LoadFoodByIdRepository } from '@/data/protocols/db/menu/load-food-by-id-repository'
import { RemoveFoodRepository } from '@/data/protocols/db/menu/remove-food-repository'
import { mockLoadFoodByIdRepository } from '@/data/test/mock-db-food'
import { throwError } from '@/domain/test/test-helpers'
import { DbRemoveFood } from './db-remove-food'

const mockRemoveFoodRepository = (): RemoveFoodRepository => {
  class RemoveFoodRepositoryStub implements RemoveFoodRepository {
    async remove (foodId: number): Promise<void> {
    }
  }
  return new RemoveFoodRepositoryStub()
}

interface SutTypes {
  sut: DbRemoveFood
  loadFoodByIdRepositoryStub: LoadFoodByIdRepository
  removeFoodRepositoryStub: RemoveFoodRepository
}

const makeSut = (): SutTypes => {
  const loadFoodByIdRepositoryStub = mockLoadFoodByIdRepository()
  const removeFoodRepositoryStub = mockRemoveFoodRepository()
  const sut = new DbRemoveFood(loadFoodByIdRepositoryStub, removeFoodRepositoryStub)
  return {
    sut,
    loadFoodByIdRepositoryStub,
    removeFoodRepositoryStub
  }
}

describe('DbRemoveFood', () => {
  test('Should call LoadFoodByIdRepository with correct value', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFoodByIdRepositoryStub, 'loadById')
    await sut.remove(1)
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw an error if LoadFoodByIdRepository return null', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const response = sut.remove(1)
    await expect(response).rejects.toThrow()
  })
  test('Should call RemoveFoodRepository with correct value', async () => {
    const { sut, removeFoodRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(removeFoodRepositoryStub, 'remove')
    await sut.remove(1)
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if LoadFoodByIdRepository throws', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const response = sut.remove(1)
    await expect(response).rejects.toThrow()
  })
  test('Should throw if RemoveFoodRepository throws', async () => {
    const { sut, removeFoodRepositoryStub } = makeSut()
    jest.spyOn(removeFoodRepositoryStub, 'remove').mockImplementationOnce(throwError)
    const response = sut.remove(1)
    await expect(response).rejects.toThrow()
  })
})
