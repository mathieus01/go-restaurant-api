import { LoadRestaurantsRepository } from '@/data/protocols/db/restaurant/load-restaurants-repository'
import { makeLoadRestaurantsRepositorySpy } from '@/data/test/mock-db-restaurant'
import { DbLoadRestaurants } from '@/data/usecases/restaurant/load-restaurants/db-load-restaurants'
import { mockRestaurantsModelList } from '@/domain/test/mock-restaurant'
import { throwError } from '@/domain/test/test-helpers'

interface SutTypes {
  loadRestaurantsRepositorySpy: LoadRestaurantsRepository
  sut: DbLoadRestaurants
}

const makeSut = (): SutTypes => {
  const loadRestaurantsRepositorySpy = makeLoadRestaurantsRepositorySpy()
  const sut = new DbLoadRestaurants(loadRestaurantsRepositorySpy)
  return {
    sut,
    loadRestaurantsRepositorySpy
  }
}

describe('DbLoadRestaurants', () => {
  test('Should call LoadRestaurantsRepository without values', async () => {
    const { sut, loadRestaurantsRepositorySpy } = makeSut()
    jest.spyOn(loadRestaurantsRepositorySpy, 'loadAll')
    await sut.loadAll()
    expect(loadRestaurantsRepositorySpy.loadAll).toHaveBeenCalled()
  })
  test('Should throw if LoadRestaurantsRepository throws', async () => {
    const { sut, loadRestaurantsRepositorySpy } = makeSut()
    jest.spyOn(loadRestaurantsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const response = sut.loadAll()
    await expect(response).rejects.toThrow()
  })
  test('Should return empty list if LoadRestaurantsRepository returns null', async () => {
    const { sut, loadRestaurantsRepositorySpy } = makeSut()
    jest.spyOn(loadRestaurantsRepositorySpy, 'loadAll').mockResolvedValueOnce(null)
    const restaurants = await sut.loadAll()
    expect(restaurants).toEqual([])
  })
  test('Should return list of restaurants on success', async () => {
    const { sut } = makeSut()
    const restaurants = await sut.loadAll()
    expect(restaurants).toEqual(mockRestaurantsModelList())
  })
})
