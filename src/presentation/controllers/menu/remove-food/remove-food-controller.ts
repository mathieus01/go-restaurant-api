import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LoadFoodById, RemoveFood } from '@/domain/usecases'

export class RemoveFoodController implements Controller {
  constructor (
    private readonly removeFood: RemoveFood,
    private readonly loadFoodById: LoadFoodById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { foodId } = httpRequest.params
      const food = await this.loadFoodById.loadById(foodId)
      if (!food) {
        return forbidden(new InvalidParamError('foodId'))
      }
      await this.removeFood.remove(foodId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
