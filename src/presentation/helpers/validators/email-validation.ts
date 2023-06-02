import { type EmailValidator } from '../../controllers/signup/signup-protocols'
import { InvalidParamError } from '../../errors'
import { type Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  private readonly emailValidator: EmailValidator
  private readonly fieldName: string

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
