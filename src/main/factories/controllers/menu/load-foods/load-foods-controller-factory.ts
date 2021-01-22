import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadFoods } from '@/main/factories/usecases/menu/load-foods/db-load-foods-factory'
import { LoadFoodsController } from '@/presentation/controllers/menu/load-foods/load-foods-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadFoodsController = (): Controller => {
  const controller = new LoadFoodsController(makeDbLoadFoods())
  return makeLogControllerDecorator(controller)
}
