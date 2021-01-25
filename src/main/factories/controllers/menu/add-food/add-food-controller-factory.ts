import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddFood } from '@/main/factories/usecases/menu/add-food/db-add-food-factory'
import { AddFoodController } from '@/presentation/controllers/menu/add-menu/add-food-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddFoodValidation } from './add-food-validation-factory'

export const makeAddFoodController = (): Controller => {
  const controller = new AddFoodController(makeAddFoodValidation(), makeDbAddFood())
  return makeLogControllerDecorator(controller)
}
