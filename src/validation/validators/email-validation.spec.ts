import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '../protocols/email-validator'
import { EmailValidation } from './email-validation'

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: Validation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailValidationSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(emailValidationSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
