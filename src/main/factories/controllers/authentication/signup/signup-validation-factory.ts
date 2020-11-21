import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols'
import { CompareFieldValidation } from '@/validation/validators/compare-field-validation'
import { EmailValidation } from '@/validation/validators/email-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-filed-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
