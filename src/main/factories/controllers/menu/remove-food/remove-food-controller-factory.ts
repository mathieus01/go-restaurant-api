import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadFoodById } from '@/main/factories/usecases/menu/load-food-by-id/db-load-food-by-id-factory'
import { makeDbRemoveFood } from '@/main/factories/usecases/menu/remove-food/db-remove-food-factory'
import { RemoveFoodController } from '@/presentation/controllers/menu/remove-food/remove-food-controller'
import { Controller } from '@/presentation/protocols'

export const makeRemoveFoodController = (): Controller => {
  const controller = new RemoveFoodController(makeDbRemoveFood(), makeDbLoadFoodById())
  return makeLogControllerDecorator(controller)
}
