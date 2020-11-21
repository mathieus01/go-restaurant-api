import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Validation } from '@/presentation/protocols'
import { mockValidation } from '@/presentation/test'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validatorStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validatorStub = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ fild: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validatorStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ fild: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('Should not return validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
