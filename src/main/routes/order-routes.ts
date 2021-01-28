import { Router } from 'express'
import { makeAddOrderController } from '@/main/factories/controllers/order/add-order/add-order-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadOrdersByUserController } from '../factories/controllers/order/load-orders-by-user/load-orders-by-user-controller-factory'
import { makeUpdateOrderStatusController } from '../factories/controllers/order/update-order-status/update-order-status-controller-factory'

export default (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
  router.post('/orders/users/:userId', adaptRoute(makeLoadOrdersByUserController()))
  router.put('/orders/:orderId/status', adaptRoute(makeUpdateOrderStatusController()))
}
