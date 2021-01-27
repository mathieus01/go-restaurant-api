import { ListOrdersByUserRepository } from '@/data/protocols/db/order/list-orders-by-user-repository'
import { mockOrderModel } from '@/domain/test/mock-order'
import { throwError } from '@/domain/test/test-helpers'
import { DbListOrdersByUser } from './db-list-orders-by-user'
import MockDate from 'mockdate'
import { mockListOrdersByUser } from '@/data/test/mock-db-order'

interface SutTypes {
  sut: DbListOrdersByUser
  listOrdersByUserRepositoryStub: ListOrdersByUserRepository
}

const makeSut = (): SutTypes => {
  const listOrdersByUserRepositoryStub = mockListOrdersByUser()
  const sut = new DbListOrdersByUser(listOrdersByUserRepositoryStub)
  return {
    sut,
    listOrdersByUserRepositoryStub
  }
}

describe('DbListOrdersByUser', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call ListOrdersByUserRepository with correct values', async () => {
    const { sut, listOrdersByUserRepositoryStub } = makeSut()
    const listOrdersByUserSpy = jest.spyOn(listOrdersByUserRepositoryStub, 'listOrdersByUser')
    await sut.listOrdersByUser(1)
    expect(listOrdersByUserSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should throw if ListOrdersByUserRepository throws', async () => {
    const { sut, listOrdersByUserRepositoryStub } = makeSut()
    jest.spyOn(listOrdersByUserRepositoryStub, 'listOrdersByUser').mockImplementationOnce(throwError)
    const response = sut.listOrdersByUser(1)
    await expect(response).rejects.toThrow()
  })
  test('Should return list of orders on success', async () => {
    const { sut } = makeSut()
    const orders = await sut.listOrdersByUser(1)
    expect(orders).toEqual([mockOrderModel()])
  })
})
