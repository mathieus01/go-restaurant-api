import { makeAddFoodController, makeLoadFoodsController, makeRemoveFoodController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/menu', adaptRoute(makeAddFoodController()))
  router.get('/menu', adaptRoute(makeLoadFoodsController()))
  router.delete('/menu/:foodId', adaptRoute(makeRemoveFoodController()))
}
