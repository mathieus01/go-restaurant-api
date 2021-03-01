import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/factories/usecases'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidationFactory } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeSignUpValidationFactory(), makeDbAddAccount(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
