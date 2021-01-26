import { FoodModel } from '@/domain/models/foods'
import { mockFoodModel } from '@/domain/test/mock-menu'
import { throwError } from '@/domain/test/test-helpers'
import { LoadFoodById } from '@/domain/usecases/menu/load-food-by-id'
import { RemoveFood } from '@/domain/usecases/menu/remove-food'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '../../authentication/login/login-controller-protocols'
import { RemoveFoodController } from './remove-food-controller'

const makeHttpRequest = (): HttpRequest => ({
  headers: {
    foodId: 1
  }
})

const mockRemoveFood = (): RemoveFood => {
  class RemoveFoodStub implements RemoveFood {
    async remove (foodId: number): Promise<void> {
    }
  }
  return new RemoveFoodStub()
}
const mockLoadFoodById = (): LoadFoodById => {
  class LoadFoodByIdStub implements LoadFoodById {
    async loadById (foodId: number): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new LoadFoodByIdStub()
}

interface SutTypes {
  sut: RemoveFoodController
  removeFoodStub: RemoveFood
  loadFoodByIdStub: LoadFoodById
}

const makeSut = (): SutTypes => {
  const removeFoodStub = mockRemoveFood()
  const loadFoodByIdStub = mockLoadFoodById()
  const sut = new RemoveFoodController(removeFoodStub, loadFoodByIdStub)
  return {
    sut,
    removeFoodStub,
    loadFoodByIdStub
  }
}

describe('RemoveFoodController', () => {
  test('Should call LoadFoodById with correct values', async () => {
    const { sut, loadFoodByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFoodByIdStub, 'loadById')
    await sut.handle(makeHttpRequest())
    expect(loadByIdSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should return 403 if LoadFoodById returns null', async () => {
    const { sut, loadFoodByIdStub } = makeSut()
    jest.spyOn(loadFoodByIdStub, 'loadById').mockReturnValueOnce(null)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('foodId')))
  })
  test('Should return 500 if LoadFoodById throw an error', async () => {
    const { sut, loadFoodByIdStub } = makeSut()
    jest.spyOn(loadFoodByIdStub, 'loadById').mockImplementationOnce(throwError)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Should call RemoveFood with correct values', async () => {
    const { sut, removeFoodStub } = makeSut()
    const removeSpy = jest.spyOn(removeFoodStub, 'remove')
    await sut.handle(makeHttpRequest())
    expect(removeSpy).toHaveBeenLastCalledWith(1)
  })
  test('Should return 500 if RemoveFood throw an error', async () => {
    const { sut, removeFoodStub } = makeSut()
    jest.spyOn(removeFoodStub, 'remove').mockImplementationOnce(throwError)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(noContent())
  })
})
