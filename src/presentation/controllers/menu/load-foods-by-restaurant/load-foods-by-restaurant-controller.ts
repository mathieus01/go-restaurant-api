import { LoadFoodsByRestaurant } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadFoodsByRestaurantController implements Controller {
  constructor (private readonly loadFoodsByRestaurant: LoadFoodsByRestaurant) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { restaurantId } = httpRequest.params
      const foods = await this.loadFoodsByRestaurant.load(restaurantId)
      return ok(foods)
    } catch (error) {
      return serverError(error)
    }
  }
}
