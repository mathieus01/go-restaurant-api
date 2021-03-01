import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadOrderById, UpdateOrderStatus } from '@/domain/usecases'

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
