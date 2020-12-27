import { FoodModel } from '@/domain/models/foods'
import { mockAddFoodParams, mockAddFoodParamsWithoutPrice, mockFoodModel } from '@/domain/test/mock-menu'
import { throwError } from '@/domain/test/test-helpers'
import { AddFood, AddFoodParams } from '@/domain/usecases/menu/add-food'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockValidation } from '@/presentation/test'
import { HttpRequest, Validation } from '../../authentication/login/login-controller-protocols'
import { AddFoodController } from './add-food-controller'

const mockRequest = (): HttpRequest => ({
  body: mockAddFoodParams()
})

const mockAddFood = (): AddFood => {
  class AddFoodStub implements AddFood {
    async add (addfoodParams: AddFoodParams): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new AddFoodStub()
}

interface SutTypes {
  sut: AddFoodController
  addFoodStub: AddFood
  validationStub: Validation
  sizeValidationStub: Validation
}

const makeSut = (): SutTypes => {
  const addFoodStub = mockAddFood()
  const validationStub = mockValidation()
  const sizeValidationStub = mockValidation()
  const sut = new AddFoodController(validationStub, sizeValidationStub, addFoodStub)
  return { sut, addFoodStub, validationStub, sizeValidationStub }
}

describe('AddFoodController', () => {
  test('Should call Validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const { food, type } = mockAddFoodParams()
    const { flavor, sizes } = type
    await sut.handle(mockRequest())
    expect(validationSpy).toHaveBeenLastCalledWith({ food, type, flavor, sizes })
  })
  test('Should return 400 if Validate returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should return 400 if Validate returns an error without sizes', async () => {
    const { sut, sizeValidationStub } = makeSut()
    jest.spyOn(sizeValidationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({ body: mockAddFoodParamsWithoutPrice() })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should return 500 if Validate throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should call AddFood with correct values', async () => {
    const { sut, addFoodStub } = makeSut()
    const addFoodSpy = jest.spyOn(addFoodStub, 'add')
    const addFoodParam = mockAddFoodParams()
    await sut.handle(mockRequest())
    expect(addFoodSpy).toHaveBeenLastCalledWith(addFoodParam)
  })
  test('Should return 500 if AddFood throws', async () => {
    const { sut, addFoodStub } = makeSut()
    jest.spyOn(addFoodStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return an FoodModel on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockFoodModel()))
  })
})
