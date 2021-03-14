import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const auth = adaptMiddleware(makeAuthMiddleware())
