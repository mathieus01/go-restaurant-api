import { AddFood } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class AddFoodController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addFood: AddFood
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { restaurantId } = httpRequest.params
      const { name, description, avatar, type, price } = httpRequest.body
      const error = this.validation.validate({ name, description, avatar, type, price, restaurantId })
      if (error) {
        return badRequest(error)
      }
      const foodModel = await this.addFood.add({ name, description, avatar, type, price, restaurantId })
      return ok(foodModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
