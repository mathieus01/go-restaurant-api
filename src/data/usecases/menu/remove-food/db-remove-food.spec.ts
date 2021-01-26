import { RemoveFoodRepository } from '@/data/protocols/db/menu/remove-food-repository'
import { mockRemoveFoodRepository } from '@/data/test/mock-db-food'
import { throwError } from '@/domain/test/test-helpers'
import { DbRemoveFood } from './db-remove-food'

interface SutTypes {
  sut: DbRemoveFood
  removeFoodRepositoryStub: RemoveFoodRepository
}

const makeSut = (): SutTypes => {
  const removeFoodRepositoryStub = mockRemoveFoodRepository()
  const sut = new DbRemoveFood(removeFoodRepositoryStub)
  return {
    sut,
    removeFoodRepositoryStub
  }
}

describe('DbRemoveFood', () => {
  test('Should call RemoveFoodRepository with correct value', async () => {
    const { sut, removeFoodRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(removeFoodRepositoryStub, 'remove')
    await sut.remove(1)
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if RemoveFoodRepository throws', async () => {
    const { sut, removeFoodRepositoryStub } = makeSut()
    jest.spyOn(removeFoodRepositoryStub, 'remove').mockImplementationOnce(throwError)
    const response = sut.remove(1)
    await expect(response).rejects.toThrow()
  })
})
