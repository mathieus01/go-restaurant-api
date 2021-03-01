import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddFood } from '@/main/factories/usecases'
import { AddFoodController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeAddFoodValidation } from './add-food-validation-factory'

export const makeAddFoodController = (): Controller => {
  const controller = new AddFoodController(makeAddFoodValidation(), makeDbAddFood())
  return makeLogControllerDecorator(controller)
}
