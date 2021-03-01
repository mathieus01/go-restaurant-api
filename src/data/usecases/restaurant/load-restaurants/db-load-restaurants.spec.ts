import { LoadRestaurantsRepository } from '@/data/protocols/db'
import { makeLoadRestaurantsRepositorySpy } from '@/data/test'
import { DbLoadRestaurants } from '@/data/usecases'
import { mockRestaurantsModelList, throwError } from '@/domain/test'

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
