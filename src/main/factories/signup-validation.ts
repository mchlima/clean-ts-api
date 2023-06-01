import { RequiredFieldsValidation } from '../../presentation/helpers/validators/required-fields-validation.ts'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { type Validation } from '../../presentation/helpers/validators/validation.js'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
