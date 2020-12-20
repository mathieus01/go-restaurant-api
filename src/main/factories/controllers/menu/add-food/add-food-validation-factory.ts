import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-filed-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddFoodValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['food', 'type']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
