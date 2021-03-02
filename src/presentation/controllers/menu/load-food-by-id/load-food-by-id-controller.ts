import { LoadFoodById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadFoodByIdController implements Controller {
  constructor (private readonly loadFoodById: LoadFoodById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { foodId } = httpRequest.params
      const food = await this.loadFoodById.loadById(foodId)
      if (!food) {
        return forbidden(new InvalidParamError('foodId'))
      }
      return ok(food)
    } catch (error) {
      return serverError(error)
    }
  }
}
