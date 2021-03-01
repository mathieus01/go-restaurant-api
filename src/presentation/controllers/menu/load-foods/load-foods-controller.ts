import { LoadFoods } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadFoodsController implements Controller {
  constructor (private readonly loadFoods: LoadFoods) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const foods = await this.loadFoods.load()
      return ok(foods)
    } catch (error) {
      return serverError(error)
    }
  }
}
