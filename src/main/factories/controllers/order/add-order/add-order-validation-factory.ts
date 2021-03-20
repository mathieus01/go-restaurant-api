import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddOrderValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['status', 'address', 'date', 'foodsOrder']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
