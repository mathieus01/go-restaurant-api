import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddFoodValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['food', 'type', 'price']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
