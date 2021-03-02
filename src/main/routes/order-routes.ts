import { adaptRoute } from '@/main/adapters'
import { makeAddOrderController, makeLoadOrderByIdController, makeLoadOrdersByUserController, makeUpdateOrderStatusController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
  router.post('/orders/users/:userId', adaptRoute(makeLoadOrdersByUserController()))
  router.put('/orders/:orderId/status', adaptRoute(makeUpdateOrderStatusController()))
  router.get('/orders/:orderId', adaptRoute(makeLoadOrderByIdController()))
}
