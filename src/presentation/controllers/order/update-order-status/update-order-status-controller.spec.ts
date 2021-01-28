import { throwError } from '@/domain/test/test-helpers'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '../../authentication/login/login-controller-protocols'
import { UpdateOrderStatusController } from './update-order-status-controller'
import MockDate from 'mockdate'
import { LoadOrderById } from '@/domain/usecases/order/load-order-by-id'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { UpdateOrderStatus } from '@/domain/usecases/order/update-order-status'
import { mockLoadOrdersById, mockUpdateOrderStatus } from '@/presentation/test/mock-order'

const mockRequest = (): HttpRequest => ({
  params: {
    orderId: 1
  },
  body: {
    status: 'any_status'
  }
})

interface SutTypes {
  sut: UpdateOrderStatusController
  loadOrderByIdStub: LoadOrderById
  updateOrderStatusStub: UpdateOrderStatus
}

const makeSut = (): SutTypes => {
  const loadOrderByIdStub = mockLoadOrdersById()
  const updateOrderStatusStub = mockUpdateOrderStatus()
  const sut = new UpdateOrderStatusController(loadOrderByIdStub, updateOrderStatusStub)
  return {
    sut,
    loadOrderByIdStub,
    updateOrderStatusStub
  }
}

describe('UpdateOrderStatusController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadOrderById with correct values', async () => {
    const { sut, loadOrderByIdStub } = makeSut()
    const loadOrdersByUserSpy = jest.spyOn(loadOrderByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadOrdersByUserSpy).toHaveBeenCalledWith(mockRequest().params.orderId)
  })

  test('Should return 400 if LoadOrderById return null', async () => {
    const { sut, loadOrderByIdStub } = makeSut()
    jest.spyOn(loadOrderByIdStub, 'loadById').mockReturnValueOnce(null)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('orderId')))
  })

  test('Should return 500 if loadOrdersByUser throws', async () => {
    const { sut, loadOrderByIdStub } = makeSut()
    jest.spyOn(loadOrderByIdStub, 'loadById').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should call UpdateOrderStatus with correct values', async () => {
    const { sut, updateOrderStatusStub } = makeSut()
    const updateOrderStatusStubSpy = jest.spyOn(updateOrderStatusStub, 'updateOrderStatus')
    await sut.handle(mockRequest())
    expect(updateOrderStatusStubSpy).toHaveBeenCalledWith(1, 'any_status')
  })

  test('Should return 500 if UpdateOrderStatus throws', async () => {
    const { sut, updateOrderStatusStub } = makeSut()
    jest.spyOn(updateOrderStatusStub, 'updateOrderStatus').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
