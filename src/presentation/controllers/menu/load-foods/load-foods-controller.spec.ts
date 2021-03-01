import { LoadFoodsController } from './load-foods-controller'
import { mockFoodModel, throwError } from '@/domain/test'
import { LoadFoods } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { mockLoadFoods } from '@/presentation/test'

interface SutTypes {
  sut: LoadFoodsController
  loadFoodsStub: LoadFoods
}

const makeSut = (): SutTypes => {
  const loadFoodsStub = mockLoadFoods()
  const sut = new LoadFoodsController(loadFoodsStub)
  return {
    sut,
    loadFoodsStub
  }
}

describe('LoadFoodsController', () => {
  test('should call LoadFoods', async () => {
    const { sut, loadFoodsStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodsStub, 'load')
    await sut.handle(null)
    expect(loadSpy).toHaveBeenCalled()
  })
  test('should return 500 if LoadFoods throws', async () => {
    const { sut, loadFoodsStub } = makeSut()
    jest.spyOn(loadFoodsStub, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(null)
    expect(response).toEqual(serverError(new Error()))
  })
  test('should return a list of Food on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(null)
    expect(response).toEqual(ok([mockFoodModel()]))
  })
})
