import { LoadOrderById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadOrderByIdController implements Controller {
  constructor (private readonly loadOrderById: LoadOrderById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { orderId } = httpRequest.params
      const order = await this.loadOrderById.loadById(orderId)
      if (!order) {
        return forbidden(new InvalidParamError('orderId'))
      }
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
