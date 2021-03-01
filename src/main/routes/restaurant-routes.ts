import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import { makeLoadRestaurantsController } from '../factories/controllers'

export default (router: Router): void => {
  router.get('/restaurants', adaptRoute(makeLoadRestaurantsController()))
}
