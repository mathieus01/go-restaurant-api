import { mockRestaurantsModelList, throwError } from '@/domain/test'
import { LoadRestaurants } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { mockLoadRestaurantsSpy } from '@/presentation/test'
import { LoadRestaurantsController } from './load-restaurants-controller'

interface SutTypes {
  loadRestaurantsSpy: LoadRestaurants
  sut: LoadRestaurantsController
}

const makeSut = (): SutTypes => {
  const loadRestaurantsSpy = mockLoadRestaurantsSpy()
  const sut = new LoadRestaurantsController(loadRestaurantsSpy)
  return {
    loadRestaurantsSpy,
    sut
  }
}

describe('LoadRestaurantsController', () => {
  test('Should call LoadRestaurants', async () => {
    const { sut, loadRestaurantsSpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadRestaurantsSpy, 'loadAll')
    await sut.handle({})
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should return 500 if Validate throws', async () => {
    const { sut, loadRestaurantsSpy } = makeSut()
    jest.spyOn(loadRestaurantsSpy, 'loadAll').mockRejectedValueOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return list of restaurants on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockRestaurantsModelList()))
  })
})
