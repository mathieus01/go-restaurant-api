import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { CompareFieldValidation } from './compare-field-validation'

describe('CompareField Validation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = new CompareFieldValidation('password', 'passwordConfirmation')
    const error = sut.validate({ password: 'any_password', passwordConfirmation: 'other_password' })
    expect(error).toEqual(new InvalidParamError('passwordConfirmation'))
  })
  test('Should not return if validation succeeds', () => {
    const sut = new CompareFieldValidation('password', 'passwordConfirmation')
    const error = sut.validate({ password: 'any_password', passwordConfirmation: 'any_password' })
    expect(error).toBeFalsy()
  })
})
