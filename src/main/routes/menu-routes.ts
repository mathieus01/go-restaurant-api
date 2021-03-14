import { makeAddFoodController, makeLoadFoodByIdController, makeLoadFoodsByRestaurantController, makeRemoveFoodController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/restaurants/:restaurantId/menu', auth, adaptRoute(makeAddFoodController()))
  router.get('/restaurants/:restaurantId/menu', auth, adaptRoute(makeLoadFoodsByRestaurantController()))
  router.get('/menu/:foodId', auth, adaptRoute(makeLoadFoodByIdController()))
  router.delete('/menu/:foodId', auth, adaptRoute(makeRemoveFoodController()))
}
