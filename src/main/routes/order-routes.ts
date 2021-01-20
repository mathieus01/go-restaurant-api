import { Router } from 'express'
import { makeAddOrderController } from '@/main/factories/controllers/order/add-order/add-order-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/order', adaptRoute(makeAddOrderController()))
}
