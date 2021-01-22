import { LoadFoods } from '@/domain/usecases/menu/load-foods'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../authentication/login/login-controller-protocols'

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
