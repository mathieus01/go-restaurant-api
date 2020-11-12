import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const unauthorized = (): HttpResponse => ({
  statusCode: 403,
  body: new UnauthorizedError()
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})
