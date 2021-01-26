import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddFoodController } from '../factories/controllers/menu/add-food/add-food-controller-factory'
import { makeLoadFoodsController } from '../factories/controllers/menu/load-foods/load-foods-controller-factory'
import { makeRemoveFoodController } from '../factories/controllers/menu/remove-food/remove-food-controller-factory'

export default (router: Router): void => {
  router.post('/menu', adaptRoute(makeAddFoodController()))
  router.get('/menu', adaptRoute(makeLoadFoodsController()))
  router.delete('/menu/:foodId', adaptRoute(makeRemoveFoodController()))
}
