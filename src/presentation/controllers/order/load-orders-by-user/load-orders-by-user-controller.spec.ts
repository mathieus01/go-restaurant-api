import { LoadOrdersByUserController } from './load-orders-by-user-controller'
import { ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadOrdersByUser } from '@/presentation/test/mock-order'
import { mockOrderModel, throwError } from '@/domain/test'
import { LoadOrdersByUser } from '@/domain/usecases'
import MockDate from 'mockdate'

const mockRequest = (): HttpRequest => ({
  params: {
    userId: 1
  }
})

interface SutTypes {
  sut: LoadOrdersByUserController
  loadOrdersByUserStub: LoadOrdersByUser
}

const makeSut = (): SutTypes => {
  const loadOrdersByUserStub = mockLoadOrdersByUser()
  const sut = new LoadOrdersByUserController(loadOrdersByUserStub)
  return {
    sut,
    loadOrdersByUserStub
  }
}

describe('LoadOrdersByUserController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call loadOrdersByUser with correct values', async () => {
    const { sut, loadOrdersByUserStub } = makeSut()
    const loadOrdersByUserSpy = jest.spyOn(loadOrdersByUserStub, 'loadOrdersByUser')
    await sut.handle(mockRequest())
    expect(loadOrdersByUserSpy).toHaveBeenCalledWith(mockRequest().params.userId)
  })

  test('Should return 500 if loadOrdersByUser throws', async () => {
    const { sut, loadOrdersByUserStub } = makeSut()
    jest.spyOn(loadOrdersByUserStub, 'loadOrdersByUser').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok([mockOrderModel()]))
  })
})
