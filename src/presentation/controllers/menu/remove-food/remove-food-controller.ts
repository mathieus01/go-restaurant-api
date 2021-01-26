import { LoadFoodById } from '@/domain/usecases/menu/load-food-by-id'
import { RemoveFood } from '@/domain/usecases/menu/remove-food'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../authentication/login/login-controller-protocols'

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
