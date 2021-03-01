import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddOrderValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['food_id', 'observation', 'date', 'address', 'account_id', 'status']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
