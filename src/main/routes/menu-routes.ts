import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddFoodController, makeLoadFoodsController, makeRemoveFoodController } from '@/main/factories/controllers/menu'

export default (router: Router): void => {
  router.post('/menu', adaptRoute(makeAddFoodController()))
  router.get('/menu', adaptRoute(makeLoadFoodsController()))
  router.delete('/menu/:foodId', adaptRoute(makeRemoveFoodController()))
}
