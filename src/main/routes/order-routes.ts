import { adaptRoute } from '@/main/adapters'
import { makeAddOrderController, makeLoadOrderByIdController, makeLoadOrdersByUserController, makeUpdateOrderStatusController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orders', auth, adaptRoute(makeAddOrderController()))
  router.get('/orders', auth, adaptRoute(makeLoadOrdersByUserController()))
  router.put('/orders/:orderId/status', auth, adaptRoute(makeUpdateOrderStatusController()))
  router.get('/orders/:orderId', auth, adaptRoute(makeLoadOrderByIdController()))
}
