import { makeAddFoodController, makeLoadFoodsByRestaurantController, makeRemoveFoodController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/restaurants/:restaurantId/menu', adaptRoute(makeAddFoodController()))
  router.get('/restaurants/:restaurantId/menu', adaptRoute(makeLoadFoodsByRestaurantController()))
  router.delete('/menu/:foodId', adaptRoute(makeRemoveFoodController()))
}
