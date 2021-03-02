import { DbLoadFoodsByRestaurant } from './db-load-foods-by-restaurant'
import { LoadFoodsByRestaurantRepository } from '@/data/protocols/db'
import { mockLoadFoodsByRestaurantRepository } from '@/data/test'
import { mockFoodModel, throwError } from '@/domain/test'

interface SutTypes {
  sut: DbLoadFoodsByRestaurant
  loadFoodsByRestaurantRepositorySpy: LoadFoodsByRestaurantRepository
}

const makeSut = (): SutTypes => {
  const loadFoodsByRestaurantRepositorySpy = mockLoadFoodsByRestaurantRepository()
  const sut = new DbLoadFoodsByRestaurant(loadFoodsByRestaurantRepositorySpy)
  return {
    sut,
    loadFoodsByRestaurantRepositorySpy
  }
}

describe('DbLoadFoodsByRestaurant', () => {
  test('Should call LoadFoodsRepository with correct values', async () => {
    const { sut, loadFoodsByRestaurantRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadFoodsByRestaurantRepositorySpy, 'loadByRestaurant')
    const restaurantId = 1
    await sut.load(restaurantId)
    expect(loadSpy).toHaveBeenCalledWith(restaurantId)
  })
  test('Should return empty list if LoadFoodsRepository returns null', async () => {
    const { sut, loadFoodsByRestaurantRepositorySpy } = makeSut()
    jest.spyOn(loadFoodsByRestaurantRepositorySpy, 'loadByRestaurant').mockReturnValueOnce(Promise.resolve(null))
    const restaurantId = 1
    const response = await sut.load(restaurantId)
    expect(response).toEqual([])
  })
  test('Should throw if LoadFoodsRepository throws', async () => {
    const { sut, loadFoodsByRestaurantRepositorySpy } = makeSut()
    jest.spyOn(loadFoodsByRestaurantRepositorySpy, 'loadByRestaurant').mockImplementationOnce(throwError)
    const restaurantId = 1
    const response = sut.load(restaurantId)
    await expect(response).rejects.toThrow()
  })
  test('Should return FoodModel on success', async () => {
    const { sut } = makeSut()
    const restaurantId = 1
    const response = await sut.load(restaurantId)
    expect(response).toEqual([mockFoodModel()])
  })
})
