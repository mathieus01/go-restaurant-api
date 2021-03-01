import { LoadRestaurants } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadRestaurantsController implements Controller {
  constructor (private readonly loadRestaurants: LoadRestaurants) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restaurants = await this.loadRestaurants.loadAll()
      return ok(restaurants)
    } catch (error) {
      return serverError(error)
    }
  }
}
