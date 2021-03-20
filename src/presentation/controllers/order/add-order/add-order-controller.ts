import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { AddOrder } from '@/domain/usecases'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrder: AddOrder) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, accountId } = httpRequest
      console.log(accountId)

      const error = this.validation.validate(body)
      if (error) {
        console.log(error)

        return badRequest(error)
      }
      const order = await this.addOrder.add({ ...body, accountId })
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
