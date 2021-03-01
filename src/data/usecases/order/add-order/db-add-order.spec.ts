import { DbAddOrder } from './db-add-order'
import { AddOrderRepository, LoadAccountByIdRepository, LoadFoodByIdRepository } from '@/data/protocols/db'
import { mockAddOrderParams, mockOrderModel } from '@/domain/test'
import { mockAddOrderRepository, mockLoadAccountByIdRepository, mockLoadFoodByIdRepository } from '@/data/test'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbAddOrder
  addOrderRepositoryStub: AddOrderRepository
  loadFoodByIdRepositoryStub: LoadFoodByIdRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const loadFoodByIdRepositoryStub = mockLoadFoodByIdRepository()
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const sut = new DbAddOrder(loadFoodByIdRepositoryStub, loadAccountByIdRepositoryStub, addOrderRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub,
    loadFoodByIdRepositoryStub,
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
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodByIdRepositoryStub, 'loadById')
    await sut.add(mockAddOrderParams())
    expect(loadSpy).toHaveBeenCalledWith(1)
  })
  test('Should return null if LoadFoodByFoodTypeAndSizeIds is not found', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFoodByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const orderModel = await sut.add(mockAddOrderParams())
    expect(orderModel).toBeFalsy()
  })
  test('Should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadFoodByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadFoodByIdRepositoryStub, 'loadById')
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
