import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddFood } from '@/main/factories/usecases/menu/add-food/db-add-food.factory'
import { AddMenuController } from '@/presentation/controllers/menu/add-menu/add-menu-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddFoodValidation } from './add-food-validation-factory'

export const makeAddFoodController = (): Controller => {
  const controller = new AddMenuController(makeAddFoodValidation(), makeDbAddFood())
  return makeLogControllerDecorator(controller)
}
