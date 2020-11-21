import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { Validation } from '@/presentation/protocols'

export class CompareFieldValidation implements Validation {
  constructor (
    private readonly field: any,
    private readonly fieldToCompare: any
  ) {}

  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
