import { SignUpController } from './signup-controller'
import { AddAccount, Validation, Authentication, HttpRequest } from './signup-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockAddAccount, mockAuthentication, mockValidation } from '@/presentation/test'
import { EmailInUseError } from '@/presentation/errors'
import { throwError } from '@/domain/test/test-helpers'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    isRestaurant: false
  }
})

interface SutTypes {
  sut: SignUpController
  authenticationStub: Authentication
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addAccountStub = mockAddAccount()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(validationStub, addAccountStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenLastCalledWith(request.body)
  })
  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const request = mockRequest()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const request = mockRequest()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      isRestaurant: false
    })
  })
  test('Should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    const request = mockRequest()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
  test('Should return access token on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })
  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
