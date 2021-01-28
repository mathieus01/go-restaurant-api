import { LoadOrderById } from '@/domain/usecases/order/load-order-by-id'
import { UpdateOrderStatus } from '@/domain/usecases/order/update-order-status'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../authentication/login/login-controller-protocols'

export class UpdateOrderStatusController implements Controller {
  constructor (
    private readonly loadOrderById: LoadOrderById,
    private readonly updateOrderStatus: UpdateOrderStatus) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orderId } = httpRequest.params
      const { status } = httpRequest.body
      const order = await this.loadOrderById.loadById(orderId)
      if (!order) {
        return forbidden(new InvalidParamError('orderId'))
      }

      await this.updateOrderStatus.updateOrderStatus(orderId, status)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
