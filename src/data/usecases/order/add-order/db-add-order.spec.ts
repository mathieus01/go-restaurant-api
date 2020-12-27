import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { DbAddOrder } from './db-add-order'
import { LoadFoodByFoodTypeAndSizeIdsRepository } from '@/data/protocols/db/menu/load-food-by-food-type-size-ids-repository'
import MockDate from 'mockdate'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { mockAddOrderParams, mockOrderModel } from '@/domain/test/mock-order'
import { mockAddOrderRepository, mockLoadAccountByIdRepository, mockLoadFoodByFoodTypeAndSizeIdsRepository } from '@/data/test/mock-db-order'

interface SutTypes {
  sut: DbAddOrder
  addOrderRepositoryStub: AddOrderRepository
  loadFoodByFoodTypeAndSizeIdsRepositoryStub: LoadFoodByFoodTypeAndSizeIdsRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const loadFoodByFoodTypeAndSizeIdsRepositoryStub = mockLoadFoodByFoodTypeAndSizeIdsRepository()
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new DbAddOrder(loadFoodByFoodTypeAndSizeIdsRepositoryStub, loadAccountByIdRepositoryStub, addOrderRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub,
    loadFoodByFoodTypeAndSizeIdsRepositoryStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAddOrder', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddOrderRepository with correct values', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    await sut.add(mockAddOrderParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddOrderParams())
  })
  test('Should call LoadFoodByFoodTypeAndSizeIds with correct values', async () => {
    const { sut, loadFoodByFoodTypeAndSizeIdsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodByFoodTypeAndSizeIdsRepositoryStub, 'load')
    await sut.add(mockAddOrderParams())
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  test('Should return null if LoadFoodByFoodTypeAndSizeIds is not found', async () => {
    const { sut, loadFoodByFoodTypeAndSizeIdsRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByFoodTypeAndSizeIdsRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const orderModel = await sut.add(mockAddOrderParams())
    expect(orderModel).toBeFalsy()
  })
  test('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadFoodByFoodTypeAndSizeIdsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodByFoodTypeAndSizeIdsRepositoryStub, 'load')
    await sut.add(mockAddOrderParams())
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  test('Should return null if LoadAccountByIdRepository is not found', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const orderModel = await sut.add(mockAddOrderParams())
    expect(orderModel).toBeFalsy()
  })
  test('Should return a Order on success', async () => {
    const { sut } = makeSut()
    const orderModel = await sut.add(mockAddOrderParams())
    expect(orderModel).toEqual(mockOrderModel())
  })
})
