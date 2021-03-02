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
      const { food, type, price } = httpRequest.body
      const error = this.validation.validate({ food, type, price, restaurantId })
      if (error) {
        return badRequest(error)
      }
      const foodModel = await this.addFood.add({ food, type, price, restaurantId })
      return ok(foodModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
