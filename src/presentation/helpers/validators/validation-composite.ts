import { type Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error: Error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
