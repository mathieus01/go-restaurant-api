import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import { makeLoadRestaurantsController } from '../factories/controllers'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.get('/restaurants', auth, adaptRoute(makeLoadRestaurantsController()))
}
