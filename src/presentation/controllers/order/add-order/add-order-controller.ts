import { AddOrder } from '@/domain/usecases/order/add-order'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../authentication/login/login-controller-protocols'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrder: AddOrder) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }
      const order = await this.addOrder.add(body)
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
