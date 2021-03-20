import { DbAddOrder } from './db-add-order'
import { AddFoodsOrdersRepository, AddOrderRepository } from '@/data/protocols/db'
import { mockAddOrderParams, mockOrderModel, mockAddFoodOrderParams } from '@/domain/test'
import { mockAddOrderRepository, mockAddFoodsOrdersRepository } from '@/data/test'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbAddOrder
  addOrderRepositoryStub: AddOrderRepository
  addFoodsOrdersRepositoryStub: AddFoodsOrdersRepository
}

const makeSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const addFoodsOrdersRepositoryStub = mockAddFoodsOrdersRepository()
  const sut = new DbAddOrder(addOrderRepositoryStub, addFoodsOrdersRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub,
    addFoodsOrdersRepositoryStub
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
  test('Should return null if AddOrderRepository return null', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    jest.spyOn(addOrderRepositoryStub, 'add').mockResolvedValueOnce(null)
    const response = await sut.add(mockAddOrderParams())
    expect(response).toEqual(null)
  })
  test('Should call AddFoodsOrdersRepository with correct values', async () => {
    const { sut, addFoodsOrdersRepositoryStub } = makeSut()
    const foodOrderParam = mockAddFoodOrderParams()
    const orderModel = mockOrderModel()
    const addSpy = jest.spyOn(addFoodsOrdersRepositoryStub, 'add')
    await sut.add(mockAddOrderParams())
    expect(addSpy).toHaveBeenCalledWith([{ ...foodOrderParam, order_id: orderModel.id }])
  })
  test('Should return a Order on success', async () => {
    const { sut } = makeSut()
    const orderModel = await sut.add(mockAddOrderParams())
    expect(orderModel).toBeTruthy()
  })
})
