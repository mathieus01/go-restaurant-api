import { LoadOrdersByUser } from '@/domain/usecases/order/load-orders-by-user'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../authentication/login/login-controller-protocols'

export class LoadOrdersByUserController implements Controller {
  constructor (private readonly loadOrdersByUser: LoadOrdersByUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      const orders = await this.loadOrdersByUser.loadOrdersByUser(userId)
      return ok(orders)
    } catch (error) {
      return serverError(error)
    }
  }
}
