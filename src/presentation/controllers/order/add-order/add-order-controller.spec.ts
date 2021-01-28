import { mockAddOrderParams, mockOrderModel } from '@/domain/test/mock-order'
import { mockValidation } from '@/presentation/test'
import { HttpRequest, Validation } from '../../authentication/login/login-controller-protocols'
import { AddOrderController } from './add-order-controller'
import MockDate from 'mockdate'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddOrder } from '@/domain/usecases/order/add-order'
import { throwError } from '@/domain/test/test-helpers'
import { mockAddOrder } from '@/presentation/test/mock-order'

const mockRequest = (): HttpRequest => ({
  body: mockAddOrderParams()
})

interface SutTypes {
  sut: AddOrderController
  validationStub: Validation
  addOrderStub: AddOrder
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addOrderStub = mockAddOrder()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
  }
}

describe('AddOrderController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockAddOrderParams())
  })

  test('Should return 400 if Validate returns an erro', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call AddOrder with correct values', async () => {
    const { sut, addOrderStub } = makeSut()
    const addOrderSpy = jest.spyOn(addOrderStub, 'add')
    await sut.handle(mockRequest())
    expect(addOrderSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('Should return 500 if AddOrder throws', async () => {
    const { sut, addOrderStub } = makeSut()
    jest.spyOn(addOrderStub, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockOrderModel()))
  })
})
