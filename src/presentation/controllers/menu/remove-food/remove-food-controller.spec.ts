import { RemoveFoodController } from './remove-food-controller'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { mockLoadFoodById, mockRemoveFood } from '@/presentation/test'
import { HttpRequest } from '@/presentation/protocols'
import { throwError } from '@/domain/test'
import { LoadFoodById, RemoveFood } from '@/domain/usecases'

const makeHttpRequest = (): HttpRequest => ({
  params: {
    foodId: 1
  }
})

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
