import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadOrdersByUser } from '@/domain/usecases'

export class LoadOrdersByUserController implements Controller {
  constructor (private readonly loadOrdersByUser: LoadOrdersByUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest
      const orders = await this.loadOrdersByUser.loadOrdersByUser(accountId)
      return ok(orders)
    } catch (error) {
      return serverError(error)
    }
  }
}
