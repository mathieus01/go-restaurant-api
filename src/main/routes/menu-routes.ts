import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddFoodController } from '../factories/controllers/menu/add-food/add-food-controller-factory'

export default (router: Router): void => {
  router.post('/menu', adaptRoute(makeAddFoodController()))
}
