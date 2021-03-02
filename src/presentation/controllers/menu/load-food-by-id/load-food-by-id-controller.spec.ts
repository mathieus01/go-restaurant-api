import { LoadFoodById } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'
import { LoadFoodByIdController } from './load-food-by-id-controller'
import { mockLoadFoodById } from '@/presentation/test'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { mockFoodModel, throwError } from '@/domain/test'

const makeHttpRequest = (): HttpRequest => ({
  params: {
    foodId: 1
  }
})

interface SutTypes {
  loadFoodByIdSpy: LoadFoodById
  sut: LoadFoodByIdController
}

const makeSut = (): SutTypes => {
  const loadFoodByIdSpy = mockLoadFoodById()
  const sut = new LoadFoodByIdController(loadFoodByIdSpy)

  return { sut, loadFoodByIdSpy }
}

describe('LoadFoodByIdController', () => {
  test('Should call LoadFoodById with correct values', async () => {
    const { sut, loadFoodByIdSpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFoodByIdSpy, 'loadById')
    const httpRequest = makeHttpRequest()
    const { foodId } = httpRequest.params
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(foodId)
  })
  test('Should return 403 if loadFoodById return null', async () => {
    const { sut, loadFoodByIdSpy } = makeSut()
    jest.spyOn(loadFoodByIdSpy, 'loadById').mockResolvedValueOnce(null)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('foodId')))
  })
  test('Should return 500 if loadFoodById throw error', async () => {
    const { sut, loadFoodByIdSpy } = makeSut()
    jest.spyOn(loadFoodByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(ok(mockFoodModel()))
  })
})
