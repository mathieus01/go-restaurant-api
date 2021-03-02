import { LoadFoodsByRestaurantController } from './load-foods-by-restaurant-controller'
import { mockFoodModel, throwError } from '@/domain/test'
import { LoadFoodsByRestaurant } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { mockLoadFoodsByRestaurant } from '@/presentation/test'
import { HttpRequest } from '@/presentation/protocols'

const makeHttpRequest = (): HttpRequest => ({
  params: {
    restaurantId: 1
  }
})

interface SutTypes {
  sut: LoadFoodsByRestaurantController
  loadFoodsByRestaurantStub: LoadFoodsByRestaurant
}

const makeSut = (): SutTypes => {
  const loadFoodsByRestaurantStub = mockLoadFoodsByRestaurant()
  const sut = new LoadFoodsByRestaurantController(loadFoodsByRestaurantStub)
  return {
    sut,
    loadFoodsByRestaurantStub
  }
}

describe('LoadFoodsByRestaurantController', () => {
  test('should call LoadFoodsByRestaurant', async () => {
    const { sut, loadFoodsByRestaurantStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodsByRestaurantStub, 'load')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.params.restaurantId)
  })
  test('should return 500 if LoadFoodsByRestaurant throws', async () => {
    const { sut, loadFoodsByRestaurantStub } = makeSut()
    jest.spyOn(loadFoodsByRestaurantStub, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
  test('should return a list of Food on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(ok([mockFoodModel()]))
  })
})
