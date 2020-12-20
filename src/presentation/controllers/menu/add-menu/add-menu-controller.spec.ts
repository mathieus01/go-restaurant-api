import { FoodModel } from '@/domain/models/foods'
import { mockAddFoodParams, mockFoodModel } from '@/domain/test/mock-menu'
import { throwError } from '@/domain/test/test-helpers'
import { AddFood, AddFoodParams } from '@/domain/usecases/menu/add-food'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockValidation } from '@/presentation/test'
import { HttpRequest, Validation } from '../../authentication/login/login-controller-protocols'
import { AddMenuController } from './add-menu-controller'

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
  sut: AddMenuController
  addFoodStub: AddFood
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addFoodStub = mockAddFood()
  const validationStub = mockValidation()
  const sut = new AddMenuController(validationStub, addFoodStub)
  return { sut, addFoodStub, validationStub }
}

describe('AddMenuController', () => {
  test('Should call Validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const addFoodParam = mockAddFoodParams()
    await sut.handle(mockRequest())
    expect(validationSpy).toHaveBeenLastCalledWith(addFoodParam)
  })
  test('Should return 400 if Validate returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
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
