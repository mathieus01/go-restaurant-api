import { UpdateOrderStatusRepository } from '@/data/protocols/db/order/update-order-status-repository'
import { mockUpdateOrderStatusRepository } from '@/data/test/mock-db-order'
import { throwError } from '@/domain/test/test-helpers'
import { DBUpdateOrderStatus } from './db-update-order-status'

interface SutTypes {
  sut: DBUpdateOrderStatus
  updateOrderStatusRepositoryStub: UpdateOrderStatusRepository
}

const makeSut = (): SutTypes => {
  const updateOrderStatusRepositoryStub = mockUpdateOrderStatusRepository()
  const sut = new DBUpdateOrderStatus(updateOrderStatusRepositoryStub)
  return {
    sut,
    updateOrderStatusRepositoryStub
  }
}

describe('DBUpdateOrderStatus', () => {
  test('Should call UpdateOrderStatusRepository with correct values', async () => {
    const { sut, updateOrderStatusRepositoryStub } = makeSut()
    const updateOrderStatusSpy = jest.spyOn(updateOrderStatusRepositoryStub, 'updateOrderStatus')
    await sut.updateOrderStatus(1, 'any_status')
    expect(updateOrderStatusSpy).toHaveBeenLastCalledWith(1, 'any_status')
  })
  test('Should throw if UpdateOrderStatusRepository throws', async () => {
    const { sut, updateOrderStatusRepositoryStub } = makeSut()
    jest.spyOn(updateOrderStatusRepositoryStub, 'updateOrderStatus').mockImplementationOnce(throwError)
    const response = sut.updateOrderStatus(1, 'any_status')
    await expect(response).rejects.toThrow()
  })
})
