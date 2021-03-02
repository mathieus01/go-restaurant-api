import { LoadOrderById } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'
import { LoadOrderByIdController } from './load-order-by-id-controller'
import { mockLoadOrderById } from '@/presentation/test'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { mockOrderModel, throwError } from '@/domain/test'

const makeHttpRequest = (): HttpRequest => ({
  params: {
    orderId: 1
  }
})

interface SutTypes {
  loadOrderByIdSpy: LoadOrderById
  sut: LoadOrderByIdController
}

const makeSut = (): SutTypes => {
  const loadOrderByIdSpy = mockLoadOrderById()
  const sut = new LoadOrderByIdController(loadOrderByIdSpy)

  return { sut, loadOrderByIdSpy }
}

describe('LoadOrderByIdController', () => {
  test('Should call LoadOrderById with correct values', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadOrderByIdSpy, 'loadById')
    const httpRequest = makeHttpRequest()
    const { orderId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(orderId)
  })
  test('Should return 403 if loadOrderById return null', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    jest.spyOn(loadOrderByIdSpy, 'loadById').mockResolvedValueOnce(null)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('orderId')))
  })
  test('Should return 500 if loadOrderById throw error', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    jest.spyOn(loadOrderByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(ok(mockOrderModel()))
  })
})
