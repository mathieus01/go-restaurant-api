import { LoadOrderByIdRepository } from '@/data/protocols/db/order/load-order-by-id-repository'
import { OrderModel } from '@/domain/models/order'
import { mockOrderModel } from '@/domain/test/mock-order'
import { throwError } from '@/domain/test/test-helpers'
import { DbLoadOrderById } from './db-load-order-by-id'

const mockLoadOrderByIdRepository = (): LoadOrderByIdRepository => {
  class LoadOrderByIdRepositoryStub implements LoadOrderByIdRepository {
    async loadById (id: number): Promise<OrderModel> {
      return Promise.resolve(mockOrderModel())
    }
  }
  return new LoadOrderByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadOrderById
  loadOrderByIdRepositoryStub: LoadOrderByIdRepository
}

const makeSut = (): SutTypes => {
  const loadOrderByIdRepositoryStub = mockLoadOrderByIdRepository()
  const sut = new DbLoadOrderById(loadOrderByIdRepositoryStub)
  return {
    sut,
    loadOrderByIdRepositoryStub
  }
}

describe('DbLoadOrderById', () => {
  test('Should call LoadOrderByIdRepository with correct values', async () => {
    const { sut, loadOrderByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadOrderByIdRepositoryStub, 'loadById')
    await sut.loadById(1)
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if LoadOrderByIdRepository throws', async () => {
    const { sut, loadOrderByIdRepositoryStub } = makeSut()
    jest.spyOn(loadOrderByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const response = sut.loadById(1)
    await expect(response).rejects.toThrow()
  })
  test('Should return Order on success', async () => {
    const { sut } = makeSut()
    const order = await sut.loadById(1)
    expect(order).toBeTruthy()
  })
})
