import { DbLoadOrdersByUser } from './db-load-orders-by-user'
import { LoadOrdersByUserRepository } from '@/data/protocols/db'
import { mockOrderModel, throwError } from '@/domain/test'
import { mockLoadOrdersByUserRepository } from '@/data/test'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbLoadOrdersByUser
  listOrdersByUserRepositoryStub: LoadOrdersByUserRepository
}

const makeSut = (): SutTypes => {
  const listOrdersByUserRepositoryStub = mockLoadOrdersByUserRepository()
  const sut = new DbLoadOrdersByUser(listOrdersByUserRepositoryStub)
  return {
    sut,
    listOrdersByUserRepositoryStub
  }
}

describe('DbLoadOrdersByUser', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadOrdersByUserRepository with correct values', async () => {
    const { sut, listOrdersByUserRepositoryStub } = makeSut()
    const listOrdersByUserSpy = jest.spyOn(listOrdersByUserRepositoryStub, 'loadOrdersByUser')
    await sut.loadOrdersByUser(1)
    expect(listOrdersByUserSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if LoadOrdersByUserRepository throws', async () => {
    const { sut, listOrdersByUserRepositoryStub } = makeSut()
    jest.spyOn(listOrdersByUserRepositoryStub, 'loadOrdersByUser').mockImplementationOnce(throwError)
    const response = sut.loadOrdersByUser(1)
    await expect(response).rejects.toThrow()
  })
  test('Should return list of orders on success', async () => {
    const { sut } = makeSut()
    const orders = await sut.loadOrdersByUser(1)
    expect(orders).toEqual([mockOrderModel()])
  })
})
