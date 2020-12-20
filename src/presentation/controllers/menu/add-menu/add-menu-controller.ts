import { AddFood } from '@/domain/usecases/menu/add-food'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../authentication/login/login-controller-protocols'

export class AddMenuController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addFood: AddFood
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { food, type } = httpRequest.body
      const error = this.validation.validate({ food, type })
      if (error) {
        return badRequest(error)
      }
      const foodModel = await this.addFood.add({ food, type })
      return ok(foodModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
