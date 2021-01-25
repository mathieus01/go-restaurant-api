import { AddFood } from '@/domain/usecases/menu/add-food'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../authentication/login/login-controller-protocols'

export class AddFoodController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addFood: AddFood
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { food, type, price } = httpRequest.body
      const error = this.validation.validate({ food, type, price })
      if (error) {
        return badRequest(error)
      }
      const foodModel = await this.addFood.add({ food, type, price })
      return ok(foodModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
